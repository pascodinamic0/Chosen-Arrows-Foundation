import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Heart, TrendingUp, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const ImpactSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: "45",
      labelKey: "impact.children",
      descKey: "impact.childrenDesc",
      color: "from-primary to-secondary",
    },
    {
      icon: GraduationCap,
      value: "30",
      labelKey: "impact.scholarships",
      descKey: "impact.scholarshipsDesc",
      color: "from-secondary to-accent",
    },
    {
      icon: BookOpen,
      value: "8",
      labelKey: "impact.mentorships",
      descKey: "impact.mentorshipsDesc",
      color: "from-accent to-primary",
    },
    {
      icon: Heart,
      value: "100+",
      labelKey: "impact.donorsWorldwide",
      descKey: "impact.donorsDesc",
      color: "from-primary to-accent",
    },
    {
      icon: TrendingUp,
      value: "95%",
      labelKey: "impact.successRate",
      descKey: "impact.successDesc",
      color: "from-secondary to-primary",
    },
    {
      icon: Globe,
      value: "2",
      labelKey: "impact.countries",
      descKey: "impact.countriesDesc",
      color: "from-accent to-secondary",
    },
  ];

  return (
    <section id="impact" className="py-20 md:py-32 bg-gradient-to-b from-muted/20 via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('impact.title').split('Real Impact')[0]}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('impact.title').includes('Real') ? t('impact.title').match(/Real.*$/)?.[0] : t('impact.title').split(' ').slice(-2).join(' ')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t('impact.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.labelKey}
                className="group relative overflow-hidden hover:shadow-[var(--shadow-divine)] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardContent className="relative p-6 space-y-3">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <h3 className="text-lg font-semibold">{t(stat.labelKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(stat.descKey)}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Impact Statement */}
        <div className="max-w-4xl mx-auto mt-16 text-center space-y-6 animate-fade-in">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('impact.transparencyTitle')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t('impact.transparencyDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span>{t('impact.realTime')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                <span>{t('impact.verified')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span>{t('impact.accountability')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
