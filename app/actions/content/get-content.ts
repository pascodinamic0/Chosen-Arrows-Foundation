'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * Gets content for a specific section and language.
 * Falls back to English if translation not found.
 */
export async function getContent(
  sectionKey: string,
  language: string = 'en'
): Promise<Record<string, any> | null> {
  const supabase = await createClient()
  
  // First get the section
  const { data: section, error: sectionError } = await supabase
    .from('content_sections')
    .select('id')
    .eq('section_key', sectionKey)
    .single()
  
  if (sectionError || !section) {
    return null
  }
  
  // Then get the translation for requested language
  const { data: translation, error: translationError } = await supabase
    .from('content_translations')
    .select('content')
    .eq('section_id', section.id)
    .eq('language_code', language)
    .single()
  
  if (translationError || !translation) {
    // Fallback to default language (en) if translation not found
    if (language !== 'en') {
      const { data: defaultTranslation } = await supabase
        .from('content_translations')
        .select('content')
        .eq('section_id', section.id)
        .eq('language_code', 'en')
        .single()
      
      return defaultTranslation?.content || null
    }
    return null
  }
  
  return translation.content
}
