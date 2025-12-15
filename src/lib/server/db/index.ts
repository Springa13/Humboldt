// src/lib/server/db.ts (or similar)
import 'dotenv/config'; // For local development only, SvelteKit handles this for Vercel
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

// The key 'DATABASE_URL' is a common convention
const connectionString: string = env.DATABASE_URL as string; 

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(connectionString);

export { sql };