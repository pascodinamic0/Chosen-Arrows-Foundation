import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, DollarSign } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Be Part of Something{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Eternal
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Every arrow needs guidance. Every child needs hope. Your support can change a life forever.
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-7 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 shadow-[var(--shadow-warm)]"
          >
            Make Your Impact Today
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>

        {/* Ways to Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: DollarSign,
              title: "Give Once or Monthly",
              description: "Choose an amount that feels right and watch your impact grow",
              action: "Start Giving",
            },
            {
              icon: Users,
              title: "Become a Mentor",
              description: "Share your time, wisdom, and experience with a child in need",
              action: "Apply to Mentor",
            },
            {
              icon: Heart,
              title: "Sponsor a Child",
              description: "Create a lasting bond and follow their journey toward purpose",
              action: "Find Your Arrow",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group p-6 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-divine)] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary group-hover:translate-x-1 transition-transform"
                  >
                    {item.action}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
