"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import child1 from "@/assets/child-1.jpg";
import child2 from "@/assets/child-2.jpg";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import type { StaticImageData } from "next/image";

type CampaignCard = {
  id: string | number;
  name: string;
  age?: number | null;
  location?: string;
  story: string;
  image?: string | StaticImageData;
  goal: number;
  raised: number;
  donors: number;
  daysLeft?: number | null;
};

type CampaignsSectionProps = {
  campaigns?: CampaignCard[];
};

const fallbackCampaigns: CampaignCard[] = [
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
    location: "Nairobi, Kenya",
    story: "David has a gift for mathematics and science. Help us provide him with the resources and guidance to become the engineer he's meant to be.",
    image: child2,
    goal: 1200,
    raised: 580,
    donors: 12,
    daysLeft: 18,
  },
];

const CampaignsSection = ({ campaigns }: CampaignsSectionProps) => {
  const { t } = useTranslation();
  const campaignList = campaigns?.length ? campaigns : fallbackCampaigns;

  return (
    <section id="campaigns" className="section-padding bg-gradient-to-b from-mint-50/50 to-white">
      <div className="enterprise-container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-foreground text-balance">
            {t("campaigns.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("campaigns.subtitle")}
          </p>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {campaignList.map((campaign) => {
            const progress = (campaign.raised / campaign.goal) * 100;
            const imageSrc = campaign.image || child1;
            
            return (
              <div
                key={campaign.id}
                className="enterprise-card overflow-hidden hover-lift"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={campaign.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {campaign.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {campaign.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {campaign.location}
                        </span>
                      )}
                      {campaign.age ? (
                        <span>Age {campaign.age}</span>
                      ) : null}
                    </div>
                  </div>

                  {/* Story */}
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {campaign.story}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-foreground">
                        ${campaign.raised.toLocaleString()} {t("campaigns.raised")}
                      </span>
                      <span className="text-muted-foreground">
                        {t("campaigns.of")} ${campaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pb-4 mb-4 border-b border-border">
                    <span className="font-medium">
                      {campaign.donors} {t("campaigns.donors")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {campaign.daysLeft} {t("campaigns.daysLeft")}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link href={`/campaigns/${campaign.id}`}>
                    <Button variant="gradient" className="w-full rounded-full">
                      {t("campaigns.support")} {campaign.name.split("'")[0]}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link href="/campaigns">
            <Button
              variant="outline"
              className="font-semibold px-8 rounded-full border-mint-300 text-mint-600 hover:bg-mint-50 hover:border-mint-400 transition-all duration-200"
            >
              {t("campaigns.viewAll")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampaignsSection;
