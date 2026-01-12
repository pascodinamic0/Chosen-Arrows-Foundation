import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ValuesSection from "@/components/ValuesSection";
import CampaignsSection from "@/components/CampaignsSection";
import ImpactSection from "@/components/ImpactSection";
import CommunitySection from "@/components/CommunitySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Home | Chosen Arrows Foundation",
  description: "Empowering children and communities through education and mentorship. Join us in guiding children toward their divine destiny.",
  keywords: ["children", "education", "mentorship", "charity", "foundation", "community"],
  openGraph: {
    title: "Chosen Arrows Foundation",
    description: "Empowering children and communities through education and mentorship",
    type: "website",
    siteName: "Chosen Arrows Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chosen Arrows Foundation",
    description: "Empowering children and communities through education and mentorship",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CommunitySection />
      <ImpactSection />
      <CampaignsSection />
      <ValuesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
