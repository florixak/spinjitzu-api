import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    description: 'The name of the location',
    example: 'Monastery of Spinjitzu',
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiPropertyOptional({
    description: 'The realm ID of the location',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'realmId must be an integer' })
  realmId?: number;

  @ApiPropertyOptional({
    description: 'The description of the location',
    example: 'The ninja training grounds',
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string | null;
}
