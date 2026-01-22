'use server'

import { createClient } from '@/lib/supabase/server'

export type SiteSetting = {
  id: string
  setting_key: string
  setting_value: Record<string, any>
  description: string | null
  updated_at: string
}

/**
 * Gets a site setting by key.
 */
export async function getSetting(
  settingKey: string
): Promise<Record<string, any> | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select('setting_value')
    .eq('setting_key', settingKey)
    .single()

  if (error || !data) {
    return null
  }

  return data.setting_value
}

/**
 * Gets all site settings.
 */
export async function getAllSettings(): Promise<SiteSetting[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('setting_key')

  if (error) {
    console.error('Error fetching settings:', error)
    return []
  }

  return data || []
}
