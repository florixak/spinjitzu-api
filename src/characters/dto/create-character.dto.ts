import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty({ example: 'Kai' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: [String], example: ['The Fire Ninja'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aliases?: string[];

  @ApiPropertyOptional({ example: 'Human' })
  @IsOptional()
  @IsString()
  species?: string;

  @ApiPropertyOptional({ example: 'Alive' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  debutSeasonId?: number;
}
