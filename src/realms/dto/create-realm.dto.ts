import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRealmDto {
  @ApiProperty({ description: 'Realm name' })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  @MaxLength(100, { message: 'name must not exceed 100 characters' })
  name: string;

  @ApiPropertyOptional({ description: 'Realm description' })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;
}
