import { relations } from 'drizzle-orm';
import { characters } from './characters.schema';
import { elements } from './elements.schema';
import { locations } from './locations.schema';
import {
  charactersToElements,
  charactersToSeasons,
  charactersToWeapons,
  locationsToSeasons,
  weaponsToSeasons,
} from './junctions.schema';
import { realms } from './realms.schema';
import { seasons } from './seasons.schema';
import { weapons } from './weapons.schema';

export const charactersRelations = relations(characters, ({ many, one }) => ({
  debutSeason: one(seasons, {
    fields: [characters.debutSeasonId],
    references: [seasons.id],
  }),
  charactersToElements: many(charactersToElements),
  charactersToSeasons: many(charactersToSeasons),
  charactersToWeapons: many(charactersToWeapons),
}));

export const charactersToElementsRelations = relations(
  charactersToElements,
  ({ one }) => ({
    element: one(elements, {
      fields: [charactersToElements.elementId],
      references: [elements.id],
    }),
    character: one(characters, {
      fields: [charactersToElements.characterId],
      references: [characters.id],
    }),
  }),
);

export const charactersToSeasonsRelations = relations(
  charactersToSeasons,
  ({ one }) => ({
    season: one(seasons, {
      fields: [charactersToSeasons.seasonId],
      references: [seasons.id],
    }),
    character: one(characters, {
      fields: [charactersToSeasons.characterId],
      references: [characters.id],
    }),
  }),
);

export const charactersToWeaponsRelations = relations(
  charactersToWeapons,
  ({ one }) => ({
    weapon: one(weapons, {
      fields: [charactersToWeapons.weaponId],
      references: [weapons.id],
    }),
    character: one(characters, {
      fields: [charactersToWeapons.characterId],
      references: [characters.id],
    }),
  }),
);

export const elementsRelations = relations(elements, ({ many }) => ({
  charactersToElements: many(charactersToElements),
}));

export const seasonsRelations = relations(seasons, ({ many }) => ({
  charactersToSeasons: many(charactersToSeasons),
  weaponsToSeasons: many(weaponsToSeasons),
  locationsToSeasons: many(locationsToSeasons),
}));

export const weaponsRelations = relations(weapons, ({ many }) => ({
  charactersToWeapons: many(charactersToWeapons),
  weaponsToSeasons: many(weaponsToSeasons),
}));

export const weaponsToSeasonsRelations = relations(
  weaponsToSeasons,
  ({ one }) => ({
    weapon: one(weapons, {
      fields: [weaponsToSeasons.weaponId],
      references: [weapons.id],
    }),
    season: one(seasons, {
      fields: [weaponsToSeasons.seasonId],
      references: [seasons.id],
    }),
  }),
);

export const locationsRelations = relations(locations, ({ one, many }) => ({
  realm: one(realms, {
    fields: [locations.realmId],
    references: [realms.id],
  }),
  locationsToSeasons: many(locationsToSeasons),
}));

export const locationsToSeasonsRelations = relations(
  locationsToSeasons,
  ({ one }) => ({
    location: one(locations, {
      fields: [locationsToSeasons.locationId],
      references: [locations.id],
    }),
    season: one(seasons, {
      fields: [locationsToSeasons.seasonId],
      references: [seasons.id],
    }),
  }),
);

export const realmsRelations = relations(realms, ({ many }) => ({
  locations: many(locations),
}));
