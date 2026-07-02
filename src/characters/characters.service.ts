import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Database } from 'src/database/database-connection';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import {
  CharacterDetailDto,
  CharacterListItemDto,
} from './dto/character-response.dto';
import {
  characters,
  charactersToElements,
  charactersToSeasons,
  charactersToWeapons,
  elements,
  seasons,
  weapons,
} from 'src/database/schema';
import { eq, ilike, and, desc, asc, count, exists, SQL } from 'drizzle-orm';

import { CharacterQueryDto } from './dto/character-query.dto';
import { PaginationMeta } from 'src/common/interfaces/pagination-meta.interface';
import { PaginationResponse } from 'src/common/dto/pagination-response.dto';

const SORT_COLUMN_MAP = {
  name: characters.name,
  status: characters.status,
  species: characters.species,
  createdAt: characters.createdAt,
};

@Injectable()
export class CharactersService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async create(dto: CreateCharacterDto): Promise<CharacterDetailDto> {
    const [character] = await this.db
      .insert(characters)
      .values(dto)
      .returning();
    return {
      id: character.id,
      name: character.name,
      aliases: character.aliases,
      species: character.species,
      status: character.status,
      createdAt: character.createdAt,
      updatedAt: character.updatedAt,
      debutSeasonId: character.debutSeasonId,
      elements: [],
      weapons: [],
      seasons: [],
    };
  }

  async findAll(
    query: CharacterQueryDto,
  ): Promise<PaginationResponse<CharacterListItemDto>> {
    const {
      page = 1,
      limit = 20,
      sortBy = 'name',
      order = 'asc',
      name,
      element,
      status,
      season,
    } = query;

    const conditions: SQL[] = [];
    if (name) conditions.push(ilike(characters.name, `%${name}%`));
    if (status) conditions.push(eq(characters.status, status));
    if (element) {
      conditions.push(
        exists(
          this.db
            .select({ id: charactersToElements.characterId })
            .from(charactersToElements)
            .innerJoin(
              elements,
              eq(elements.id, charactersToElements.elementId),
            )
            .where(
              and(
                eq(charactersToElements.characterId, characters.id),
                eq(elements.name, element),
                eq(charactersToElements.isActive, true),
              ),
            ),
        ),
      );
    }
    if (season) {
      conditions.push(
        exists(
          this.db
            .select({ id: charactersToSeasons.characterId })
            .from(charactersToSeasons)
            .innerJoin(seasons, eq(seasons.id, charactersToSeasons.seasonId))
            .where(
              and(
                eq(charactersToSeasons.characterId, characters.id),
                eq(seasons.number, season),
              ),
            ),
        ),
      );
    }

    const whereClause = conditions.length ? and(...conditions) : undefined;
    const sortColumn = SORT_COLUMN_MAP[sortBy];
    const orderFn = order === 'desc' ? desc : asc;

    const dataQuery = this.db
      .select()
      .from(characters)
      .where(whereClause)
      .orderBy(orderFn(sortColumn))
      .limit(limit)
      .offset((page - 1) * limit);

    const countQuery = this.db
      .select({ total: count() })
      .from(characters)
      .where(whereClause);

    const [rows, [{ total }]] = await Promise.all([dataQuery, countQuery]);

    const meta: PaginationMeta = {
      page,
      limit,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
    };

    return { data: rows, meta };
  }

  async findOne(id: number): Promise<CharacterDetailDto> {
    const [character] = await this.db
      .select()
      .from(characters)
      .where(eq(characters.id, id))
      .limit(1);

    if (!character) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }

    const [elementRows, weaponRows, seasonRows] = await Promise.all([
      this.db
        .select({
          id: elements.id,
          name: elements.name,
          isActive: charactersToElements.isActive,
        })
        .from(charactersToElements)
        .innerJoin(elements, eq(elements.id, charactersToElements.elementId))
        .where(eq(charactersToElements.characterId, id)),
      this.db
        .select({
          id: weapons.id,
          name: weapons.name,
          type: weapons.type,
        })
        .from(charactersToWeapons)
        .innerJoin(weapons, eq(weapons.id, charactersToWeapons.weaponId))
        .where(eq(charactersToWeapons.characterId, id)),
      this.db
        .select({
          id: seasons.id,
          number: seasons.number,
          title: seasons.title,
        })
        .from(charactersToSeasons)
        .innerJoin(seasons, eq(seasons.id, charactersToSeasons.seasonId))
        .where(eq(charactersToSeasons.characterId, id)),
    ]);

    return {
      id: character.id,
      name: character.name,
      aliases: character.aliases,
      species: character.species,
      status: character.status,
      debutSeasonId: character.debutSeasonId,
      createdAt: character.createdAt,
      updatedAt: character.updatedAt,
      elements: elementRows,
      weapons: weaponRows,
      seasons: seasonRows,
    };
  }

  async update(
    id: number,
    dto: UpdateCharacterDto,
  ): Promise<CharacterDetailDto> {
    const [updated] = await this.db
      .update(characters)
      .set(dto)
      .where(eq(characters.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
    return {
      id: updated.id,
      name: updated.name,
      aliases: updated.aliases,
      species: updated.species,
      status: updated.status,
      debutSeasonId: updated.debutSeasonId,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
      elements: [],
      weapons: [],
      seasons: [],
    };
  }

  async remove(id: number): Promise<void> {
    const [deleted] = await this.db
      .delete(characters)
      .where(eq(characters.id, id))
      .returning();
    if (!deleted) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
  }
}
