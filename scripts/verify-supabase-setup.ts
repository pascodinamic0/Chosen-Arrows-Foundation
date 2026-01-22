#!/usr/bin/env tsx
/**
 * Verify Supabase Setup
 * Checks that all required configuration is in place
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔍 Verifying Supabase Setup...\n')

// Check environment variables
console.log('1. Checking environment variables...')
if (!SUPABASE_URL) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set')
  process.exit(1)
}
if (!SUPABASE_ANON_KEY) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set')
  process.exit(1)
}
if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not set')
  process.exit(1)
}
console.log('✅ Environment variables are set')

// Check URL format
if (!SUPABASE_URL.includes('supabase.co')) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL does not look like a valid Supabase URL')
  process.exit(1)
}
console.log(`✅ Supabase URL: ${SUPABASE_URL}\n`)

// Test connection
console.log('2. Testing database connection...')
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function verifySetup() {
  try {
    // Check if tables exist
    console.log('3. Checking required tables...')
    const requiredTables = [
      'content_sections',
      'content_translations',
      'campaigns',
      'campaign_translations',
      'campaign_images',
      'campaign_updates',
      'testimonials',
      'site_settings',
      'admin_users',
      'content_audit_log',
      'page_metadata',
    ]

    for (const table of requiredTables) {
      try {
        const { error } = await supabase.from(table).select('*').limit(1)
        if (error && error.code === '42P01') {
          console.error(`❌ Table '${table}' does not exist`)
          console.error('   Run the migration: supabase/migrations/001_initial_schema.sql')
          process.exit(1)
        } else if (error && error.code !== 'PGRST116') {
          // PGRST116 is "no rows returned" which is fine
          console.warn(`⚠️  Table '${table}' exists but may have issues: ${error.message}`)
        } else {
          console.log(`✅ Table '${table}' exists`)
        }
      } catch (err) {
        console.error(`❌ Error checking table '${table}':`, err)
        process.exit(1)
      }
    }

    // Check admin_users
    console.log('\n4. Checking admin users...')
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('id, role, full_name')
      .limit(10)

    if (adminError) {
      console.error('❌ Error fetching admin users:', adminError.message)
      process.exit(1)
    }

    if (!adminUsers || adminUsers.length === 0) {
      console.warn('⚠️  No admin users found')
      console.warn('   Create an admin user using scripts/create-admin-user.sql')
    } else {
      console.log(`✅ Found ${adminUsers.length} admin user(s):`)
      adminUsers.forEach(user => {
        console.log(`   - ${user.full_name || 'No name'} (${user.role})`)
      })
    }

    // Check storage bucket
    console.log('\n5. Checking storage bucket...')
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()

    if (bucketError) {
      console.error('❌ Error checking storage:', bucketError.message)
      process.exit(1)
    }

    const imagesBucket = buckets?.find(b => b.name === 'images')
    if (!imagesBucket) {
      console.warn('⚠️  Storage bucket "images" not found')
      console.warn('   Create it in Supabase Dashboard → Storage')
    } else {
      console.log('✅ Storage bucket "images" exists')
      console.log(`   Public: ${imagesBucket.public ? 'Yes' : 'No'}`)
      if (!imagesBucket.public) {
        console.warn('   ⚠️  Bucket should be public for image access')
      }
    }

    // Check functions
    console.log('\n6. Checking database functions...')
    const { data: functions, error: funcError } = await supabase.rpc('is_admin_user')

    // This will fail if function doesn't exist, but that's okay for now
    // We'll just note it
    if (funcError && funcError.message.includes('function') && funcError.message.includes('does not exist')) {
      console.warn('⚠️  Function is_admin_user() may not exist')
      console.warn('   This should be created by the migration')
    } else {
      console.log('✅ Database functions appear to be working')
    }

    console.log('\n✅ Setup verification complete!')
    console.log('\n📝 Next steps:')
    console.log('   1. If no admin users exist, create one using scripts/create-admin-user.sql')
    console.log('   2. If storage bucket is missing, create it in Supabase Dashboard')
    console.log('   3. Start the dev server: npm run dev')
    console.log('   4. Test login at: http://localhost:3000/admin/login')

  } catch (error) {
    console.error('\n❌ Verification failed:', error)
    process.exit(1)
  }
}

verifySetup()
