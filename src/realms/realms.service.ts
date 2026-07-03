import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, asc, count, desc, eq, ilike, ne, SQL } from 'drizzle-orm';
import { ApiSuccessResponseWithPagination } from 'src/common/interfaces/api-response.interface';
import { PaginationMeta } from 'src/common/interfaces/pagination-meta.interface';
import { rethrowIfUniqueViolation } from 'src/common/utils/postgres-unique-violation.util';
import type { Database } from 'src/database/database-connection';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { realms } from 'src/database/schema';
import { CreateRealmDto } from './dto/create-realm.dto';
import { RealmQueryDto } from './dto/realm-query.dto';
import { RealmDetailDto, RealmListItemDto } from './dto/realm-response.dto';
import { UpdateRealmDto } from './dto/update-realm.dto';

const SORT_COLUMN_MAP = {
  name: realms.name,
  createdAt: realms.createdAt,
};

@Injectable()
export class RealmsService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async create(createRealmDto: CreateRealmDto): Promise<RealmDetailDto> {
    await this.assertNameAvailable(createRealmDto.name);

    try {
      const [realm] = await this.db
        .insert(realms)
        .values(createRealmDto)
        .returning();

      return {
        id: realm.id,
        name: realm.name,
        description: realm.description,
        createdAt: realm.createdAt,
        updatedAt: realm.updatedAt,
      };
    } catch (error) {
      rethrowIfUniqueViolation(
        error,
        `Realm with name '${createRealmDto.name}' already exists`,
      );
    }
  }

  async findAll(
    query: RealmQueryDto,
  ): Promise<ApiSuccessResponseWithPagination<RealmListItemDto[]>> {
    const {
      page = 1,
      limit = 20,
      name,
      order = 'asc',
      sortBy = 'name',
    } = query;

    const conditions: SQL[] = [];
    if (name) conditions.push(ilike(realms.name, `%${name}%`));

    const whereClause = conditions.length ? and(...conditions) : undefined;
    const sortColumn = SORT_COLUMN_MAP[sortBy];
    const orderFn = order === 'desc' ? desc : asc;

    const dataQuery = this.db
      .select()
      .from(realms)
      .where(whereClause)
      .orderBy(orderFn(sortColumn))
      .limit(limit)
      .offset((page - 1) * limit);

    const countQuery = this.db
      .select({ total: count() })
      .from(realms)
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
        name: row.name,
        description: row.description,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      })),
      meta,
    };
  }

  async findOne(id: number): Promise<RealmDetailDto> {
    const [realm] = await this.db
      .select()
      .from(realms)
      .where(eq(realms.id, id))
      .limit(1);

    if (!realm) {
      throw new NotFoundException(`Realm with id ${id} not found`);
    }

    return {
      id: realm.id,
      name: realm.name,
      description: realm.description,
      createdAt: realm.createdAt,
      updatedAt: realm.updatedAt,
    };
  }

  async update(
    id: number,
    updateRealmDto: UpdateRealmDto,
  ): Promise<RealmDetailDto> {
    if (Object.keys(updateRealmDto).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    if (updateRealmDto.name !== undefined) {
      await this.assertNameAvailable(updateRealmDto.name, id);
    }

    try {
      const [realm] = await this.db
        .update(realms)
        .set(updateRealmDto)
        .where(eq(realms.id, id))
        .returning();

      if (!realm) {
        throw new NotFoundException(`Realm with id ${id} not found`);
      }

      return {
        id: realm.id,
        name: realm.name,
        description: realm.description,
        createdAt: realm.createdAt,
        updatedAt: realm.updatedAt,
      };
    } catch (error) {
      if (updateRealmDto.name !== undefined) {
        rethrowIfUniqueViolation(
          error,
          `Realm with name '${updateRealmDto.name}' already exists`,
        );
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const [deleted] = await this.db
      .delete(realms)
      .where(eq(realms.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Realm with id ${id} not found`);
    }
  }

  private async assertNameAvailable(
    name: string,
    excludeId?: number,
  ): Promise<void> {
    const conditions = [eq(realms.name, name)];
    if (excludeId !== undefined) {
      conditions.push(ne(realms.id, excludeId));
    }

    const [existing] = await this.db
      .select({ id: realms.id })
      .from(realms)
      .where(and(...conditions))
      .limit(1);

    if (existing) {
      throw new ConflictException(`Realm with name '${name}' already exists`);
    }
  }
}
