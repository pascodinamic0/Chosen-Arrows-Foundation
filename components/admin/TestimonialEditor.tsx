'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import { createTestimonial } from '@/app/actions/testimonials/create-testimonial'
import { updateTestimonial } from '@/app/actions/testimonials/update-testimonial'
import type { Testimonial } from '@/app/actions/testimonials/get-testimonials'

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
  role: z.string().min(1, 'Role is required').max(100, 'Role is too long'),
  content: z.string().min(1, 'Content is required'),
  avatar_initials: z.string().max(10).nullable().optional(),
  is_active: z.boolean().default(true),
})

type TestimonialFormValues = z.infer<typeof testimonialSchema>

interface TestimonialEditorProps {
  testimonial?: Testimonial
}

export default function TestimonialEditor({ testimonial }: TestimonialEditorProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const isEditing = !!testimonial

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: testimonial?.name || '',
      role: testimonial?.role || '',
      content: testimonial?.content || '',
      avatar_initials: testimonial?.avatar_initials || null,
      is_active: testimonial?.is_active ?? true,
    },
  })

  // Auto-generate avatar initials from name
  const name = form.watch('name')
  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Update initials when name changes
  const handleNameChange = (value: string) => {
    form.setValue('name', value)
    if (!form.getValues('avatar_initials')) {
      form.setValue('avatar_initials', generateInitials(value))
    }
  }

  const onSubmit = async (data: TestimonialFormValues) => {
    setIsSaving(true)

    try {
      if (isEditing && testimonial) {
        const result = await updateTestimonial(testimonial.id, data)
        if (result.success) {
          toast.success('Testimonial updated', {
            description: 'Your changes have been saved.',
          })
          router.push('/admin/testimonials')
          router.refresh()
        } else {
          toast.error('Failed to update', {
            description: result.error,
          })
        }
      } else {
        const result = await createTestimonial(data)
        if (result.success) {
          toast.success('Testimonial created', {
            description: 'Redirecting to testimonials list...',
          })
          router.push('/admin/testimonials')
          router.refresh()
        } else {
          toast.error('Failed to create', {
            description: result.error,
          })
        }
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
        <CardTitle>{isEditing ? 'Edit Testimonial' : 'Create Testimonial'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleNameChange(e.target.value)
                        }}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Monthly Donor"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-32"
                      placeholder="Enter the testimonial content..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="avatar_initials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar Initials</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        placeholder="Auto-generated from name"
                        maxLength={10}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Leave empty to auto-generate from name
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Active</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Show on website
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? 'Update Testimonial' : 'Create Testimonial'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
