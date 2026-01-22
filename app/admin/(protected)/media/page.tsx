import { listImages } from '@/app/actions/media/list-images'
import MediaLibrary from '@/components/admin/MediaLibrary'

export default async function MediaPage() {
  // Get images from all folders
  const [campaignImages, contentImages] = await Promise.all([
    listImages('campaigns'),
    listImages('content'),
  ])

  // Flatten and combine
  const allImages = [
    ...campaignImages.map(img => ({ ...img, folder: 'campaigns' })),
    ...contentImages.map(img => ({ ...img, folder: 'content' })),
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <p className="text-muted-foreground">
          Manage all uploaded images and media files
        </p>
      </div>

      <MediaLibrary initialImages={allImages} />
    </div>
  )
}
