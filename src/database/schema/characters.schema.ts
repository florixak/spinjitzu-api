import { pgTable, varchar, text, integer, index } from 'drizzle-orm/pg-core';
import { idColumn, timestamps } from './helpers';
import { seasons } from './seasons.schema';

export const characters = pgTable(
  'characters',
  {
    id: idColumn(),
    name: varchar('name', { length: 255 }).notNull(),
    aliases: text('aliases').array(),
    species: varchar('species', { length: 100 }).default('Human'),
    status: varchar('status', { length: 50 }).default('Alive'),
    debutSeasonId: integer('debut_season_id').references(() => seasons.id, {
      onDelete: 'set null',
    }),
    ...timestamps,
  },
  (table) => [index('characters_name_idx').on(table.name)],
);
