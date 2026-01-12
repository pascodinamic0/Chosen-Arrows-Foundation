"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users } from "lucide-react";
import Image from "next/image";
import heroBackground from "@/assets/hero-background.jpg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroBackground}
          alt="Hero background"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-10 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/15 backdrop-blur-sm border border-primary/30 rounded-full px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-primary/10 animate-scale-in">
            <Heart className="w-4 h-4" fill="currentColor" />
            <span className="tracking-wide">{t('hero.badge')}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            {t('hero.title').split('Arrow in the Hand of God')[0]}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
              {t('hero.title').includes('Arrow') ? t('hero.title').match(/Arrow.*$/)?.[0] : t('hero.title').split(' ').slice(-6).join(' ')}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-10 py-7 bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition-all hover:scale-[1.02] shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 font-semibold tracking-wide"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-10 py-7 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-accent/50 hover:text-accent-foreground transition-all font-semibold backdrop-blur-sm bg-background/50"
            >
              <Users className="mr-2 w-5 h-5" />
              {t('hero.ctaMentor')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 pt-16 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
                45
              </div>
              <div className="text-sm md:text-base text-foreground/70 font-medium">{t('hero.childrenSupported')}</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
                8
              </div>
              <div className="text-sm md:text-base text-foreground/70 font-medium">{t('hero.activeMentors')}</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent drop-shadow-sm">
                $15K
              </div>
              <div className="text-sm md:text-base text-foreground/70 font-medium">{t('hero.fundsRaised')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
