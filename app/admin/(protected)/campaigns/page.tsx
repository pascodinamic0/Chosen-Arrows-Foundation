import { getCampaigns } from '@/app/actions/campaigns/get-campaigns'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteCampaign } from '@/app/actions/campaigns/delete-campaign'
import CampaignActions from '@/components/admin/CampaignActions'
import Image from 'next/image'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-500',
  active: 'bg-green-500',
  completed: 'bg-blue-500',
  archived: 'bg-gray-400',
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns('en', { admin: true, status: 'all' })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage all fundraising campaigns
          </p>
        </div>
        <Link href="/admin/campaigns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Donors</TableHead>
              <TableHead>Days Left</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No campaigns found. Create your first campaign to get started.
                </TableCell>
              </TableRow>
            ) : (
              campaigns.map((campaign) => {
                const progress = campaign.goal_amount > 0
                  ? Math.min((campaign.raised_amount / campaign.goal_amount) * 100, 100)
                  : 0

                return (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      {campaign.primaryImage ? (
                        <div className="relative w-12 h-12 rounded-md overflow-hidden">
                          <Image
                            src={campaign.primaryImage}
                            alt={campaign.translation?.title || 'Campaign'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-muted" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {campaign.translation?.title || 'Untitled Campaign'}
                        </div>
                        {campaign.featured && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={statusColors[campaign.status] || 'bg-gray-500'}
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>${campaign.raised_amount.toLocaleString()}</span>
                          <span className="text-muted-foreground">
                            of ${campaign.goal_amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{campaign.category || '-'}</TableCell>
                    <TableCell>{campaign.donor_count}</TableCell>
                    <TableCell>
                      {campaign.days_left !== null ? `${campaign.days_left} days` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <CampaignActions campaignId={campaign.id} slug={campaign.slug} />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
