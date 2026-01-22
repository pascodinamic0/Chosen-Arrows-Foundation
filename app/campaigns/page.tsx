import type { Metadata } from "next";
import CampaignsClient from "./CampaignsClient";
import { getCampaigns } from "@/app/actions/campaigns/get-campaigns";
import { getServerLanguage } from "@/lib/i18n";
import { getPageMetadata } from "@/app/actions/metadata/get-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const metadata = await getPageMetadata('/campaigns', language);

  if (metadata) {
    return {
      title: metadata.title || "Active Campaigns | Chosen Arrows Foundation",
      description: metadata.description || "Every child has a story. Every campaign is a step toward their divine destiny. Explore our active campaigns and help guide children toward their purpose.",
      keywords: metadata.keywords || ["campaigns", "fundraising", "children", "donate", "support", "charity"],
      openGraph: {
        title: metadata.og_title || metadata.title || "Active Campaigns | Chosen Arrows Foundation",
        description: metadata.og_description || metadata.description || "Every child has a story. Every campaign is a step toward their divine destiny",
        type: metadata.og_type || "website",
        images: metadata.og_image_url ? [{ url: metadata.og_image_url }] : undefined,
      },
      twitter: {
        card: metadata.twitter_card || "summary_large_image",
        title: metadata.twitter_title || metadata.title || "Active Campaigns | Chosen Arrows Foundation",
        description: metadata.twitter_description || metadata.description || "Every child has a story. Every campaign is a step toward their divine destiny",
        images: metadata.twitter_image_url ? [metadata.twitter_image_url] : undefined,
      },
    };
  }

  return {
    title: "Active Campaigns | Chosen Arrows Foundation",
    description: "Every child has a story. Every campaign is a step toward their divine destiny. Explore our active campaigns and help guide children toward their purpose.",
    keywords: ["campaigns", "fundraising", "children", "donate", "support", "charity"],
    openGraph: {
      title: "Active Campaigns | Chosen Arrows Foundation",
      description: "Every child has a story. Every campaign is a step toward their divine destiny",
      type: "website",
    },
  };
}

export default async function CampaignsPage() {
  const language = await getServerLanguage();
  const campaignsRaw = await getCampaigns(language, { status: 'active' }).catch(() => []);

  // Transform campaigns to match CampaignsClient expected format
  const campaigns = campaignsRaw.map(campaign => ({
    id: campaign.id,
    slug: campaign.slug,
    title: campaign.translation?.title || '',
    child: campaign.translation?.child_name && campaign.translation?.child_age
      ? `${campaign.translation.child_name}, ${campaign.translation.child_age}`
      : campaign.translation?.child_name || '',
    story: campaign.translation?.story || '',
    image: campaign.primaryImage || null,
    raised: campaign.raised_amount,
    goal: campaign.goal_amount,
    supporters: campaign.donor_count,
    daysLeft: campaign.days_left,
    category: campaign.category || '',
  }));

  return <CampaignsClient campaigns={campaigns} />;
}
