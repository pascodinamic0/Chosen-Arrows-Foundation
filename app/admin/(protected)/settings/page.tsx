import { getAllSettings } from '@/app/actions/settings/get-settings'
import SiteSettingsEditor from '@/components/admin/SiteSettingsEditor'

export default async function SettingsPage() {
  const settings = await getAllSettings()

  // Convert to map for easier access
  const settingsMap: Record<string, any> = {}
  settings.forEach(setting => {
    settingsMap[setting.setting_key] = setting.setting_value
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground">
          Manage global site settings and configuration
        </p>
      </div>

      <SiteSettingsEditor initialSettings={settingsMap} />
    </div>
  )
}
