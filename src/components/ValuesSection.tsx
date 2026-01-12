"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, HandHeart, Sparkles, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const ValuesSection = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: HandHeart,
      titleKey: "values.responsibility",
      descKey: "values.responsibilityDesc",
      color: "from-primary to-secondary",
    },
    {
      icon: Shield,
      titleKey: "values.integrity",
      descKey: "values.integrityDesc",
      color: "from-secondary to-accent",
    },
    {
      icon: Heart,
      titleKey: "values.trust",
      descKey: "values.trustDesc",
      color: "from-accent to-primary",
    },
    {
      icon: Sparkles,
      titleKey: "values.adeptness",
      descKey: "values.adeptnessDesc",
      color: "from-primary to-accent",
    },
    {
      icon: CheckCircle,
      titleKey: "values.honesty",
      descKey: "values.honestyDesc",
      color: "from-secondary to-primary",
    },
  ];

  return (
    <section id="mission" className="py-24 md:py-40 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {t('values.title')}
            <span className="block mt-3 text-2xl sm:text-3xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
              {t('values.subtitle')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/75 leading-relaxed font-medium">
            {t('values.description')}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.titleKey}
                className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-border/60"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-7 space-y-5">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t(value.titleKey)}</h3>
                  <p className="text-foreground/75 leading-relaxed font-medium">{t(value.descKey)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mt-20 p-10 md:p-14 rounded-2xl bg-gradient-to-br from-primary/8 via-secondary/8 to-accent/8 border border-primary/20 shadow-xl animate-fade-in">
          <blockquote className="text-center space-y-5">
            <p className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground/90">
              &ldquo;{t('values.visionQuote')}&rdquo;
            </p>
            <footer className="text-foreground/70 font-bold text-lg">— {t('values.vision')}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
