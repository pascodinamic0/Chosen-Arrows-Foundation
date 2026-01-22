'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'
import { revalidatePath } from 'next/cache'
import type { TestimonialInput } from './create-testimonial'

export type UpdateTestimonialResult = 
  | { success: true }
  | { success: false; error: string }

/**
 * Updates an existing testimonial.
 */
export async function updateTestimonial(
  testimonialId: string,
  data: Partial<TestimonialInput>
): Promise<UpdateTestimonialResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = createClient()

  const updateData: any = {}

  if (data.name !== undefined) updateData.name = data.name
  if (data.role !== undefined) updateData.role = data.role
  if (data.content !== undefined) updateData.content = data.content
  if (data.avatar_initials !== undefined) updateData.avatar_initials = data.avatar_initials
  if (data.display_order !== undefined) updateData.display_order = data.display_order
  if (data.is_active !== undefined) updateData.is_active = data.is_active

  // Auto-generate avatar initials if name changed
  if (data.name && !data.avatar_initials) {
    updateData.avatar_initials = data.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const { error } = await supabase
    .from('testimonials')
    .update(updateData)
    .eq('id', testimonialId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')

  return { success: true }
}
