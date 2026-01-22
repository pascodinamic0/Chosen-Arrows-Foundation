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
  try {
    // Check if we have the required environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(`Cannot fetch setting "${settingKey}": Missing Supabase environment variables`)
      return null
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', settingKey)
      .limit(1)

    if (error) {
      console.warn(`Failed to fetch setting "${settingKey}":`, error.message)
      return null
    }

    if (!data || data.length === 0) {
      console.warn(`Setting "${settingKey}" not found`)
      return null
    }

    // If multiple settings exist (shouldn't happen due to unique constraint),
    // return the first one and log a warning
    if (data.length > 1) {
      console.warn(`Multiple settings found for "${settingKey}", using first one`)
    }

    return data[0].setting_value
  } catch (error) {
    console.error(`Error fetching setting "${settingKey}":`, error)
    return null
  }
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
