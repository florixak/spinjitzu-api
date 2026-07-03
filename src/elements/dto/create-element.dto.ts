import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateElementDto {
  @ApiProperty({
    description: 'The name of the element',
    example: 'Fire',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'The description of the element',
    example: 'Fire is a element that burns',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
