#!/usr/bin/env tsx
/**
 * Seed initial site settings
 * Run with: npm run seed-settings
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing environment variables')
  console.error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function seedSettings() {
  console.log('🌱 Seeding site settings...')

  try {
    // Insert contact_info
    const { error: contactError } = await supabase
      .from('site_settings')
      .upsert({
        setting_key: 'contact_info',
        setting_value: {
          email: "ChosenArrowsFoundation@gmail.com",
          phone: "+254-XXX-XXXXXX",
          address: "Nairobi, Kenya"
        },
        description: 'Contact information displayed in footer'
      }, { onConflict: 'setting_key' })

    if (contactError) {
      console.error('❌ Error seeding contact_info:', contactError.message)
    } else {
      console.log('✅ Seeded contact_info')
    }

    // Insert social_links
    const { error: socialError } = await supabase
      .from('site_settings')
      .upsert({
        setting_key: 'social_links',
        setting_value: {
          facebook: "https://facebook.com/chosenarrowsfoundation",
          twitter: "https://twitter.com/chosenarrows",
          instagram: "https://instagram.com/chosenarrows",
          linkedin: "https://linkedin.com/company/chosen-arrows-foundation"
        },
        description: 'Social media links for footer'
      }, { onConflict: 'setting_key' })

    if (socialError) {
      console.error('❌ Error seeding social_links:', socialError.message)
    } else {
      console.log('✅ Seeded social_links')
    }

    // Insert hero_stats
    const { error: statsError } = await supabase
      .from('site_settings')
      .upsert({
        setting_key: 'hero_stats',
        setting_value: {
          childrenSupported: 45,
          activeMentors: 8,
          fundsRaised: 15000
        },
        description: 'Hero section statistics'
      }, { onConflict: 'setting_key' })

    if (statsError) {
      console.error('❌ Error seeding hero_stats:', statsError.message)
    } else {
      console.log('✅ Seeded hero_stats')
    }

    console.log('\n🎉 Site settings seeded successfully!')
    console.log('You can now redeploy to Vercel to fix the server-side exception.')

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  }
}

seedSettings()