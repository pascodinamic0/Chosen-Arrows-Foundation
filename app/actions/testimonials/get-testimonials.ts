'use server'

import { createClient } from '@/lib/supabase/server'

export type Testimonial = {
  id: string
  name: string
  role: string
  content: string
  avatar_initials: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

/**
 * Gets testimonials for public display or admin management.
 */
export async function getTestimonials(
  options?: {
    activeOnly?: boolean
    admin?: boolean
  }
): Promise<Testimonial[]> {
  const supabase = await createClient()

  let query = supabase
    .from('testimonials')
    .select('*')

  if (options?.activeOnly && !options.admin) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }

  return (data || []).map(testimonial => ({
    id: testimonial.id,
    name: testimonial.name,
    role: testimonial.role,
    content: testimonial.content,
    avatar_initials: testimonial.avatar_initials,
    display_order: testimonial.display_order,
    is_active: testimonial.is_active,
    created_at: testimonial.created_at,
    updated_at: testimonial.updated_at,
  }))
}
