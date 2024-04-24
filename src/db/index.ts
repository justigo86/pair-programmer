import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
//imported to query and store data
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from "postgres";
import * as schema from "./schema";

// for migrations - not going to use right now
// const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });
// migrate(drizzle(migrationClient), ...)

// for query purposes
// const queryClient = postgres(process.env.DATABASE_URL!);
// const db = drizzle(queryClient, { schema });

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}
let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
  }

  db = global.db;
}
//comes from online forum - done to prevent

export { db };
// await db.select().from(...)...
