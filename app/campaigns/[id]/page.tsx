import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CampaignDetailClient from "./CampaignDetailClient";
import childImage1 from "@/assets/child-1.jpg";

// Mock data - in real app, fetch based on id
const getCampaignData = (id: string) => {
  const campaigns: Record<string, any> = {
    "1": {
      title: "Education for Hope",
      child: "Sarah, 12",
      fullStory: `Sarah is a bright and ambitious 12-year-old who dreams of becoming a doctor. Growing up in a small village, she has witnessed the lack of medical care in her community and feels called to make a difference.

Despite facing numerous challenges, Sarah has consistently been at the top of her class. Her teachers describe her as diligent, compassionate, and exceptionally talented in sciences. However, her family's financial situation makes it impossible for them to afford secondary school fees.

With your support, Sarah can continue her education and pursue her calling. The funds will cover school fees, uniforms, books, and necessary supplies for the next academic year. Every donation brings her one step closer to achieving her dream of serving her community as a healthcare professional.`,
      image: childImage1,
      raised: 3500,
      goal: 5000,
      supporters: 47,
      daysLeft: 23,
      category: "Education",
      updates: [
        { date: "2 days ago", text: "Sarah received her admission letter to St. Mary's Secondary School!" },
        { date: "1 week ago", text: "50% of the goal reached - thank you for your generous support!" },
        { date: "2 weeks ago", text: "Campaign launched - help Sarah achieve her dream" }
      ]
    },
    "2": {
      title: "Medical Care Fund",
      child: "David, 8",
      fullStory: `David is an 8-year-old boy who needs ongoing medical treatment for a treatable condition. With proper care, David can live a healthy and fulfilling life.`,
      image: childImage1,
      raised: 1200,
      goal: 2000,
      supporters: 25,
      daysLeft: 15,
      category: "Healthcare",
      updates: [
        { date: "1 week ago", text: "Treatment plan approved by medical team" },
        { date: "2 weeks ago", text: "Campaign launched" }
      ]
    },
    "3": {
      title: "Skills Training Program",
      child: "Grace, 16",
      fullStory: `Grace wants to learn vocational skills to support her younger siblings. Help us provide the training she needs for a brighter future.`,
      image: childImage1,
      raised: 800,
      goal: 1500,
      supporters: 18,
      daysLeft: 30,
      category: "Skills",
      updates: [
        { date: "3 days ago", text: "Grace enrolled in skills training program" },
        { date: "1 week ago", text: "Campaign launched" }
      ]
    }
  };

  return campaigns[id] || null;
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const campaign = getCampaignData(params.id);

  if (!campaign) {
    return {
      title: "Campaign Not Found | Chosen Arrows Foundation",
      description: "The campaign you're looking for doesn't exist.",
    };
  }

  const progress = Math.round((campaign.raised / campaign.goal) * 100);
  const imageUrl = typeof campaign.image === 'string' ? campaign.image : campaign.image.src;

  return {
    title: `${campaign.title} | Chosen Arrows Foundation`,
    description: `${campaign.child} - ${campaign.fullStory.split('\n\n')[0].substring(0, 150)}... Help us reach our goal of $${campaign.goal.toLocaleString()}. ${progress}% funded.`,
    keywords: [campaign.category.toLowerCase(), "campaign", "donate", "fundraising", campaign.child.split(',')[0].toLowerCase()],
    openGraph: {
      title: `${campaign.title} | Chosen Arrows Foundation`,
      description: `Support ${campaign.child} - ${campaign.fullStory.split('\n\n')[0].substring(0, 150)}...`,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: campaign.child,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${campaign.title} | Chosen Arrows Foundation`,
      description: `Support ${campaign.child} - ${progress}% funded. Help us reach $${campaign.goal.toLocaleString()}`,
      images: [imageUrl],
    },
  };
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = getCampaignData(params.id);

  if (!campaign) {
    notFound();
  }

  return <CampaignDetailClient campaign={campaign} />;
}
