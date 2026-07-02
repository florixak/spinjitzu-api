import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CharacterStatus } from '../enums/character-status.enum';

const SORTABLE_FIELDS = ['name', 'status', 'species', 'createdAt'] as const;

export class CharacterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Partial, case-insensitive match on name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Element name, e.g. Fire' })
  @IsOptional()
  @IsString()
  element?: string;

  @ApiPropertyOptional({
    enum: CharacterStatus,
    description: 'Character status',
  })
  @IsOptional()
  @IsEnum(CharacterStatus)
  status?: CharacterStatus;

  @ApiPropertyOptional({ description: 'Season number, e.g. 4' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  season?: number;

  @ApiPropertyOptional({ enum: SORTABLE_FIELDS, default: 'name' })
  @IsOptional()
  @IsIn(SORTABLE_FIELDS)
  sortBy?: (typeof SORTABLE_FIELDS)[number] = 'name';
}
