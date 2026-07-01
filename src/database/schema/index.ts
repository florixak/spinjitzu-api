export { characters } from './characters.schema';
export { elements } from './elements.schema';
export { locations } from './locations.schema';
export { realms } from './realms.schema';
export { seasons } from './seasons.schema';
export { weapons } from './weapons.schema';
export {
  charactersToElements,
  charactersToSeasons,
  charactersToWeapons,
  locationsToSeasons,
  weaponsToSeasons,
} from './junctions.schema';
export { users } from './users.schema';

export {
  charactersRelations,
  charactersToElementsRelations,
  charactersToSeasonsRelations,
  charactersToWeaponsRelations,
  elementsRelations,
  locationsRelations,
  locationsToSeasonsRelations,
  realmsRelations,
  seasonsRelations,
  weaponsRelations,
  weaponsToSeasonsRelations,
} from './relations.schema';
