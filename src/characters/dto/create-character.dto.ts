import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { CharacterSpecies } from '../enums/character-species.enum';
import { CharacterStatus } from '../enums/character-status.enum';

export class CreateCharacterDto {
  @ApiProperty({ example: 'Kai' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: [String], example: ['The Fire Ninja'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aliases?: string[];

  @ApiPropertyOptional({
    enum: CharacterSpecies,
    example: CharacterSpecies.HUMAN,
  })
  @IsOptional()
  @IsEnum(CharacterSpecies)
  species?: CharacterSpecies;

  @ApiPropertyOptional({
    enum: CharacterStatus,
    example: CharacterStatus.ALIVE,
  })
  @IsOptional()
  @IsEnum(CharacterStatus)
  status?: CharacterStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  debutSeasonId?: number;
}
