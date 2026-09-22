import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const tickets = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('received'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;
