"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

type CTAContent = {
  title?: string;
  subtitle?: string;
  mainCta?: string;
  items?: Array<{
    title: string;
    description: string;
    action: string;
    href?: string;
  }>;
};

const iconList = [DollarSign, Users, Heart];

const CTASection = ({ content }: { content?: CTAContent }) => {
  const { t } = useTranslation();

  const fallbackItems = [
    {
      icon: DollarSign,
      titleKey: "cta.giveOnce",
      descKey: "cta.giveDesc",
      actionKey: "cta.giveAction",
    },
    {
      icon: Users,
      titleKey: "cta.becomeMentor",
      descKey: "cta.mentorDesc",
      actionKey: "cta.mentorAction",
    },
    {
      icon: Heart,
      titleKey: "cta.sponsorChild",
      descKey: "cta.sponsorDesc",
      actionKey: "cta.sponsorAction",
    },
  ];

  const ctaItems = content?.items?.length
    ? content.items.map((item, index) => ({
        icon: iconList[index % iconList.length],
        title: item.title,
        description: item.description,
        action: item.action,
        href: item.href,
      }))
    : fallbackItems.map((item) => ({
        ...item,
        title: t(item.titleKey),
        description: t(item.descKey),
        action: t(item.actionKey),
      }));

  const title = content?.title ?? t("cta.title");

  return (
    <section id="cta" className="section-padding bg-gradient-to-br from-mint-50 via-white to-taffy-50/50">
      <div className="enterprise-container">
        {/* Main CTA */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-foreground text-balance">{title}</h2>
          <p className="text-muted-foreground text-lg mb-8">
            {content?.subtitle ?? t("cta.subtitle")}
          </p>
          <Link href="/donate">
            <Button
              size="lg"
              variant="gradient"
              className="px-10 rounded-full"
            >
              {content?.mainCta ?? t("cta.mainCta")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Ways to Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {ctaItems.map((item, index) => {
            const Icon = item.icon;
            const href =
              item.href ||
              (content?.items?.length
                ? "/donate"
                : item.titleKey.includes("giveOnce")
                ? "/donate"
                : item.titleKey.includes("Mentor")
                ? "/mentorship"
                : "/donate");
            
            return (
              <div
                key={content?.items?.length ? `${item.title}-${index}` : item.titleKey}
                className="enterprise-card p-6 hover-lift group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-taffy-100 to-mint-100 flex items-center justify-center mb-4 group-hover:from-taffy-200 group-hover:to-mint-200 transition-colors duration-200">
                  <Icon className="w-5 h-5 text-taffy-500" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>
                <Link href={href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-taffy-500 hover:text-taffy-600 hover:bg-taffy-50 font-medium rounded-lg transition-colors duration-150"
                  >
                    {item.action}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
