'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'
import { revalidatePath } from 'next/cache'

export type CreateTestimonialResult = 
  | { success: true; testimonialId: string }
  | { success: false; error: string }

export type TestimonialInput = {
  name: string
  role: string
  content: string
  avatar_initials?: string | null
  display_order?: number
  is_active?: boolean
}

/**
 * Creates a new testimonial.
 */
export async function createTestimonial(
  data: TestimonialInput
): Promise<CreateTestimonialResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = createClient()

  // Generate avatar initials if not provided
  const avatarInitials = data.avatar_initials || 
    data.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

  // Get max display_order
  const { data: existingTestimonials } = await supabase
    .from('testimonials')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)

  const displayOrder = existingTestimonials && existingTestimonials.length > 0
    ? existingTestimonials[0].display_order + 1
    : 0

  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .insert({
      name: data.name,
      role: data.role,
      content: data.content,
      avatar_initials: avatarInitials,
      display_order: data.display_order ?? displayOrder,
      is_active: data.is_active ?? true,
      created_by: user.id,
    })
    .select('id')
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')

  return { success: true, testimonialId: testimonial.id }
}
