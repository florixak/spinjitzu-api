import { ApiProperty } from '@nestjs/swagger';

export class ElementListItemDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() description: string;
}

export class ElementDetailDto extends ElementListItemDto {
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
