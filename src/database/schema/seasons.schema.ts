import { pgTable, varchar, integer, index } from 'drizzle-orm/pg-core';
import { idColumn, timestamps } from './helpers';

export const seasons = pgTable(
  'seasons',
  {
    id: idColumn(),
    number: integer('number'),
    type: varchar('type', { length: 50 }).default('standard').notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    episodesCount: integer('episodes_count').notNull(),
    releaseYear: integer('release_year'),
    mainAntagonist: varchar('main_antagonist', { length: 255 }),
    ...timestamps,
  },
  (table) => [index('seasons_number_idx').on(table.number)],
);
