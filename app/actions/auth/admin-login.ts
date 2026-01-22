'use server'

import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type LoginResult =
  | { success: true; redirect: string }
  | { success: false; error: string }

/**
 * Authenticates an admin user and redirects to dashboard.
 */
export async function adminLogin(
  email: string,
  password: string
): Promise<LoginResult> {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !user) {
    return {
      success: false,
      error: authError?.message || 'Invalid email or password',
    }
  }

  // Check if user is an admin
  const serviceClient = createServiceRoleClient()
  const { data: adminUser, error: adminError } = await serviceClient
    .from('admin_users')
    .select('role, full_name')
    .eq('id', user.id)
    .maybeSingle()

  if (adminError || !adminUser) {
    // Sign out if not admin
    await supabase.auth.signOut()
    return {
      success: false,
      error: 'Access denied. You are not an admin user.',
    }
  }

  // Update last login
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', user.id)

  return {
    success: true,
    redirect: '/admin/dashboard',
  }
}

/**
 * Server action that handles login and redirect directly on the server.
 */
export async function adminLoginAndRedirect(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const result = await adminLogin(email, password)

  if (result.success) {
    redirect(result.redirect)
  } else {
    // Redirect back to login with error
    redirect(`/admin/login?error=${encodeURIComponent((result as { success: false; error: string }).error)}`)
  }
}

/**
 * Logs out the current admin user.
 */
export async function adminLogout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
