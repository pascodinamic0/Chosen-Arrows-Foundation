'use server'

import { createClient, createServiceRoleClient } from '@/lib/supabase/server'

export type AdminAuthResult = 
  | { user: { id: string; role: string; full_name: string | null }; error: null }
  | { user: null; error: string }

/**
 * Checks if the current user is an authenticated admin.
 * Returns user info if authenticated, error otherwise.
 */
export async function checkAdminAuth(): Promise<AdminAuthResult> {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { user: null, error: 'Not authenticated' }
  }

  const serviceClient = createServiceRoleClient()
  const { data: adminUser, error: adminError } = await serviceClient
    .from('admin_users')
    .select('role, full_name')
    .eq('id', user.id)
    .maybeSingle()
  
  if (adminError || !adminUser) {
    return { user: null, error: 'Not an admin user' }
  }
  
  return {
    user: {
      id: user.id,
      role: adminUser.role,
      full_name: adminUser.full_name,
    },
    error: null,
  }
}
