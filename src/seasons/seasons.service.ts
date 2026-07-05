import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, asc, count, desc, eq, ilike, SQL } from 'drizzle-orm';
import type { Database } from '../database/database-connection';
import {
  characters,
  charactersToSeasons,
  locations,
  locationsToSeasons,
  seasons,
  weapons,
  weaponsToSeasons,
} from '../database/schema';
import { CreateSeasonDto } from './dto/create-season.dto';
import { SeasonQueryDto } from './dto/season-query.dto';
import { SeasonDetailDto, SeasonListItemDto } from './dto/season-response.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonType } from './enums/season-type.enum';
import { DATABASE_CONNECTION } from '../database/database.module';
import { ApiSuccessResponseWithPagination } from '../common/interfaces/api-response.interface';
import { PaginationMeta } from '../common/interfaces/pagination-meta.interface';

const SORT_COLUMN_MAP = {
  title: seasons.title,
  type: seasons.type,
  number: seasons.number,
  releaseYear: seasons.releaseYear,
};

@Injectable()
export class SeasonsService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async create(dto: CreateSeasonDto): Promise<SeasonDetailDto> {
    const [season] = await this.db.insert(seasons).values(dto).returning();
    return this.findOne(season.id);
  }

  async findAll(
    query: SeasonQueryDto,
  ): Promise<ApiSuccessResponseWithPagination<SeasonListItemDto[]>> {
    const {
      page = 1,
      limit = 20,
      title,
      order = 'asc',
      sortBy = 'title',
      type,
      number,
      releaseYear,
    } = query;

    const conditions: SQL[] = [];

    if (title) {
      conditions.push(ilike(seasons.title, `%${title}%`));
    }

    if (type) {
      conditions.push(eq(seasons.type, type));
    }

    if (number !== undefined) {
      conditions.push(eq(seasons.number, number));
    }

    if (releaseYear !== undefined) {
      conditions.push(eq(seasons.releaseYear, releaseYear));
    }

    const whereClause = conditions.length ? and(...conditions) : undefined;
    const sortColumn = SORT_COLUMN_MAP[sortBy];
    const orderFn = order === 'desc' ? desc : asc;

    const dataQuery = this.db
      .select()
      .from(seasons)
      .where(whereClause)
      .orderBy(orderFn(sortColumn))
      .limit(limit)
      .offset((page - 1) * limit);

    const countQuery = this.db
      .select({ total: count() })
      .from(seasons)
      .where(whereClause);

    const [rows, [{ total }]] = await Promise.all([dataQuery, countQuery]);

    const meta: PaginationMeta = {
      page,
      limit,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
    };

    return {
      data: rows.map((row) => ({
        id: row.id,
        title: row.title,
        type: row.type as SeasonType,
        number: row.number,
        episodesCount: row.episodesCount,
        releaseYear: row.releaseYear,
        mainAntagonist: row.mainAntagonist,
      })),
      meta,
    };
  }

  async findOne(id: number): Promise<SeasonDetailDto> {
    const [season] = await this.db
      .select()
      .from(seasons)
      .where(eq(seasons.id, id))
      .limit(1);

    if (!season) {
      throw new NotFoundException(`Season with id ${id} not found`);
    }

    const [characterRows, weaponRows, locationRows] = await Promise.all([
      this.db
        .select({
          id: characters.id,
          name: characters.name,
        })
        .from(charactersToSeasons)
        .innerJoin(
          characters,
          eq(characters.id, charactersToSeasons.characterId),
        )
        .where(eq(charactersToSeasons.seasonId, id)),
      this.db
        .select({
          id: weapons.id,
          name: weapons.name,
          type: weapons.type,
        })
        .from(weaponsToSeasons)
        .innerJoin(weapons, eq(weapons.id, weaponsToSeasons.weaponId))
        .where(eq(weaponsToSeasons.seasonId, id)),
      this.db
        .select({
          id: locations.id,
          name: locations.name,
        })
        .from(locationsToSeasons)
        .innerJoin(locations, eq(locations.id, locationsToSeasons.locationId))
        .where(eq(locationsToSeasons.seasonId, id)),
    ]);

    return {
      id: season.id,
      title: season.title,
      type: season.type as SeasonType,
      number: season.number,
      episodesCount: season.episodesCount,
      releaseYear: season.releaseYear,
      mainAntagonist: season.mainAntagonist,
      createdAt: season.createdAt,
      updatedAt: season.updatedAt,
      characters: characterRows,
      weapons: weaponRows,
      locations: locationRows,
    };
  }

  async update(
    id: number,
    updateSeasonDto: UpdateSeasonDto,
  ): Promise<SeasonDetailDto> {
    if (Object.keys(updateSeasonDto).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const [season] = await this.db
      .update(seasons)
      .set(updateSeasonDto)
      .where(eq(seasons.id, id))
      .returning();

    if (!season) {
      throw new NotFoundException(`Season with id ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const [deleted] = await this.db
      .delete(seasons)
      .where(eq(seasons.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Season with id ${id} not found`);
    }
  }
}
