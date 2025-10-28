import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ValuesSection from "@/components/ValuesSection";
import CampaignsSection from "@/components/CampaignsSection";
import ImpactSection from "@/components/ImpactSection";
import CommunitySection from "@/components/CommunitySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ValuesSection />
      <CampaignsSection />
      <ImpactSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
