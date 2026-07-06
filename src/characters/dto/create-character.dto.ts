import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CharacterSpecies } from '../enums/character-species.enum';
import { CharacterStatus } from '../enums/character-status.enum';

export class CreateCharacterDto {
  @ApiProperty({ example: 'Kai' })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiProperty({ example: 'The Fire Ninja' })
  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description must be a string' })
  description: string;

  @ApiPropertyOptional({ type: [String], example: ['The Red Ninja'] })
  @IsOptional()
  @IsArray({ message: 'aliases must be an array' })
  @IsString({ each: true, message: 'each alias must be a string' })
  aliases?: string[];

  @ApiPropertyOptional({
    enum: CharacterSpecies,
    example: CharacterSpecies.HUMAN,
  })
  @IsOptional()
  @IsEnum(CharacterSpecies, {
    message: `species must be one of: ${Object.values(CharacterSpecies).join(', ')}`,
  })
  species?: CharacterSpecies;

  @ApiPropertyOptional({
    enum: CharacterStatus,
    example: CharacterStatus.ALIVE,
  })
  @IsOptional()
  @IsEnum(CharacterStatus, {
    message: `status must be one of: ${Object.values(CharacterStatus).join(', ')}`,
  })
  status?: CharacterStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'debutSeasonId must be an integer' })
  debutSeasonId?: number;
}
