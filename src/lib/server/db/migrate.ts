// src/db/migrate.ts
import 'dotenv/config'; // Crucial for reading .env
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is missing for migration.');
}

// 🚨 IMPORTANT: You must use the full connection string here!
const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });

async function runMigrate() {
    console.log('Migrating database...');
    
    // Create the Drizzle instance using the postgres client
    const db = drizzle(migrationClient);

    await migrate(db, { migrationsFolder: './drizzle' });

    console.log('Database migration complete!');
    await migrationClient.end(); // Close the connection
    process.exit(0);
}

runMigrate().catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
});