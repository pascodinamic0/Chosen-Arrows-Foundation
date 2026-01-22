import { getContent } from '@/app/actions/content/get-content'
import { updateContent } from '@/app/actions/content/update-content'
import ContentSectionEditor from '@/components/admin/ContentSectionEditor'
import { languages, languageNames } from '@/lib/constants'
import { notFound } from 'next/navigation'
import { contentSectionKeys } from '@/lib/constants'

const sectionNames: Record<string, string> = {
  hero: 'Hero Section',
  values: 'Values Section',
  impact: 'Impact Section',
  community: 'Community Section',
  cta: 'Call to Action',
  footer: 'Footer',
  navigation: 'Navigation',
  about: 'About Page',
  contact: 'Contact Page',
  mentorship: 'Mentorship Page',
  donate: 'Donate Page',
  'donate-form': 'Donate Form',
  'not-found': '404 Page',
}

export default async function ContentSectionEditPage({
  params,
}: {
  params: { key: string }
}) {
  const sectionKey = decodeURIComponent(params.key)

  // Validate section key
  if (!contentSectionKeys.includes(sectionKey as any)) {
    notFound()
  }

  // Load content for all languages
  const contentByLanguage: Record<string, Record<string, any> | null> = {}
  
  for (const lang of languages) {
    contentByLanguage[lang] = await getContent(sectionKey, lang)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Edit {sectionNames[sectionKey] || sectionKey}
        </h1>
        <p className="text-muted-foreground">
          Manage content for this section across all languages
        </p>
      </div>

      <ContentSectionEditor
        sectionKey={sectionKey}
        sectionName={sectionNames[sectionKey] || sectionKey}
        contentByLanguage={contentByLanguage}
        updateAction={updateContent}
      />
    </div>
  )
}
