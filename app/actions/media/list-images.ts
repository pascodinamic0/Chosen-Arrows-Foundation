'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'

export type MediaFile = {
  name: string
  path: string
  url: string
  size: number
  updated_at: string
}

/**
 * Lists all images in a storage folder.
 */
export async function listImages(
  folder: string = ''
): Promise<MediaFile[]> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return []
  }

  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from('images')
    .list(folder, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'updated_at', order: 'desc' },
    })

  if (error) {
    console.error('Error listing images:', error)
    return []
  }

  return (data || []).map(file => ({
    name: file.name,
    path: folder ? `${folder}/${file.name}` : file.name,
    url: supabase.storage.from('images').getPublicUrl(folder ? `${folder}/${file.name}` : file.name).data.publicUrl,
    size: file.metadata?.size || 0,
    updated_at: file.updated_at || file.created_at,
  }))
}
