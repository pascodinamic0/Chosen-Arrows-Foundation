import type { Metadata } from "next";
import DonateClient from "./DonateClient";

export const metadata: Metadata = {
  title: "Donate | Chosen Arrows Foundation",
  description: "Your generosity changes lives. Every donation helps guide a child toward their divine destiny. Make a difference today with a secure, tax-deductible contribution.",
  keywords: ["donate", "donation", "charity", "give", "support children", "tax deductible"],
  openGraph: {
    title: "Donate | Chosen Arrows Foundation",
    description: "Your generosity changes lives. Every donation helps guide a child toward their divine destiny",
    type: "website",
  },
};

export default function DonatePage() {
  return <DonateClient />;
}
