import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import communityImage from "@/assets/community.jpg";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Monthly Donor",
    content: "Seeing the direct impact of my contributions has been incredibly fulfilling. Every update reminds me that I'm part of something truly meaningful.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Mentor",
    content: "Mentoring through Chosen Arrows has transformed my life as much as the children I guide. It's a privilege to be part of their journey toward purpose.",
    avatar: "MC",
  },
  {
    name: "Grace Okonkwo",
    role: "Parent",
    content: "My daughter's confidence and dreams have flourished thanks to this foundation. They didn't just provide financial support — they gave her hope and direction.",
    avatar: "GO",
  },
];

const CommunitySection = () => {
  const { t } = useTranslation();

  return (
    <section id="community" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('community.title').split('Hope Builders')[0]}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('community.title').includes('Hope') ? t('community.title').match(/Hope.*$/)?.[0] : t('community.title').split(' ').slice(-2).join(' ')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t('community.subtitle')}
          </p>
        </div>

        {/* Community Image */}
        <div className="max-w-5xl mx-auto mb-16 animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden h-64 md:h-96 group">
            <img
              src={communityImage}
              alt="Community of children and mentors"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <p className="text-xl md:text-2xl font-semibold text-card-foreground">
                {t('community.imageCaption')}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="group hover:shadow-[var(--shadow-divine)] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="w-8 h-8 text-primary opacity-50" />
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <div className="max-w-4xl mx-auto mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-muted/50 to-background border border-border animate-fade-in">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-sm text-muted-foreground">{t('community.donorRetention')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                4.9★
              </div>
              <div className="text-sm text-muted-foreground">{t('community.avgRating')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-muted-foreground">{t('community.transparency')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
