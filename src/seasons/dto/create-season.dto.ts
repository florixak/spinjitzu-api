import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
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
  number: number;

  @ApiProperty({
    example: 'Rise of the Snakes',
    description: 'The season title',
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    enum: SeasonType,
    example: SeasonType.STANDARD,
    description: 'The season type',
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
    example: 2011,
    description: 'The year the season was released',
  })
  @IsInt()
  @Min(1900)
  @Max(2100)
  @IsOptional()
  releaseYear: number;

  @ApiPropertyOptional({
    example: 'Pythor P. Chumsworth',
    description: 'The main antagonist of the season',
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  mainAntagonist: string;
}
