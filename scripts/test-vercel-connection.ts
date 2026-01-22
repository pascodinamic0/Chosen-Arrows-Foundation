#!/usr/bin/env tsx

/**
 * Test script to verify Vercel/Supabase connection
 * Run with: npm run tsx scripts/test-vercel-connection.ts
 */

async function testConnection() {
  console.log('🔍 Testing Vercel/Supabase connection...\n')

  // Test environment variables
  console.log('📋 Environment Variables:')
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SITE_URL'
  ]

  let envVarsOk = true
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar]
    if (!value) {
      console.log(`❌ ${envVar}: MISSING`)
      envVarsOk = false
    } else {
      console.log(`✅ ${envVar}: ${value.substring(0, 50)}...`)
    }
  }

  if (!envVarsOk) {
    console.log('\n❌ Environment variables are missing. Please check your Vercel project settings.')
    process.exit(1)
  }

  // Test Supabase connection
  console.log('\n🔌 Testing Supabase connection...')
  try {
    const { createClient } = await import('../src/lib/supabase/server')
    const supabase = await createClient()

    // Test basic query
    const { data, error } = await supabase
      .from('site_settings')
      .select('count')
      .limit(1)

    if (error) {
      console.log(`❌ Supabase query failed: ${error.message}`)
      console.log('This might indicate RLS policies or database issues.')
    } else {
      console.log('✅ Supabase connection successful')
    }

    // Check for required site settings
    console.log('\n🔧 Checking required site settings...')
    const requiredSettings = ['contact_info', 'social_links', 'hero_stats']
    let missingSettings = []

    for (const settingKey of requiredSettings) {
      const { data: settingData, error: settingError } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', settingKey)
        .limit(1)

      if (settingError) {
        console.log(`❌ Error checking setting "${settingKey}": ${settingError.message}`)
      } else if (!settingData || settingData.length === 0) {
        console.log(`❌ Setting "${settingKey}" not found`)
        missingSettings.push(settingKey)
      } else {
        console.log(`✅ Setting "${settingKey}" exists`)
      }
    }

    if (missingSettings.length > 0) {
      console.log(`\n⚠️  Missing settings: ${missingSettings.join(', ')}`)
      console.log('   Run: npm run seed-settings')
    }
  } catch (error) {
    console.log(`❌ Supabase client creation failed: ${error}`)
  }

  console.log('\n🏁 Connection test complete.')
}

testConnection().catch(console.error)