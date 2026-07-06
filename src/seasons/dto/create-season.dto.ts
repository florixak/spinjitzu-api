import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { SeasonType } from '../enums/season-type.enum';
import { Type } from 'class-transformer';

export class CreateSeasonDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'The season number',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'number must be an integer' })
  @Min(0, { message: 'number must be at least 0' })
  @Max(999, { message: 'number must not exceed 999' })
  number?: number;

  @ApiProperty({
    example: 'Rise of the Snakes',
    description: 'The season title',
  })
  @IsNotEmpty({ message: 'title must not be empty' })
  @IsString({ message: 'title must be a string' })
  @MaxLength(255, { message: 'title must not exceed 255 characters' })
  title: string;

  @ApiProperty({
    example: 'The season description',
    description: 'The season description',
  })
  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description must be a string' })
  @MaxLength(1000, { message: 'description must not exceed 1000 characters' })
  description: string;

  @ApiPropertyOptional({
    enum: SeasonType,
    example: SeasonType.STANDARD,
    description: 'The season type',
    default: SeasonType.STANDARD,
  })
  @IsOptional()
  @IsEnum(SeasonType, {
    message: `type must be one of: ${Object.values(SeasonType).join(', ')}`,
  })
  type?: SeasonType;

  @ApiProperty({
    example: 13,
    description: 'The number of episodes in the season',
  })
  @Type(() => Number)
  @IsInt({ message: 'episodesCount must be an integer' })
  @Min(1, { message: 'episodesCount must be at least 1' })
  @Max(999, { message: 'episodesCount must not exceed 999' })
  episodesCount: number;

  @ApiPropertyOptional({
    example: 2012,
    description: 'The year the season was released',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'releaseYear must be an integer' })
  @Min(2011, { message: 'releaseYear must be at least 2011' })
  @Max(2100, { message: 'releaseYear must not exceed 2100' })
  releaseYear?: number;

  @ApiPropertyOptional({
    example: 'Pythor P. Chumsworth',
    description: 'The main antagonist of the season',
  })
  @IsOptional()
  @IsString({ message: 'mainAntagonist must be a string' })
  @MaxLength(255, {
    message: 'mainAntagonist must not exceed 255 characters',
  })
  mainAntagonist?: string;
}
