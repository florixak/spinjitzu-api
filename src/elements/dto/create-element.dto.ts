import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateElementDto {
  @ApiProperty({
    description: 'The name of the element',
    example: 'Fire',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  @MaxLength(100, { message: 'name must not exceed 100 characters' })
  name: string;

  @ApiPropertyOptional({
    description: 'The description of the element',
    example: 'Fire is a element that burns',
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;
}
