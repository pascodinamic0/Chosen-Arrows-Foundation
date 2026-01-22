'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Edit, Trash2, MessageSquare, Plus } from 'lucide-react'
import { updateTestimonial, deleteTestimonial } from '@/app/actions/testimonials/update-testimonial'
import { deleteTestimonial as deleteTestimonialAction } from '@/app/actions/testimonials/delete-testimonial'
import { toast } from 'sonner'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Testimonial } from '@/app/actions/testimonials/get-testimonials'

interface TestimonialsListProps {
  initialTestimonials: Testimonial[]
}

export default function TestimonialsList({ initialTestimonials }: TestimonialsListProps) {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleToggleActive = async (testimonialId: string, currentStatus: boolean) => {
    const result = await updateTestimonial(testimonialId, {
      is_active: !currentStatus,
    })

    if (result.success) {
      setTestimonials(prev =>
        prev.map(t => t.id === testimonialId ? { ...t, is_active: !currentStatus } : t)
      )
      toast.success(`Testimonial ${!currentStatus ? 'activated' : 'deactivated'}`)
    } else {
      toast.error('Failed to update', {
        description: result.error,
      })
    }
  }

  const handleDelete = async (testimonialId: string) => {
    setIsDeleting(true)
    const result = await deleteTestimonialAction(testimonialId)

    if (result.success) {
      setTestimonials(prev => prev.filter(t => t.id !== testimonialId))
      toast.success('Testimonial deleted')
      setShowDeleteDialog(null)
    } else {
      toast.error('Failed to delete', {
        description: result.error,
      })
    }

    setIsDeleting(false)
  }

  if (testimonials.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No testimonials</h3>
          <p className="text-muted-foreground text-center mb-4">
            Get started by adding your first testimonial.
          </p>
          <Link href="/admin/testimonials/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {testimonial.avatar_initials || '??'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <Badge variant={testimonial.is_active ? 'default' : 'secondary'}>
                  {testimonial.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground italic line-clamp-3">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={testimonial.is_active}
                    onCheckedChange={() => handleToggleActive(testimonial.id, testimonial.is_active)}
                  />
                  <span className="text-xs text-muted-foreground">
                    {testimonial.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/testimonials/${testimonial.id}`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteDialog(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={showDeleteDialog !== null} onOpenChange={() => setShowDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the testimonial. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (showDeleteDialog) {
                  handleDelete(showDeleteDialog)
                }
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
