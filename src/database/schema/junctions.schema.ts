import { pgTable, integer, boolean, primaryKey } from 'drizzle-orm/pg-core';
import { characters } from './characters.schema';
import { elements } from './elements.schema';
import { seasons } from './seasons.schema';
import { weapons } from './weapons.schema';
import { locations } from './locations.schema';

export const charactersToElements = pgTable(
  'characters_to_elements',
  {
    characterId: integer('character_id')
      .notNull()
      .references(() => characters.id, { onDelete: 'cascade' }),
    elementId: integer('element_id')
      .notNull()
      .references(() => elements.id, { onDelete: 'cascade' }),
    isActive: boolean('is_active').notNull().default(true),
  },
  (table) => [primaryKey({ columns: [table.characterId, table.elementId] })],
);

export const charactersToSeasons = pgTable(
  'characters_to_seasons',
  {
    characterId: integer('character_id')
      .notNull()
      .references(() => characters.id, { onDelete: 'cascade' }),
    seasonId: integer('season_id')
      .notNull()
      .references(() => seasons.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.characterId, table.seasonId] })],
);

export const charactersToWeapons = pgTable(
  'characters_to_weapons',
  {
    characterId: integer('character_id')
      .notNull()
      .references(() => characters.id, { onDelete: 'cascade' }),
    weaponId: integer('weapon_id')
      .notNull()
      .references(() => weapons.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.characterId, table.weaponId] })],
);

export const weaponsToSeasons = pgTable(
  'weapons_to_seasons',
  {
    weaponId: integer('weapon_id')
      .notNull()
      .references(() => weapons.id, { onDelete: 'cascade' }),
    seasonId: integer('season_id')
      .notNull()
      .references(() => seasons.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.weaponId, table.seasonId] })],
);

export const locationsToSeasons = pgTable(
  'locations_to_seasons',
  {
    locationId: integer('location_id')
      .notNull()
      .references(() => locations.id, { onDelete: 'cascade' }),
    seasonId: integer('season_id')
      .notNull()
      .references(() => seasons.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.locationId, table.seasonId] })],
);
