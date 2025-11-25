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
    <section id="mission" className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('values.title')}
            <span className="block mt-2 text-2xl sm:text-3xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('values.subtitle')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t('values.description')}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.titleKey}
                className="group hover:shadow-[var(--shadow-divine)] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{t(value.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(value.descKey)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-primary/10 animate-fade-in">
          <blockquote className="text-center space-y-4">
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              "{t('values.visionQuote')}"
            </p>
            <footer className="text-muted-foreground font-semibold">— {t('values.vision')}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
