import { createClient } from '@/lib/supabase/server'
import TestimonialEditor from '@/components/admin/TestimonialEditor'
import { notFound } from 'next/navigation'

export default async function EditTestimonialPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()

  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !testimonial) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
        <p className="text-muted-foreground">
          {testimonial.name} - {testimonial.role}
        </p>
      </div>

      <TestimonialEditor testimonial={testimonial} />
    </div>
  )
}
