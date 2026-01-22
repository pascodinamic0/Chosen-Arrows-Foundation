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
import { Loader2, Save, Copy, CheckCircle2 } from 'lucide-react'
import { updateContent } from '@/app/actions/content/update-content'
import type { UpdateContentResult } from '@/app/actions/content/update-content'

// Flexible schema that accepts any JSON structure
const contentSchema = z.record(z.any())

type ContentFormValues = Record<string, any>

interface ContentSectionEditorProps {
  sectionKey: string
  sectionName: string
  contentByLanguage: Record<string, Record<string, any> | null>
  updateAction: typeof updateContent
}

export default function ContentSectionEditor({
  sectionKey,
  sectionName,
  contentByLanguage,
  updateAction,
}: ContentSectionEditorProps) {
  const [activeLanguage, setActiveLanguage] = useState<string>(languages[0])
  const [isSaving, setIsSaving] = useState(false)
  const [copiedLanguage, setCopiedLanguage] = useState<string | null>(null)

  // Get content for active language, or use English as fallback
  const currentContent = contentByLanguage[activeLanguage] || contentByLanguage['en'] || {}

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: currentContent,
  })

  // Update form when language changes
  const handleLanguageChange = (lang: string) => {
    const content = contentByLanguage[lang] || contentByLanguage['en'] || {}
    form.reset(content)
    setActiveLanguage(lang)
  }

  // Copy content from English to current language
  const handleCopyFromEnglish = () => {
    const englishContent = contentByLanguage['en'] || {}
    form.reset(englishContent)
    setCopiedLanguage(activeLanguage)
    setTimeout(() => setCopiedLanguage(null), 2000)
    toast.success('Copied from English', {
      description: 'Content copied. Remember to translate it!',
    })
  }

  const onSubmit = async (data: ContentFormValues) => {
    setIsSaving(true)
    
    try {
      const result: UpdateContentResult = await updateAction(
        sectionKey,
        activeLanguage,
        data
      )

      if (result.success) {
        toast.success('Content saved', {
          description: `${sectionName} (${languageNames[activeLanguage]}) has been updated.`,
        })
      } else {
        toast.error('Failed to save', {
          description: (result as { success: false; error: string }).error,
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

  // Render form fields based on content structure
  const renderFields = (obj: Record<string, any>, prefix = ''): React.ReactNode => {
    return Object.entries(obj).map(([key, value]) => {
      const fieldName = prefix ? `${prefix}.${key}` : key
      const fieldId = `field-${fieldName}`

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Nested object - render as a group
        return (
          <div key={key} className="space-y-4 border-l-2 border-muted pl-4">
            <Label className="text-base font-semibold capitalize">{key}</Label>
            {renderFields(value, fieldName)}
          </div>
        )
      }

      if (Array.isArray(value)) {
        // Array - render as list of items
        return (
          <FormField
            key={key}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{key}</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {field.value?.map((item: any, index: number) => (
                      <Card key={index} className="p-4">
                        {typeof item === 'object' && item !== null
                          ? renderFields(item, `${fieldName}.${index}`)
                          : (
                            <Input
                              value={item || ''}
                              onChange={(e) => {
                                const newValue = [...field.value]
                                newValue[index] = e.target.value
                                field.onChange(newValue)
                              }}
                            />
                          )}
                      </Card>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newValue = [...(field.value || [])]
                        newValue.push(typeof value[0] === 'object' ? {} : '')
                        field.onChange(newValue)
                      }}
                    >
                      Add Item
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      }

      // Simple field
      const isLongText = typeof value === 'string' && value.length > 100

      return (
        <FormField
          key={key}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{key}</FormLabel>
              <FormControl>
                {isLongText ? (
                  <Textarea
                    {...field}
                    value={field.value || ''}
                    className="min-h-24"
                    placeholder={`Enter ${key}...`}
                  />
                ) : (
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder={`Enter ${key}...`}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Edit Content</CardTitle>
          <div className="flex items-center gap-2">
            {activeLanguage !== 'en' && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyFromEnglish}
                disabled={!contentByLanguage['en']}
              >
                {copiedLanguage === activeLanguage ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy from English
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeLanguage} onValueChange={handleLanguageChange}>
              <TabsList className="grid w-full grid-cols-3">
                {languages.map((lang) => {
                  const hasContent = !!contentByLanguage[lang]
                  return (
                    <TabsTrigger key={lang} value={lang} className="relative">
                      {languageNames[lang]}
                      {hasContent && (
                        <CheckCircle2 className="ml-2 h-3 w-3 text-green-600" />
                      )}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {languages.map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-4 mt-6">
                  {Object.keys(currentContent).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No content found for this section.</p>
                      <p className="text-sm mt-2">
                        Start by adding content fields below.
                      </p>
                    </div>
                  ) : (
                    renderFields(currentContent)
                  )}

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      type="submit"
                      disabled={isSaving}
                    >
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
