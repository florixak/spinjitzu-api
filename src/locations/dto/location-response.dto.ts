import { ApiProperty } from '@nestjs/swagger';

export class LocationListItemDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true }) realmId: number | null;
  @ApiProperty({ nullable: true }) description: string | null;
}

export class LocationRealmDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
}

export class LocationSeasonDto {
  @ApiProperty() id: number;
  @ApiProperty({ nullable: true }) number: number | null;
  @ApiProperty() title: string;
}

export class LocationDetailDto extends LocationListItemDto {
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;

  @ApiProperty({ type: LocationRealmDto, nullable: true })
  realm: LocationRealmDto | null;

  @ApiProperty({ type: [LocationSeasonDto] })
  seasons: LocationSeasonDto[];
}
