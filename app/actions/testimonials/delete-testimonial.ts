'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'
import { revalidatePath } from 'next/cache'

export type DeleteTestimonialResult = 
  | { success: true }
  | { success: false; error: string }

/**
 * Deletes a testimonial.
 */
export async function deleteTestimonial(
  testimonialId: string
): Promise<DeleteTestimonialResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = createClient()

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', testimonialId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')

  return { success: true }
}
