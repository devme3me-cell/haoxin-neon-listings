#!/usr/bin/env bun
// Test script to verify Neon database connection
import { neon } from '@neondatabase/serverless';

// Load environment variables
const databaseUrl = process.env.VITE_DATABASE_URL;

console.log('\n🔍 Testing Neon Database Connection...\n');

if (!databaseUrl) {
  console.error('❌ Error: VITE_DATABASE_URL not found in environment');
  console.log('Please make sure .env file exists with VITE_DATABASE_URL set');
  process.exit(1);
}

// Hide password in output
const maskedUrl = databaseUrl.replace(/:([^:@]+)@/, ':***@');
console.log(`📡 Connection String: ${maskedUrl}\n`);

try {
  // Initialize Neon client
  const sql = neon(databaseUrl);

  console.log('1️⃣ Testing basic connection...');
  const versionResult = await sql`SELECT version()`;
  console.log(`   ✅ Connected! PostgreSQL Version: ${versionResult[0].version.split(' ')[1]}\n`);

  console.log('2️⃣ Checking if listings table exists...');
  const tableCheck = await sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_name = 'listings'
    )
  `;

  if (tableCheck[0].exists) {
    console.log('   ✅ Listings table exists\n');

    console.log('3️⃣ Counting listings in database...');
    const countResult = await sql`SELECT COUNT(*) FROM listings`;
    const count = countResult[0].count;
    console.log(`   ✅ Found ${count} listings in database\n`);

    if (parseInt(count) > 0) {
      console.log('4️⃣ Fetching sample listing...');
      const sampleResult = await sql`SELECT id, title, type, location FROM listings LIMIT 1`;
      const sample = sampleResult[0];
      console.log(`   ✅ Sample listing:`);
      console.log(`      ID: ${sample.id}`);
      console.log(`      Title: ${sample.title}`);
      console.log(`      Type: ${sample.type}`);
      console.log(`      Location: ${sample.location}\n`);
    } else {
      console.log('⚠️  No listings found. Run the schema file to populate initial data.\n');
    }

    console.log('✅ All tests passed! Neon database is ready to use.\n');
    console.log('🚀 You can now:');
    console.log('   1. Visit http://localhost:8080 to see the website');
    console.log('   2. Visit http://localhost:8080/admin (password: haoxin2026) to manage listings');
    console.log('   3. Check the admin panel - it should show a green "Neon" badge\n');

  } else {
    console.log('   ❌ Listings table does not exist\n');
    console.log('📝 Please run the schema file:');
    console.log('   1. Go to https://console.neon.tech');
    console.log('   2. Open SQL Editor');
    console.log('   3. Copy and paste contents of neon-schema.sql');
    console.log('   4. Click "Run"\n');
  }

} catch (error) {
  console.error('\n❌ Connection Error:');
  console.error(error);
  console.log('\n🔧 Troubleshooting:');
  console.log('   1. Check your VITE_DATABASE_URL in .env file');
  console.log('   2. Make sure your Neon database is active (not paused)');
  console.log('   3. Verify the connection string includes ?sslmode=require');
  console.log('   4. Test the connection in Neon SQL Editor first\n');
  process.exit(1);
}
