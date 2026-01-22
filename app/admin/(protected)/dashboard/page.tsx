import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Flag, 
  FileText, 
  Users, 
  Activity,
  ArrowRight 
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminDashboardPage() {
  const supabase = createClient()

  // Get stats
  const [campaignsResult, sectionsResult, testimonialsResult, recentActivityResult] = await Promise.all([
    supabase
      .from('campaigns')
      .select('id', { count: 'exact' })
      .eq('status', 'active'),
    supabase
      .from('content_sections')
      .select('id', { count: 'exact' }),
    supabase
      .from('testimonials')
      .select('id', { count: 'exact' })
      .eq('is_active', true),
    supabase
      .from('content_audit_log')
      .select('id, created_at, action, table_name')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const stats = {
    campaigns: campaignsResult.count || 0,
    contentSections: sectionsResult.count || 0,
    testimonials: testimonialsResult.count || 0,
    recentActivity: recentActivityResult.data?.length || 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Chosen Arrows Foundation CMS
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.campaigns}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Sections</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contentSections}</div>
            <p className="text-xs text-muted-foreground">
              Total sections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.testimonials}</div>
            <p className="text-xs text-muted-foreground">
              Active testimonials
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentActivity}</div>
            <p className="text-xs text-muted-foreground">
              Last 5 changes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/campaigns/new">
              <Button variant="outline" className="w-full justify-start">
                <Flag className="mr-2 h-4 w-4" />
                Create New Campaign
              </Button>
            </Link>
            <Link href="/admin/content/sections">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Edit Content Sections
              </Button>
            </Link>
            <Link href="/admin/testimonials">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Testimonials
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivityResult.data && recentActivityResult.data.length > 0 ? (
              <div className="space-y-3">
                {recentActivityResult.data.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium capitalize">{activity.action}</p>
                      <p className="text-muted-foreground text-xs">{activity.table_name}</p>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
            <Link href="/admin/audit" className="mt-4 block">
              <Button variant="ghost" size="sm" className="w-full">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Overview of your content sections and their translation status.
            </p>
            <Link href="/admin/content/sections">
              <Button variant="outline" className="w-full">
                View All Sections
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
