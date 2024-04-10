import { defineConfig } from "drizzle-kit";

//telling DrizzleKit how to connect to the database
export default defineConfig({
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
