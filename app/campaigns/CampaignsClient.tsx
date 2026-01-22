"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Calendar, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Campaign = {
  id: string;
  slug: string;
  title: string;
  child: string;
  story: string;
  image: string | null;
  raised: number;
  goal: number;
  supporters: number;
  daysLeft: number | null;
  category: string;
};

type CampaignsClientProps = {
  campaigns: Campaign[];
};

export default function CampaignsClient({ campaigns }: CampaignsClientProps) {
  if (campaigns.length === 0) {
    return (
      <main className="pt-24 pb-20">
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Active <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Campaigns</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                No active campaigns at the moment. Check back soon!
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }
  return (
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
                    <div className="relative h-64 overflow-hidden bg-muted">
                      {campaign.image ? (
                        <Image
                          src={campaign.image}
                          alt={campaign.child}
                          fill
                          priority={campaigns.indexOf(campaign) < 2}
                          quality={85}
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-mint-100 to-taffy-100">
                          <Heart className="w-16 h-16 text-mint-300" />
                        </div>
                      )}
                      {campaign.category && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-sm font-semibold backdrop-blur-sm">
                          {campaign.category}
                        </div>
                      )}
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

                      <Link href={`/campaigns/${campaign.slug}`}>
                        <Button variant="gradient" className="w-full rounded-full">
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
  );
}
