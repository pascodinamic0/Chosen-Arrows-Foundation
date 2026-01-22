'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'
import { revalidatePath } from 'next/cache'

export type UpdatePageMetadataResult = 
  | { success: true }
  | { success: false; error: string }

export type PageMetadataInput = {
  title?: string | null
  description?: string | null
  keywords?: string[] | null
  og_title?: string | null
  og_description?: string | null
  og_image_url?: string | null
  og_type?: string | null
  twitter_card?: string | null
  twitter_title?: string | null
  twitter_description?: string | null
  twitter_image_url?: string | null
}

/**
 * Updates page metadata.
 */
export async function updatePageMetadata(
  pagePath: string,
  language: string,
  metadata: PageMetadataInput
): Promise<UpdatePageMetadataResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('page_metadata')
    .upsert({
      page_path: pagePath,
      language_code: language,
      ...metadata,
      updated_by: user.id,
    }, {
      onConflict: 'page_path,language_code',
    })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(pagePath)
  revalidatePath('/admin/settings/metadata')

  return { success: true }
}
