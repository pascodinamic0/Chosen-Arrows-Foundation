"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import child1 from "@/assets/child-1.jpg";
import child2 from "@/assets/child-2.jpg";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const campaigns = [
  {
    id: 1,
    name: "Grace's Educational Journey",
    age: 8,
    location: "Nairobi, Kenya",
    story: "Grace dreams of becoming a doctor to help her community. With your support, she can receive the education and mentorship needed to achieve her destiny.",
    image: child1,
    goal: 1500,
    raised: 850,
    donors: 15,
    daysLeft: 25,
  },
  {
    id: 2,
    name: "David's Hope for Tomorrow",
    age: 10,
    location: "Kampala, Uganda",
    story: "David has a gift for mathematics and science. Help us provide him with the resources and guidance to become the engineer he's meant to be.",
    image: child2,
    goal: 1200,
    raised: 580,
    donors: 12,
    daysLeft: 18,
  },
];

const CampaignsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="campaigns" className="py-24 md:py-40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {t('campaigns.title').split('Hope & Purpose')[0]}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
              {t('campaigns.title').match(/Hope.*$/)?.[0] || t('campaigns.title').split(' ').slice(-3).join(' ')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/75 leading-relaxed font-medium">
            {t('campaigns.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto mb-16">
          {campaigns.map((campaign, index) => {
            const progress = (campaign.raised / campaign.goal) * 100;
            return (
              <Card
                key={campaign.id}
                className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 animate-fade-in-up border-border/60"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={campaign.image}
                    alt={campaign.name}
                    fill
                    priority={index < 2}
                    quality={85}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <h3 className="text-2xl font-bold text-card-foreground drop-shadow-lg">{campaign.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-card-foreground/90 font-medium">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {campaign.location}
                      </span>
                      <span>Age {campaign.age}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-7 space-y-5">
                  <p className="text-foreground/80 leading-relaxed font-medium">{campaign.story}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-primary">{campaign.raised.toLocaleString()} {t('campaigns.raised')}</span>
                      <span className="text-foreground/60">{t('campaigns.of')} ${campaign.goal.toLocaleString()}</span>
                    </div>
                    <Progress value={progress} className="h-2.5" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-foreground/70 border-t border-border/60 pt-5">
                    <span className="font-semibold">{campaign.donors} {t('campaigns.donors')}</span>
                    <span className="flex items-center font-medium">
                      <Calendar className="w-4 h-4 mr-1" />
                      {campaign.daysLeft} {t('campaigns.daysLeft')}
                    </span>
                  </div>

                  <Link href={`/campaigns/${campaign.id}`}>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition-all hover:shadow-lg shadow-md shadow-primary/20 font-semibold tracking-wide mt-2">
                      {t('campaigns.support')} {campaign.name.split("'")[0]}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center animate-fade-in">
          <Link href="/campaigns">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-foreground/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold px-8 py-6 shadow-sm hover:shadow-md"
            >
              {t('campaigns.viewAll')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampaignsSection;
