#!/usr/bin/env tsx
/**
 * Verification script for Supabase setup
 * Run with: npx tsx scripts/verify-setup.ts
 */

import { createClient } from '@supabase/supabase-js'

async function verifySetup() {
  console.log('🔍 Verifying Supabase Setup...\n')

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  console.log('1. Checking Environment Variables...')
  
  if (!supabaseUrl || supabaseUrl.includes('[your-project-ref]')) {
    console.error('   ❌ NEXT_PUBLIC_SUPABASE_URL is not set or contains placeholder')
    return false
  }
  console.log('   ✅ NEXT_PUBLIC_SUPABASE_URL is set')

  if (!supabaseAnonKey || supabaseAnonKey.includes('[your-anon-key]')) {
    console.error('   ❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set or contains placeholder')
    return false
  }
  console.log('   ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set')

  if (!serviceRoleKey || serviceRoleKey.includes('[your-service-role-key]')) {
    console.warn('   ⚠️  SUPABASE_SERVICE_ROLE_KEY is not set (optional for basic setup)')
  } else {
    console.log('   ✅ SUPABASE_SERVICE_ROLE_KEY is set')
  }

  // Test database connection
  console.log('\n2. Testing Database Connection...')
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test reading from a table (should work even if empty)
    const { data, error } = await supabase
      .from('content_sections')
      .select('id')
      .limit(1)
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.error('   ❌ Table "content_sections" does not exist')
        console.error('   → Run the database migration first!')
        console.error('   → See: supabase/migrations/001_initial_schema.sql')
        return false
      }
      console.error('   ❌ Database connection error:', error.message)
      return false
    }
    
    console.log('   ✅ Database connection successful')
    console.log('   ✅ Tables exist')
  } catch (error: any) {
    console.error('   ❌ Connection failed:', error.message)
    return false
  }

  // Check for admin users
  console.log('\n3. Checking Admin Users...')
  
  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey || supabaseAnonKey)
    const { data: adminUsers, error } = await supabase
      .from('admin_users')
      .select('id, role, full_name')
      .limit(1)
    
    if (error) {
      console.error('   ❌ Error checking admin users:', error.message)
      return false
    }
    
    if (!adminUsers || adminUsers.length === 0) {
      console.warn('   ⚠️  No admin users found')
      console.warn('   → Create an admin user in Supabase dashboard')
      console.warn('   → See SETUP_GUIDE.md for instructions')
    } else {
      console.log(`   ✅ Found ${adminUsers.length} admin user(s)`)
      adminUsers.forEach(user => {
        console.log(`      - ${user.full_name || 'Unnamed'} (${user.role})`)
      })
    }
  } catch (error: any) {
    console.error('   ❌ Error:', error.message)
  }

  // Check storage bucket
  console.log('\n4. Checking Storage Bucket...')
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data: buckets, error } = await supabase.storage.listBuckets()
    
    if (error) {
      console.error('   ❌ Error checking storage:', error.message)
      return false
    }
    
    const imagesBucket = buckets?.find(b => b.name === 'images')
    if (!imagesBucket) {
      console.warn('   ⚠️  "images" bucket not found')
      console.warn('   → Create a public bucket named "images" in Supabase Storage')
    } else {
      console.log('   ✅ "images" bucket exists')
      console.log(`      - Public: ${imagesBucket.public ? 'Yes' : 'No'}`)
    }
  } catch (error: any) {
    console.warn('   ⚠️  Could not check storage (may need service role key)')
  }

  console.log('\n✅ Setup verification complete!')
  console.log('\nNext steps:')
  console.log('1. If tables are missing, run the migration SQL')
  console.log('2. Create an admin user if none exists')
  console.log('3. Create the "images" storage bucket')
  console.log('4. Start the dev server: npm run dev')
  
  return true
}

verifySetup().catch(console.error)
