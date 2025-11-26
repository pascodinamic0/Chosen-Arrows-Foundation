import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/logo.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Chosen Arrows Foundation Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Chosen Arrows
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/campaigns" className="text-foreground hover:text-primary transition-colors">
              {t('nav.campaigns')}
            </Link>
            <Link to="/mentorship" className="text-foreground hover:text-primary transition-colors">
              {t('nav.mentorship')}
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              {t('nav.contact')}
            </Link>
            <LanguageSwitcher />
            <Link to="/donate">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                {t('nav.donate')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link
              to="/about"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/campaigns"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.campaigns')}
            </Link>
            <Link
              to="/mentorship"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.mentorship')}
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <div className="py-2">
              <LanguageSwitcher />
            </div>
            <Link to="/donate" onClick={() => setIsOpen(false)}>
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary">
                {t('nav.donate')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
