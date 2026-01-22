import { getAllPageMetadata } from '@/app/actions/metadata/get-page-metadata'
import PageMetadataEditor from '@/components/admin/PageMetadataEditor'

const pagePaths = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/campaigns', name: 'Campaigns' },
  { path: '/contact', name: 'Contact' },
  { path: '/mentorship', name: 'Mentorship' },
  { path: '/donate', name: 'Donate' },
]

export default async function PageMetadataPage() {
  const allMetadata = await getAllPageMetadata()

  // Organize by page path
  const metadataByPage: Record<string, Record<string, any>> = {}
  allMetadata.forEach(meta => {
    if (!metadataByPage[meta.page_path]) {
      metadataByPage[meta.page_path] = {}
    }
    metadataByPage[meta.page_path][meta.language_code] = meta
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Page Metadata</h1>
        <p className="text-muted-foreground">
          Manage SEO metadata for each page
        </p>
      </div>

      <div className="space-y-6">
        {pagePaths.map(({ path, name }) => (
          <PageMetadataEditor
            key={path}
            pagePath={path}
            pageName={name}
            metadataByLanguage={metadataByPage[path] || {}}
          />
        ))}
      </div>
    </div>
  )
}
