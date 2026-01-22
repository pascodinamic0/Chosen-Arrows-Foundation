'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { languages, languageNames } from '@/lib/constants'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import { updatePageMetadata } from '@/app/actions/metadata/update-page-metadata'

const metadataSchema = z.object({
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  keywords: z.array(z.string()).nullable().optional(),
  og_title: z.string().nullable().optional(),
  og_description: z.string().nullable().optional(),
  og_image_url: z.string().url().nullable().optional(),
  og_type: z.string().nullable().optional(),
  twitter_card: z.string().nullable().optional(),
  twitter_title: z.string().nullable().optional(),
  twitter_description: z.string().nullable().optional(),
  twitter_image_url: z.string().url().nullable().optional(),
})

type MetadataFormValues = z.infer<typeof metadataSchema>

interface PageMetadataEditorProps {
  pagePath: string
  pageName: string
  metadataByLanguage: Record<string, any>
}

export default function PageMetadataEditor({
  pagePath,
  pageName,
  metadataByLanguage,
}: PageMetadataEditorProps) {
  const [activeLanguage, setActiveLanguage] = useState<string>(languages[0])
  const [isSaving, setIsSaving] = useState(false)

  const currentMetadata = metadataByLanguage[activeLanguage] || {}

  const form = useForm<MetadataFormValues>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      title: currentMetadata.title || null,
      description: currentMetadata.description || null,
      keywords: currentMetadata.keywords || [],
      og_title: currentMetadata.og_title || null,
      og_description: currentMetadata.og_description || null,
      og_image_url: currentMetadata.og_image_url || null,
      og_type: currentMetadata.og_type || 'website',
      twitter_card: currentMetadata.twitter_card || 'summary_large_image',
      twitter_title: currentMetadata.twitter_title || null,
      twitter_description: currentMetadata.twitter_description || null,
      twitter_image_url: currentMetadata.twitter_image_url || null,
    },
  })

  // Update form when language changes
  const handleLanguageChange = (lang: string) => {
    const metadata = metadataByLanguage[lang] || {}
    form.reset({
      title: metadata.title || null,
      description: metadata.description || null,
      keywords: metadata.keywords || [],
      og_title: metadata.og_title || null,
      og_description: metadata.og_description || null,
      og_image_url: metadata.og_image_url || null,
      og_type: metadata.og_type || 'website',
      twitter_card: metadata.twitter_card || 'summary_large_image',
      twitter_title: metadata.twitter_title || null,
      twitter_description: metadata.twitter_description || null,
      twitter_image_url: metadata.twitter_image_url || null,
    })
    setActiveLanguage(lang)
  }

  const onSubmit = async (data: MetadataFormValues) => {
    setIsSaving(true)

    try {
      const result = await updatePageMetadata(pagePath, activeLanguage, data)

      if (result.success) {
        toast.success('Metadata saved', {
          description: `${pageName} (${languageNames[activeLanguage]}) metadata updated.`,
        })
      } else {
        toast.error('Failed to save', {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error('An error occurred', {
        description: 'Please try again later.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pageName} Page Metadata</CardTitle>
        <p className="text-sm text-muted-foreground font-mono">{pagePath}</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeLanguage} onValueChange={handleLanguageChange}>
              <TabsList className="grid w-full grid-cols-3">
                {languages.map((lang) => (
                  <TabsTrigger key={lang} value={lang}>
                    {languageNames[lang]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {languages.map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-4 mt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Page Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              placeholder="Page title for SEO"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="og_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Open Graph Type</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || 'website'}
                              placeholder="website"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value || null)}
                            className="min-h-20"
                            placeholder="Page description for SEO"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="og_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Open Graph Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              placeholder="OG title (defaults to page title)"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="og_image_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Open Graph Image URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              placeholder="https://..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="og_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Open Graph Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value || null)}
                            className="min-h-20"
                            placeholder="OG description (defaults to meta description)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="twitter_card"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Card Type</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || 'summary_large_image'}
                              placeholder="summary_large_image"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="twitter_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              placeholder="Twitter title (defaults to OG title)"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="twitter_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              className="min-h-20"
                              placeholder="Twitter description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="twitter_image_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Image URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              placeholder="https://..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end pt-4 border-t">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save {languageNames[lang]}
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
