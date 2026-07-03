import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CharacterListItemDto } from 'src/characters/dto/character-response.dto';

export class ElementListItemDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
}

export class ElementDetailDto extends ElementListItemDto {
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiPropertyOptional({
    type: String,
    nullable: true,
    example: 'The elemental power of fire...',
  })
  description: string | null;
  @ApiProperty({
    type: [CharacterListItemDto],
    description:
      'List of element masters that have this element or had it in the past',
  })
  masters: CharacterListItemDto[];
}
