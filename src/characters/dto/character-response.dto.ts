import { ApiProperty } from '@nestjs/swagger';

export class CharacterListItemDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty({ type: [String], nullable: true }) aliases: string[] | null;
  @ApiProperty({ nullable: true }) species: string | null;
  @ApiProperty({ nullable: true }) status: string | null;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

export class CharacterElementDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() isActive: boolean;
}

export class CharacterWeaponDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() type: string;
}

export class CharacterSeasonDto {
  @ApiProperty() id: number;
  @ApiProperty({ nullable: true }) number: number | null;
  @ApiProperty() title: string;
}

export class CharacterDetailDto extends CharacterListItemDto {
  @ApiProperty({ nullable: true }) debutSeasonId: number | null;
  @ApiProperty({ type: [CharacterElementDto] }) elements: CharacterElementDto[];
  @ApiProperty({ type: [CharacterWeaponDto] }) weapons: CharacterWeaponDto[];
  @ApiProperty({ type: [CharacterSeasonDto] }) seasons: CharacterSeasonDto[];
}
