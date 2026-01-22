import { createClient } from '@/lib/supabase/server'

/**
 * Gets the Supabase Storage URL for a static image by its original path.
 * Falls back to the original path if mapping not found.
 * 
 * @param originalPath - The original import path (e.g., '@/assets/child-1.jpg')
 * @returns The public URL from Supabase Storage or the original path as fallback
 */
export async function getImageUrl(originalPath: string): Promise<string | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('static_image_mapping')
    .select('storage_url')
    .eq('original_path', originalPath)
    .single()
  
  if (error || !data) {
    // Return null if not found (components should have fallback)
    return null
  }
  
  return data.storage_url
}

/**
 * Gets multiple image URLs at once.
 * Useful for batch fetching.
 */
export async function getImageUrls(originalPaths: string[]): Promise<Record<string, string | null>> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('static_image_mapping')
    .select('original_path, storage_url')
    .in('original_path', originalPaths)
  
  if (error || !data) {
    return {}
  }
  
  const result: Record<string, string | null> = {}
  
  // Initialize all paths as null
  originalPaths.forEach(path => {
    result[path] = null
  })
  
  // Fill in found mappings
  data.forEach(mapping => {
    result[mapping.original_path] = mapping.storage_url
  })
  
  return result
}
