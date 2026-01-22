"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const scrollToMission = () => {
  document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
};

type HeroContent = {
  badge?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
  ctaMentor?: string;
  stats?: {
    childrenSupported?: number | string;
    activeMentors?: number | string;
    fundsRaised?: number | string;
  };
};

const formatStat = (value: number | string | undefined, fallback: string) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "number") return value.toLocaleString();
  const asNumber = Number(value);
  return Number.isFinite(asNumber) ? asNumber.toLocaleString() : value;
};

const formatCurrency = (value: number | string | undefined, fallback: string) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "string" && value.trim().startsWith("$")) return value;
  const asNumber = typeof value === "number" ? value : Number(value);
  return Number.isFinite(asNumber) ? `$${asNumber.toLocaleString()}` : String(value);
};

const Hero = ({ content }: { content?: HeroContent }) => {
  const { t } = useTranslation();
  const title = content?.title ?? t("hero.title");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/hero-poster.jpg"
        >
          {/* Using a free stock video - you can replace with your own */}
          <source
            src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 enterprise-container py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium text-white bg-taffy-400/20 backdrop-blur-sm rounded-full border border-taffy-400/30">
            <span className="w-2 h-2 bg-taffy-400 rounded-full animate-pulse" />
            <span>{content?.badge ?? t("hero.badge")}</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-balance text-white">
            <span>{title}</span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {content?.subtitle ?? t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/donate">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-taffy-400 hover:bg-taffy-500 text-white font-semibold px-8 rounded-full shadow-lg shadow-taffy-400/25 transition-all duration-200 hover:shadow-xl hover:shadow-taffy-400/30"
              >
                {content?.cta ?? t("hero.cta")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/mentorship">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-semibold px-8 rounded-full border-mint-300/50 bg-mint-300/10 backdrop-blur-sm text-white hover:bg-mint-300/20 hover:border-mint-300/70 transition-all duration-200"
              >
                <Users className="mr-2 w-4 h-4" />
                {content?.ctaMentor ?? t("hero.ctaMentor")}
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-taffy-300 tabular-nums">
                {formatStat(content?.stats?.childrenSupported, "45")}
              </div>
              <div className="text-sm text-white/70 font-medium mt-1">{t("hero.childrenSupported")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-mint-300 tabular-nums">
                {formatStat(content?.stats?.activeMentors, "8")}
              </div>
              <div className="text-sm text-white/70 font-medium mt-1">{t("hero.activeMentors")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white tabular-nums">
                {formatCurrency(content?.stats?.fundsRaised, "$15K")}
              </div>
              <div className="text-sm text-white/70 font-medium mt-1">{t("hero.fundsRaised")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade - taller to accommodate scroll indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

      {/* Scroll Down Indicator - positioned in the gradient area, below stats */}
      <button
        onClick={scrollToMission}
        className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 md:gap-1.5 text-foreground/60 hover:text-foreground transition-colors duration-300 cursor-pointer group"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] md:text-xs font-medium tracking-wider uppercase">Scroll</span>
        <div className="relative w-5 h-8 md:w-6 md:h-9 rounded-full border-2 border-current flex items-start justify-center p-1">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-current rounded-full animate-scroll-down" />
        </div>
        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce-subtle -mt-0.5" />
      </button>
    </section>
  );
};

export default Hero;
