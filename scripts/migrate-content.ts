/**
 * Migration script to populate database from i18n JSON files.
 * 
 * Run with: tsx scripts/migrate-content.ts
 * 
 * Requires:
 * - SUPABASE_SERVICE_ROLE_KEY in environment
 * - NEXT_PUBLIC_SUPABASE_URL in environment
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Load i18n JSON files
const enContent = JSON.parse(
  readFileSync(join(process.cwd(), 'src/i18n/locales/en.json'), 'utf-8')
)
const frContent = JSON.parse(
  readFileSync(join(process.cwd(), 'src/i18n/locales/fr.json'), 'utf-8')
)
const zhContent = JSON.parse(
  readFileSync(join(process.cwd(), 'src/i18n/locales/zh.json'), 'utf-8')
)

// Define all content sections
const sections = [
  'hero',
  'values',
  'impact',
  'community',
  'cta',
  'footer',
  'navigation',
  'about',
  'contact',
  'mentorship',
  'donate',
  'donate-form',
  'not-found',
]

async function migrateContent() {
  console.log('Starting content migration...\n')

  for (const sectionKey of sections) {
    try {
      // Check if section exists in English (required)
      if (!enContent[sectionKey]) {
        console.log(`⚠️  Skipping ${sectionKey} - not found in en.json`)
        continue
      }

      console.log(`Migrating ${sectionKey}...`)

      // Get or create section
      let { data: section, error: sectionError } = await supabase
        .from('content_sections')
        .select('id')
        .eq('section_key', sectionKey)
        .maybeSingle()

      if (sectionError && sectionError.code !== 'PGRST116') {
        console.error(`  ❌ Error fetching section: ${sectionError.message}`)
        continue
      }

      let sectionId: string

      if (!section) {
        // Create new section
        const { data: newSection, error: createError } = await supabase
          .from('content_sections')
          .insert({
            section_key: sectionKey,
            content_type: 'json',
          })
          .select('id')
          .single()

        if (createError) {
          console.error(`  ❌ Error creating section: ${createError.message}`)
          continue
        }

        sectionId = newSection.id
        console.log(`  ✓ Created section`)
      } else {
        sectionId = section.id
        console.log(`  ✓ Section exists`)
      }

      // Insert/update translations
      const translations = []

      if (enContent[sectionKey]) {
        translations.push({
          section_id: sectionId,
          language_code: 'en',
          content: enContent[sectionKey],
        })
      }

      if (frContent[sectionKey]) {
        translations.push({
          section_id: sectionId,
          language_code: 'fr',
          content: frContent[sectionKey],
        })
      }

      if (zhContent[sectionKey]) {
        translations.push({
          section_id: sectionId,
          language_code: 'zh',
          content: zhContent[sectionKey],
        })
      }

      if (translations.length > 0) {
        const { error: transError } = await supabase
          .from('content_translations')
          .upsert(translations, {
            onConflict: 'section_id,language_code',
          })

        if (transError) {
          console.error(`  ❌ Error inserting translations: ${transError.message}`)
        } else {
          console.log(`  ✓ Migrated ${translations.length} translation(s)`)
        }
      }
    } catch (error: any) {
      console.error(`  ❌ Error migrating ${sectionKey}:`, error.message)
    }

    console.log('')
  }

  console.log('✅ Content migration completed!')
}

// Run migration
migrateContent()
  .then(() => {
    console.log('\nMigration script finished.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  })
