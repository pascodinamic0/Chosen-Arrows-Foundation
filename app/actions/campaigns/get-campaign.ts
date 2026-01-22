'use server'

import { createClient } from '@/lib/supabase/server'
import type { Campaign } from './get-campaigns'

/**
 * Gets a single campaign by ID or slug.
 */
export async function getCampaign(
  identifier: string, // Can be ID (UUID) or slug
  language: string = 'en'
): Promise<Campaign | null> {
  const supabase = await createClient()

  // Try to determine if it's a UUID or slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier)

  let query = supabase
    .from('campaigns')
    .select(`
      *,
      translations:campaign_translations!inner(
        title,
        story,
        full_story,
        child_name,
        child_age,
        location
      ),
      images:campaign_images(
        image_url,
        image_alt,
        is_primary,
        display_order
      )
    `)
    .eq('campaign_translations.language_code', language)

  if (isUUID) {
    query = query.eq('id', identifier)
  } else {
    query = query.eq('slug', identifier)
  }

  const { data, error } = await query.single()

  if (error || !data) {
    return null
  }

  const translation = data.translations?.[0]
  const primaryImage = data.images?.find(img => img.is_primary)?.image_url

  return {
    id: data.id,
    slug: data.slug,
    status: data.status,
    goal_amount: Number(data.goal_amount) || 0,
    raised_amount: Number(data.raised_amount) || 0,
    donor_count: data.donor_count || 0,
    days_left: data.days_left,
    category: data.category || '',
    featured: data.featured || false,
    created_at: data.created_at,
    updated_at: data.updated_at,
    translation: translation ? {
      title: translation.title,
      story: translation.story,
      full_story: translation.full_story || null,
      child_name: translation.child_name || null,
      child_age: translation.child_age || null,
      location: translation.location || null,
    } : undefined,
    primaryImage: primaryImage || data.images?.[0]?.image_url || undefined,
    images: data.images?.sort((a, b) => a.display_order - b.display_order) || [],
  }
}
