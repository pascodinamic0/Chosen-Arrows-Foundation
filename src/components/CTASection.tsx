"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const CTASection = () => {
  const { t } = useTranslation();

  const ctaItems = [
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

  return (
    <section className="py-24 md:py-40 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA */}
        <div className="max-w-4xl mx-auto text-center space-y-10 mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            {t('cta.title').split('Eternal')[0]}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
              {t('cta.title').includes('Eternal') ? t('cta.title').match(/Eternal.*$/)?.[0] : t('cta.title').split(' ').slice(-1).join(' ')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('cta.subtitle')}
          </p>
          <Link href="/donate">
            <Button
              size="lg"
              className="text-lg px-12 py-8 bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition-all hover:scale-[1.02] shadow-2xl shadow-primary/30 hover:shadow-primary/40 font-bold tracking-wide"
            >
              {t('cta.mainCta')}
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>

        {/* Ways to Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ctaItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.titleKey}
                className="group p-8 rounded-xl bg-card border border-border/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t(item.titleKey)}</h3>
                  <p className="text-foreground/75 leading-relaxed font-medium">{t(item.descKey)}</p>
                  <Link href={item.titleKey.includes("giveOnce") ? "/donate" : item.titleKey.includes("Mentor") ? "/mentorship" : "/donate"}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary group-hover:translate-x-1 transition-transform font-semibold"
                    >
                      {t(item.actionKey)}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
