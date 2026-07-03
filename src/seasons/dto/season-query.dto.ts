import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { SeasonType } from '../enums/season-type.enum';

const SORTABLE_FIELDS = ['title', 'type', 'number', 'releaseYear'] as const;

export class SeasonQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Partial, case-insensitive match on title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Season type',
  })
  @IsOptional()
  @IsEnum(SeasonType)
  type?: SeasonType;

  @ApiPropertyOptional({
    description: 'Season number',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  number?: number;

  @ApiPropertyOptional({
    description: 'Season release year',
  })
  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(2100)
  releaseYear?: number;

  @ApiPropertyOptional({ enum: SORTABLE_FIELDS, default: 'title' })
  @IsOptional()
  @IsIn(SORTABLE_FIELDS)
  declare sortBy?: (typeof SORTABLE_FIELDS)[number];
}
