import { pgTable, varchar, text, integer, index } from 'drizzle-orm/pg-core';
import { idColumn, timestamps } from './helpers';
import { realms } from './realms.schema';

export const locations = pgTable(
  'locations',
  {
    id: idColumn(),
    name: varchar('name', { length: 255 }).notNull(),
    realmId: integer('realm_id').references(() => realms.id, {
      onDelete: 'set null',
    }),
    description: text('description'),
    ...timestamps,
  },
  (table) => [
    index('locations_name_idx').on(table.name),
    index('locations_realm_id_idx').on(table.realmId),
  ],
);
