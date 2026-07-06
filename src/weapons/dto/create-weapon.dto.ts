import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateWeaponDto {
  @ApiProperty({ description: 'The name of the weapon' })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  @MaxLength(255, { message: 'name must not exceed 255 characters' })
  name: string;

  @ApiProperty({ description: 'The type of the weapon' })
  @IsNotEmpty({ message: 'type must not be empty' })
  @IsString({ message: 'type must be a string' })
  @MaxLength(100, { message: 'type must not exceed 100 characters' })
  type: string;

  @ApiPropertyOptional({
    description: 'The description of the weapon',
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Whether the weapon is an artifact',
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isArtifact must be true or false' })
  isArtifact?: boolean;
}
