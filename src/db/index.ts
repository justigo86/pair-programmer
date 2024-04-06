import { drizzle } from "drizzle-orm/postgres-js";
//imported to query and store data
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from "postgres";

// for migrations - not going to use right now
// const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });
// migrate(drizzle(migrationClient), ...)

// for query purposes
const queryClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
const db = drizzle(queryClient);

export { db };
// await db.select().from(...)...
