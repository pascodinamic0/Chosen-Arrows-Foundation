import type { Metadata } from "next";
import CampaignsClient from "./CampaignsClient";

export const metadata: Metadata = {
  title: "Active Campaigns | Chosen Arrows Foundation",
  description: "Every child has a story. Every campaign is a step toward their divine destiny. Explore our active campaigns and help guide children toward their purpose.",
  keywords: ["campaigns", "fundraising", "children", "donate", "support", "charity"],
  openGraph: {
    title: "Active Campaigns | Chosen Arrows Foundation",
    description: "Every child has a story. Every campaign is a step toward their divine destiny",
    type: "website",
  },
};

export default function CampaignsPage() {
  return <CampaignsClient />;
}
