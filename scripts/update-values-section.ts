/**
 * Quick script to update the values section with the 6th value (Community).
 * 
 * Run with: tsx scripts/update-values-section.ts
 * 
 * Requires:
 * - SUPABASE_SERVICE_ROLE_KEY in environment
 * - NEXT_PUBLIC_SUPABASE_URL in environment
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updateValuesSection() {
  console.log('Updating values section with 6th value (Community)...\n')

  try {
    // Get the values section
    const { data: section, error: sectionError } = await supabase
      .from('content_sections')
      .select('id')
      .eq('section_key', 'values')
      .single()

    if (sectionError || !section) {
      console.error('❌ Values section not found. Please run the seed script first.')
      process.exit(1)
    }

    // Update English translation
    const updatedContent = {
      title: "Our Core Values",
      subtitle: "R.I.T.A.H + Community",
      description: "Guiding principles that shape everything we do and every life we touch",
      values: [
        { key: "responsibility", title: "Responsibility", description: "We care for every child entrusted to us with compassion and accountability." },
        { key: "integrity", title: "Integrity", description: "We uphold honesty and transparency in every action and partnership." },
        { key: "trust", title: "Trust", description: "We build dependable relationships rooted in love and consistency." },
        { key: "adeptness", title: "Adeptness", description: "We serve with excellence, always learning and growing in purpose." },
        { key: "honesty", title: "Honesty", description: "We speak truth in love — reflecting the nature and light of God." },
        { key: "community", title: "Community", description: "We nurture belonging and connection, building a family of support around every child." }
      ],
      vision: {
        title: "Our Vision",
        quote: "Just like arrows in the hands of a skilled archer, we aim to guide the children God entrusts to us toward the direction of their ordained destinies."
      }
    }

    const { error: updateError } = await supabase
      .from('content_translations')
      .upsert({
        section_id: section.id,
        language_code: 'en',
        content: updatedContent,
      }, {
        onConflict: 'section_id,language_code',
      })

    if (updateError) {
      console.error('❌ Error updating values section:', updateError.message)
      process.exit(1)
    }

    console.log('✅ Successfully updated values section with 6 values!')
    console.log('   - Added Community as the 6th value')
    console.log('   - Updated subtitle to "R.I.T.A.H + Community"')
    console.log('\n💡 Note: You may need to refresh your browser to see the changes.')
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

updateValuesSection()
