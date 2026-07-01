import { pgTable, varchar, text } from 'drizzle-orm/pg-core';
import { idColumn, timestamps } from './helpers';

export const elements = pgTable('elements', {
  id: idColumn(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  ...timestamps,
});
