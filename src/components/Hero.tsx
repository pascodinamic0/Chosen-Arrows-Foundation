import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary animate-scale-in">
            <Heart className="w-4 h-4" fill="currentColor" />
            <span>Empowering Children, Shaping Destinies</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Every Child is an{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Arrow in the Hand of God
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            We guide children toward their ordained destinies through mentorship, education, and 
            transparent support — planting seeds of hope that will light up the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 shadow-[var(--shadow-warm)]"
            >
              Start Giving Hope
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <Users className="mr-2 w-5 h-5" />
              Become a Mentor
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center space-y-1">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm md:text-base text-muted-foreground">Children Supported</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                120+
              </div>
              <div className="text-sm md:text-base text-muted-foreground">Active Mentors</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                $2M+
              </div>
              <div className="text-sm md:text-base text-muted-foreground">Funds Raised</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
