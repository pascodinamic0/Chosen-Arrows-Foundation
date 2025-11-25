import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Chosen Arrows
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#mission" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.ourMission')}</a></li>
              <li><a href="#campaigns" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.activeCampaigns')}</a></li>
              <li><a href="#impact" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.ourImpact')}</a></li>
              <li><a href="#community" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.community')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t('footer.getInvolved')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.donate')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.becomeMentor')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.sponsorChild')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.partner')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:ChosenArrowsFoundation@gmail.com" className="hover:text-primary transition-colors">
                  ChosenArrowsFoundation@gmail.com
                </a>
              </li>
              <li className="text-muted-foreground leading-relaxed">
                {t('footer.contactMessage')}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-muted-foreground">
            <p>© 2025 Chosen Arrows Foundation. {t('footer.rights')}.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
              <a href="#" className="hover:text-primary transition-colors">{t('footer.transparency')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
