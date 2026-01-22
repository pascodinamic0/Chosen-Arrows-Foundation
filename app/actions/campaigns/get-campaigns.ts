'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export type Campaign = {
  id: string
  slug: string
  status: string
  goal_amount: number
  raised_amount: number
  donor_count: number
  days_left: number | null
  category: string | null
  featured: boolean
  created_at: string
  updated_at: string
  translation?: {
    title: string
    story: string
    full_story: string | null
    child_name: string | null
    child_age: number | null
    location: string | null
  }
  primaryImage?: string
  images?: Array<{
    image_url: string
    image_alt: string | null
    is_primary: boolean
    display_order: number
  }>
}

/**
 * Gets campaigns for public display or admin management.
 */
export async function getCampaigns(
  language: string = 'en',
  options?: {
    featured?: boolean
    limit?: number
    status?: 'active' | 'draft' | 'completed' | 'archived' | 'all'
    admin?: boolean // If true, returns all campaigns regardless of status
  }
): Promise<Campaign[]> {
  const supabase = await createClient()

  // Build base query
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

  // Filter by status (unless admin viewing all)
  if (!options?.admin) {
    if (options?.status && options.status !== 'all') {
      query = query.eq('status', options.status)
    } else {
      // Default: only active for public
      query = query.eq('status', 'active')
    }
  } else if (options?.status && options.status !== 'all') {
    query = query.eq('status', options.status)
  }

  if (options?.featured) {
    query = query.eq('featured', true)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching campaigns:', error)
    return []
  }

  // Transform data to match component expectations
  return (data || []).map((campaign) => {
    const translation = campaign.translations?.[0]
    const primaryImage = campaign.images?.find(img => img.is_primary)?.image_url

    return {
      id: campaign.id,
      slug: campaign.slug,
      status: campaign.status,
      goal_amount: Number(campaign.goal_amount) || 0,
      raised_amount: Number(campaign.raised_amount) || 0,
      donor_count: campaign.donor_count || 0,
      days_left: campaign.days_left,
      category: campaign.category || '',
      featured: campaign.featured || false,
      created_at: campaign.created_at,
      updated_at: campaign.updated_at,
      translation: translation ? {
        title: translation.title,
        story: translation.story,
        full_story: translation.full_story || null,
        child_name: translation.child_name || null,
        child_age: translation.child_age || null,
        location: translation.location || null,
      } : undefined,
      primaryImage: primaryImage || campaign.images?.[0]?.image_url || undefined,
      images: campaign.images?.sort((a, b) => a.display_order - b.display_order) || [],
    }
  })
}
