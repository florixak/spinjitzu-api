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

export class CreateSeasonDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'The season number',
  })
  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  number?: number;

  @ApiProperty({
    example: 'Rise of the Snakes',
    description: 'The season title',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({
    enum: SeasonType,
    example: SeasonType.STANDARD,
    description: 'The season type',
    default: SeasonType.STANDARD,
  })
  @IsOptional()
  @IsEnum(SeasonType)
  type?: SeasonType;

  @ApiProperty({
    example: 13,
    description: 'The number of episodes in the season',
  })
  @IsInt()
  @Min(1)
  episodesCount: number;

  @ApiPropertyOptional({
    example: 2012,
    description: 'The year the season was released',
  })
  @IsInt()
  @Min(1900)
  @Max(2100)
  @IsOptional()
  releaseYear?: number;

  @ApiPropertyOptional({
    example: 'Pythor P. Chumsworth',
    description: 'The main antagonist of the season',
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  mainAntagonist?: string;
}
