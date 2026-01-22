'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'

export type ContentSection = {
  id: string
  section_key: string
  content_type: string
  created_at: string
  updated_at: string
  translations: {
    language_code: string
    updated_at: string
  }[]
}

/**
 * Gets all content sections with their translation status.
 * Admin only.
 */
export async function getAllSections(): Promise<ContentSection[]> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return []
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('content_sections')
    .select(`
      id,
      section_key,
      content_type,
      created_at,
      updated_at,
      translations:content_translations(
        language_code,
        updated_at
      )
    `)
    .order('section_key')

  if (error) {
    console.error('Error fetching sections:', error)
    return []
  }

  return data || []
}
