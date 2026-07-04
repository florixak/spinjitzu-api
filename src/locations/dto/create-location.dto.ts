import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    description: 'The name of the location',
    example: 'The location is in the forest',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'The realm ID of the location',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  realmId?: number;

  @ApiPropertyOptional({
    description: 'The description of the location',
    example: 'The location is in the forest',
  })
  @IsOptional()
  @IsString()
  description?: string | null;
}
