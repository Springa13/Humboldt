// test_connection.js
import 'dotenv/config'; 
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is missing!');
    process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { 
    max: 1, 
    ssl: 'require', // Explicitly require SSL
    connect_timeout: 10 // Increase timeout for test
});

async function runTest() {
    console.log('Attempting to connect to Neon...');
    try {
        const result = await sql`SELECT NOW()`;
        console.log('✅ Connection Successful! Current DB time:', result[0].now);
    } catch (error) {
        console.error('❌ Connection Failed with Error:', error);
    } finally {
        await sql.end();
    }
}

runTest();