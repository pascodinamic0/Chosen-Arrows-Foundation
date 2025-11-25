import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import childImage1 from "@/assets/child-1.jpg";
import childImage2 from "@/assets/child-2.jpg";

const campaigns = [
  {
    id: 1,
    title: "Education for Hope",
    child: "Sarah, 12",
    story: "Sarah dreams of becoming a doctor to help her community. With your support, she can attend secondary school and pursue her calling.",
    image: childImage1,
    raised: 850,
    goal: 1500,
    supporters: 15,
    daysLeft: 23,
    category: "Education"
  },
  {
    id: 2,
    title: "Medical Care Fund",
    child: "David, 8",
    story: "David needs ongoing treatment for a treatable condition. Your donation can provide the medical care that will change his life forever.",
    image: childImage2,
    raised: 580,
    goal: 1200,
    supporters: 12,
    daysLeft: 15,
    category: "Healthcare"
  },
  {
    id: 3,
    title: "Skills Training Program",
    child: "Grace, 16",
    story: "Grace wants to learn vocational skills to support her younger siblings. Help us provide the training she needs for a brighter future.",
    image: childImage1,
    raised: 420,
    goal: 900,
    supporters: 8,
    daysLeft: 45,
    category: "Skills"
  }
];

const Campaigns = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Active <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Campaigns</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Every child has a story. Every campaign is a step toward their divine destiny.
              </p>
            </div>
          </div>
        </section>

        {/* Campaigns Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {campaigns.map((campaign) => {
                const progress = (campaign.raised / campaign.goal) * 100;
                
                return (
                  <Card key={campaign.id} className="group hover:shadow-[var(--shadow-divine)] transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={campaign.image} 
                        alt={campaign.child}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-sm font-semibold backdrop-blur-sm">
                        {campaign.category}
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                        <p className="text-sm text-primary font-semibold mb-3">{campaign.child}</p>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {campaign.story}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold">${campaign.raised.toLocaleString()}</span>
                          <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{campaign.supporters} supporters</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{campaign.daysLeft} days left</span>
                          </div>
                        </div>
                      </div>

                      <Link to={`/campaigns/${campaign.id}`}>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          <Heart className="w-4 h-4 mr-2" fill="currentColor" />
                          Support Campaign
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Campaigns;
