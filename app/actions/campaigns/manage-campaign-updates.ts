'use server'

import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'
import { revalidatePath } from 'next/cache'

export type CampaignUpdate = {
  id: string
  campaign_id: string
  update_date: string
  content: string
  created_at: string
  created_by: string | null
}

export type ManageCampaignUpdateResult = 
  | { success: true; updateId?: string }
  | { success: false; error: string }

/**
 * Gets all updates for a campaign.
 */
export async function getCampaignUpdates(
  campaignId: string
): Promise<CampaignUpdate[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('campaign_updates')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('update_date', { ascending: false })

  if (error) {
    console.error('Error fetching campaign updates:', error)
    return []
  }

  return (data || []).map(update => ({
    id: update.id,
    campaign_id: update.campaign_id,
    update_date: update.update_date,
    content: update.content,
    created_at: update.created_at,
    created_by: update.created_by,
  }))
}

/**
 * Creates a new campaign update.
 */
export async function createCampaignUpdate(
  campaignId: string,
  updateDate: string,
  content: string
): Promise<ManageCampaignUpdateResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('campaign_updates')
    .insert({
      campaign_id: campaignId,
      update_date: updateDate,
      content,
      created_by: user.id,
    })
    .select('id')
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/admin/campaigns/${campaignId}`)
  revalidatePath(`/campaigns/${campaignId}`)

  return { success: true, updateId: data.id }
}

/**
 * Updates an existing campaign update.
 */
export async function updateCampaignUpdate(
  updateId: string,
  campaignId: string,
  updateDate: string,
  content: string
): Promise<ManageCampaignUpdateResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('campaign_updates')
    .update({
      update_date: updateDate,
      content,
    })
    .eq('id', updateId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/admin/campaigns/${campaignId}`)
  revalidatePath(`/campaigns/${campaignId}`)

  return { success: true }
}

/**
 * Deletes a campaign update.
 */
export async function deleteCampaignUpdate(
  updateId: string,
  campaignId: string
): Promise<ManageCampaignUpdateResult> {
  const { user, error: authError } = await checkAdminAuth()
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('campaign_updates')
    .delete()
    .eq('id', updateId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/admin/campaigns/${campaignId}`)
  revalidatePath(`/campaigns/${campaignId}`)

  return { success: true }
}
