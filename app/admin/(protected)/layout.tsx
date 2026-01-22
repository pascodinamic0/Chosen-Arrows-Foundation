import { redirect } from 'next/navigation'
import { checkAdminAuth } from '@/app/actions/auth/check-admin-auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user: adminUser, error } = await checkAdminAuth()

  if (error || !adminUser) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <AdminHeader user={adminUser} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
