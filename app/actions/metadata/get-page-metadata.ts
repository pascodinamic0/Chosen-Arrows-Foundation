'use server'

import { createClient } from '@/lib/supabase/server'

export type PageMetadata = {
  id: string
  page_path: string
  language_code: string
  title: string | null
  description: string | null
  keywords: string[] | null
  og_title: string | null
  og_description: string | null
  og_image_url: string | null
  og_type: string | null
  twitter_card: string | null
  twitter_title: string | null
  twitter_description: string | null
  twitter_image_url: string | null
  updated_at: string
}

/**
 * Gets page metadata for a specific page and language.
 */
export async function getPageMetadata(
  pagePath: string,
  language: string = 'en'
): Promise<PageMetadata | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('page_metadata')
    .select('*')
    .eq('page_path', pagePath)
    .eq('language_code', language)
    .single()

  if (error || !data) {
    // Fallback to English if translation not found
    if (language !== 'en') {
      const supabaseFallback = await createClient()
      const { data: defaultData } = await supabaseFallback
        .from('page_metadata')
        .select('*')
        .eq('page_path', pagePath)
        .eq('language_code', 'en')
        .single()

      return defaultData || null
    }
    return null
  }

  return {
    id: data.id,
    page_path: data.page_path,
    language_code: data.language_code,
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    og_title: data.og_title,
    og_description: data.og_description,
    og_image_url: data.og_image_url,
    og_type: data.og_type,
    twitter_card: data.twitter_card,
    twitter_title: data.twitter_title,
    twitter_description: data.twitter_description,
    twitter_image_url: data.twitter_image_url,
    updated_at: data.updated_at,
  }
}

/**
 * Gets all page metadata (admin only).
 */
export async function getAllPageMetadata(): Promise<PageMetadata[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('page_metadata')
    .select('*')
    .order('page_path')
    .order('language_code')

  if (error) {
    console.error('Error fetching page metadata:', error)
    return []
  }

  return (data || []).map(meta => ({
    id: meta.id,
    page_path: meta.page_path,
    language_code: meta.language_code,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    og_title: meta.og_title,
    og_description: meta.og_description,
    og_image_url: meta.og_image_url,
    og_type: meta.og_type,
    twitter_card: meta.twitter_card,
    twitter_title: meta.twitter_title,
    twitter_description: meta.twitter_description,
    twitter_image_url: meta.twitter_image_url,
    updated_at: meta.updated_at,
  }))
}
