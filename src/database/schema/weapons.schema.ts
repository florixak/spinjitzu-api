import { pgTable, varchar, boolean, index, text } from 'drizzle-orm/pg-core';
import { idColumn, timestamps } from './helpers';

export const weapons = pgTable(
  'weapons',
  {
    id: idColumn(),
    name: varchar('name', { length: 255 }).notNull(),
    type: varchar('type', { length: 100 }).notNull(),
    description: text('description'),
    isArtifact: boolean('is_artifact').default(false),
    ...timestamps,
  },
  (table) => [index('weapons_name_idx').on(table.name)],
);
