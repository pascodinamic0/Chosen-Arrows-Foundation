import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Calendar, Users, Target, Share2 } from "lucide-react";
import { useParams } from "react-router-dom";
import childImage1 from "@/assets/child-1.jpg";

const CampaignDetail = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const campaign = {
    title: "Education for Hope",
    child: "Sarah, 12",
    fullStory: `Sarah is a bright and ambitious 12-year-old who dreams of becoming a doctor. Growing up in a small village, she has witnessed the lack of medical care in her community and feels called to make a difference.

Despite facing numerous challenges, Sarah has consistently been at the top of her class. Her teachers describe her as diligent, compassionate, and exceptionally talented in sciences. However, her family's financial situation makes it impossible for them to afford secondary school fees.

With your support, Sarah can continue her education and pursue her calling. The funds will cover school fees, uniforms, books, and necessary supplies for the next academic year. Every donation brings her one step closer to achieving her dream of serving her community as a healthcare professional.`,
    image: childImage1,
    raised: 3500,
    goal: 5000,
    supporters: 47,
    daysLeft: 23,
    category: "Education",
    updates: [
      { date: "2 days ago", text: "Sarah received her admission letter to St. Mary's Secondary School!" },
      { date: "1 week ago", text: "50% of the goal reached - thank you for your generous support!" },
      { date: "2 weeks ago", text: "Campaign launched - help Sarah achieve her dream" }
    ]
  };

  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Hero Image */}
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <img 
                    src={campaign.image} 
                    alt={campaign.child}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold backdrop-blur-sm">
                    {campaign.category}
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{campaign.title}</h1>
                    <p className="text-xl text-primary font-semibold">{campaign.child}</p>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    {campaign.fullStory.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Updates */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Campaign Updates</h2>
                    <div className="space-y-4">
                      {campaign.updates.map((update, index) => (
                        <div key={index} className="border-l-2 border-primary pl-4 py-2">
                          <p className="text-sm text-muted-foreground mb-1">{update.date}</p>
                          <p className="font-medium">{update.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-3xl font-bold">${campaign.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                            <Users className="w-4 h-4" />
                          </div>
                          <div className="text-2xl font-bold">{campaign.supporters}</div>
                          <div className="text-sm text-muted-foreground">Supporters</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div className="text-2xl font-bold">{campaign.daysLeft}</div>
                          <div className="text-sm text-muted-foreground">Days Left</div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg">
                      <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                      Donate Now
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Campaign
                    </Button>

                    <div className="pt-4 border-t space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span>100% of donations go to the child</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span>Tax-deductible contributions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CampaignDetail;
