import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users, Clock, CheckCircle, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Become a Mentor | Chosen Arrows Foundation",
  description: "Shape a child's destiny through guidance, wisdom, and unconditional support. Join our mentor program and make a lasting impact on a child's life.",
  keywords: ["mentor", "mentorship", "volunteer", "guide", "support children", "mentor program"],
  openGraph: {
    title: "Become a Mentor | Chosen Arrows Foundation",
    description: "Shape a child's destiny through guidance, wisdom, and unconditional support",
    type: "website",
  },
};

const benefits = [
  {
    icon: Heart,
    title: "Make a Lasting Impact",
    description: "Guide a child toward their divine purpose through consistent, caring mentorship"
  },
  {
    icon: Users,
    title: "Build Meaningful Relationships",
    description: "Develop deep connections that transform both mentor and mentee"
  },
  {
    icon: Target,
    title: "Share Your Skills",
    description: "Use your unique experiences and talents to inspire the next generation"
  },
  {
    icon: Clock,
    title: "Flexible Commitment",
    description: "Choose a mentorship schedule that works with your lifestyle"
  }
];

export default function MentorshipPage() {
  return (
    <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Become a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mentor</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Shape a child&apos;s destiny through guidance, wisdom, and unconditional support
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 space-y-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Application Form */}
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2 mb-8">
                    <h2 className="text-3xl font-bold">Join Our Mentor Program</h2>
                    <p className="text-muted-foreground">Fill out the form below to begin your mentorship journey</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input id="occupation" placeholder="Your profession" className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="experience">Why do you want to be a mentor?</Label>
                      <Textarea 
                        id="experience" 
                        placeholder="Share your motivation and what you hope to bring to the mentorship..."
                        className="mt-1 min-h-32"
                      />
                    </div>

                    <div>
                      <Label htmlFor="skills">Skills & Areas of Expertise</Label>
                      <Textarea 
                        id="skills" 
                        placeholder="What skills, knowledge, or life experiences can you share?"
                        className="mt-1 min-h-24"
                      />
                    </div>

                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <Textarea 
                        id="availability" 
                        placeholder="What days/times work best for you?"
                        className="mt-1 min-h-20"
                      />
                    </div>
                  </div>

                  <Button variant="gradient" className="w-full h-12 rounded-full">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit Application
                  </Button>

                  <p className="text-sm text-center text-muted-foreground">
                    We&apos;ll review your application and get back to you within 5 business days
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
  );
}
