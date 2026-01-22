"use client";

import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import logo from "@/assets/logo.jpg";

type FooterProps = {
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
};

const Footer = ({ contactInfo, socialLinks: socialLinksProp }: FooterProps) => {
  const { t } = useTranslation();

  const quickLinks = [
    { href: "#mission", label: t("footer.ourMission") },
    { href: "#campaigns", label: t("footer.activeCampaigns") },
    { href: "#impact", label: t("footer.ourImpact") },
    { href: "#community", label: t("footer.community") },
  ];

  const getInvolved = [
    { href: "/donate", label: t("footer.donate") },
    { href: "/mentorship", label: t("footer.becomeMentor") },
    { href: "/donate", label: t("footer.sponsorChild") },
    { href: "/contact", label: t("footer.partner") },
  ];

  const socialLinks = [
    { icon: Facebook, href: socialLinksProp?.facebook || "#", label: "Facebook" },
    { icon: Twitter, href: socialLinksProp?.twitter || "#", label: "Twitter" },
    { icon: Instagram, href: socialLinksProp?.instagram || "#", label: "Instagram" },
    { icon: Linkedin, href: socialLinksProp?.linkedin || "#", label: "LinkedIn" },
  ];

  const email = contactInfo?.email || "ChosenArrowsFoundation@gmail.com";

  return (
    <footer className="bg-gradient-to-b from-white to-mint-50/30 border-t border-mint-200/50">
      <div className="enterprise-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={logo}
                alt="Chosen Arrows Foundation Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain rounded"
              />
              <span className="text-base font-semibold text-foreground">
                Chosen Arrows
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-full bg-mint-100 hover:bg-taffy-100 flex items-center justify-center text-mint-600 hover:text-taffy-500 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {t("footer.getInvolved")}
            </h4>
            <ul className="space-y-2.5">
              {getInvolved.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">{email}</span>
                </a>
              </li>
              <li className="text-sm text-muted-foreground leading-relaxed">
                {t("footer.contactMessage")}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Chosen Arrows Foundation. {t("footer.rights")}.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors duration-150">
                {t("footer.privacy")}
              </a>
              <a href="#" className="hover:text-foreground transition-colors duration-150">
                {t("footer.terms")}
              </a>
              <a href="#" className="hover:text-foreground transition-colors duration-150">
                {t("footer.transparency")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
