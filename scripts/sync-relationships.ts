/**
 * Sync Relationships to Supabase
 *
 * Run with: npx tsx scripts/sync-relationships.ts
 *
 * This script syncs the local relationships data to the Supabase database.
 * It uses upsert to insert new relationships or update existing ones.
 */

import { createClient } from "@supabase/supabase-js";
import { getRelationshipsForSupabase } from "../data/relationships";

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables!");
  console.error("Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncRelationships() {
  console.log("🔄 Syncing relationships to Supabase...\n");

  const relationships = getRelationshipsForSupabase();
  console.log(`📊 Found ${relationships.length} relationships to sync\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const rel of relationships) {
    try {
      const { error } = await supabase
        .from("relationships_master")
        .upsert(rel, { onConflict: "id" });

      if (error) {
        console.error(`❌ Error syncing ${rel.id}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`✅ Synced: ${rel.id} (${rel.english})`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception syncing ${rel.id}:`, err);
      errorCount++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`📊 Sync Complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log("=".repeat(50));

  // Verify the data
  const { data, error } = await supabase
    .from("relationships_master")
    .select("id, english")
    .order("id");

  if (error) {
    console.error("\n❌ Error verifying data:", error.message);
  } else {
    console.log(`\n📋 Total relationships in database: ${data?.length || 0}`);
  }
}

// Run the sync
syncRelationships().catch(console.error);
