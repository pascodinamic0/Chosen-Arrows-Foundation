import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import child1 from "@/assets/child-1.jpg";
import child2 from "@/assets/child-2.jpg";

const campaigns = [
  {
    id: 1,
    name: "Grace's Educational Journey",
    age: 8,
    location: "Nairobi, Kenya",
    story: "Grace dreams of becoming a doctor to help her community. With your support, she can receive the education and mentorship needed to achieve her destiny.",
    image: child1,
    goal: 5000,
    raised: 3250,
    donors: 48,
    daysLeft: 25,
  },
  {
    id: 2,
    name: "David's Hope for Tomorrow",
    age: 10,
    location: "Lagos, Nigeria",
    story: "David has a gift for mathematics and science. Help us provide him with the resources and guidance to become the engineer he's meant to be.",
    image: child2,
    goal: 4500,
    raised: 2100,
    donors: 32,
    daysLeft: 18,
  },
];

const CampaignsSection = () => {
  return (
    <section id="campaigns" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Stories of{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Hope & Purpose
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Every child has a story. Every story deserves a chance to unfold beautifully.
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {campaigns.map((campaign, index) => {
            const progress = (campaign.raised / campaign.goal) * 100;
            return (
              <Card
                key={campaign.id}
                className="group overflow-hidden hover:shadow-[var(--shadow-divine)] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <h3 className="text-2xl font-bold text-card-foreground">{campaign.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {campaign.location}
                      </span>
                      <span>Age {campaign.age}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{campaign.story}</p>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-primary">${campaign.raised.toLocaleString()} raised</span>
                      <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                    <span className="font-semibold">{campaign.donors} donors</span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {campaign.daysLeft} days left
                    </span>
                  </div>

                  {/* CTA */}
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    Support {campaign.name.split("'")[0]}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in">
          <Button
            size="lg"
            variant="outline"
            className="border-2 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            View All Campaigns
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignsSection;
