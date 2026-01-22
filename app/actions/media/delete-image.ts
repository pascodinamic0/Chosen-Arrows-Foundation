'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'

export type DeleteImageResult = 
  | { success: true }
  | { success: false; error: string }

/**
 * Deletes an image from Supabase Storage.
 */
export async function deleteImage(
  filePath: string
): Promise<DeleteImageResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()

  const { error } = await supabase.storage
    .from('images')
    .remove([filePath])

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
