import { getAllSections } from '@/app/actions/content/get-all-sections'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FileText, Edit, Plus, CheckCircle2, XCircle } from 'lucide-react'
import { languages } from '@/lib/constants'

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

export default async function ContentSectionsPage() {
  const sections = await getAllSections()

  const getTranslationStatus = (section: typeof sections[0]) => {
    const status: Record<string, boolean> = {}
    languages.forEach(lang => {
      status[lang] = section.translations?.some(t => t.language_code === lang) || false
    })
    return status
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Sections</h1>
          <p className="text-muted-foreground">
            Manage all content sections across your website
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const translationStatus = getTranslationStatus(section)
          const allTranslated = languages.every(lang => translationStatus[lang])

          return (
            <Card key={section.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">
                      {sectionNames[section.section_key] || section.section_key}
                    </CardTitle>
                  </div>
                  <Badge variant={allTranslated ? 'default' : 'secondary'}>
                    {allTranslated ? 'Complete' : 'Incomplete'}
                  </Badge>
                </div>
                <CardDescription className="font-mono text-xs">
                  {section.section_key}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Translations:</p>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <div
                        key={lang}
                        className="flex items-center gap-1 text-xs"
                        title={lang.toUpperCase()}
                      >
                        {translationStatus[lang] ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="uppercase font-medium">{lang}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date(section.updated_at).toLocaleDateString()}
                </div>

                <Link href={`/admin/content/sections/${section.section_key}`}>
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Section
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {sections.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No content sections</h3>
            <p className="text-muted-foreground text-center mb-4">
              Content sections will appear here after you create them or run the migration.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
