'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'
import { revalidatePath } from 'next/cache'

export type ReorderTestimonialsResult = 
  | { success: true }
  | { success: false; error: string }

/**
 * Reorders testimonials by updating their display_order.
 */
export async function reorderTestimonials(
  testimonialIds: string[] // Array of IDs in desired order
): Promise<ReorderTestimonialsResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()

  // Update display_order for each testimonial
  const updates = testimonialIds.map((id, index) => ({
    id,
    display_order: index,
  }))

  for (const update of updates) {
    const { error } = await supabase
      .from('testimonials')
      .update({ display_order: update.display_order })
      .eq('id', update.id)

    if (error) {
      return { success: false, error: error.message }
    }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')

  return { success: true }
}
