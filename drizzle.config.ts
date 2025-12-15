import 'dotenv/config'; // Crucial for reading .env variables locally
import { defineConfig } from 'drizzle-kit';

// Check for the environment variable, as Drizzle Kit needs it to run migrations
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is missing.');
}

export default defineConfig({
    // 1. Specify the SQL dialect. Neon is PostgreSQL.
    dialect: 'postgresql',

    // 2. Define the path(s) to your Drizzle schema files.
    // Use a glob pattern if you have multiple files, e.g., './src/db/schema/*.ts'
    schema: './src/lib/server/db/schema.ts', 

    // 3. Define the output directory for generated migrations.
    out: './drizzle',

    // 4. Database Credentials
    dbCredentials: {
        // Use the 'url' property to pass the full connection string
        url: process.env.DATABASE_URL,
    },

    // 5. (Optional, but often helpful) Set the driver configuration
    // While not strictly required for Drizzle Kit itself, it's good for clarity.
    // driver: 'pg', // Not used with the 'dialect' property, but useful for older configs
});