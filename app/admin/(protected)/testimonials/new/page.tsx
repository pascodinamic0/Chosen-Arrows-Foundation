import TestimonialEditor from '@/components/admin/TestimonialEditor'

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Testimonial</h1>
        <p className="text-muted-foreground">
          Add a testimonial from your community
        </p>
      </div>

      <TestimonialEditor />
    </div>
  )
}
