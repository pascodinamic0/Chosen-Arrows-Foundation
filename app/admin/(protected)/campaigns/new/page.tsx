import CampaignEditor from '@/components/admin/CampaignEditor'

export default function NewCampaignPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Campaign</h1>
        <p className="text-muted-foreground">
          Add a new fundraising campaign to your website
        </p>
      </div>

      <CampaignEditor />
    </div>
  )
}
