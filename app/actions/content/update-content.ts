'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'
import { revalidatePath } from 'next/cache'

export type UpdateContentResult = 
  | { success: true }
  | { success: false; error: string }

/**
 * Updates content for a specific section and language.
 */
export async function updateContent(
  sectionKey: string,
  language: string,
  content: Record<string, any>
): Promise<UpdateContentResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()

  // Get or create section
  let { data: section, error: sectionError } = await supabase
    .from('content_sections')
    .select('id')
    .eq('section_key', sectionKey)
    .single()

  if (sectionError && sectionError.code !== 'PGRST116') {
    return { success: false, error: sectionError.message }
  }

  if (!section) {
    // Create new section
    const { data: newSection, error: createError } = await supabase
      .from('content_sections')
      .insert({
        section_key: sectionKey,
        content_type: 'json',
        created_by: user.id,
      })
      .select('id')
      .single()

    if (createError) {
      return { success: false, error: createError.message }
    }
    section = newSection
  }

  // Upsert translation
  const { error: translationError } = await supabase
    .from('content_translations')
    .upsert({
      section_id: section.id,
      language_code: language,
      content,
      updated_by: user.id,
    }, {
      onConflict: 'section_id,language_code',
    })

  if (translationError) {
    return { success: false, error: translationError.message }
  }

  // Update section's updated_by
  await supabase
    .from('content_sections')
    .update({ updated_by: user.id })
    .eq('id', section.id)

  // Revalidate relevant paths
  revalidatePath('/')
  revalidatePath('/admin/content/sections')

  return { success: true }
}
