import { pgTable, text } from "drizzle-orm/pg-core";

//create table called testing
export const testing = pgTable("testing", {
  //columns
  id: text("id").notNull().primaryKey(),
  name: text("name"),
});
