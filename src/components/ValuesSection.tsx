import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, HandHeart, Sparkles, CheckCircle } from "lucide-react";

const values = [
  {
    icon: HandHeart,
    title: "Responsibility",
    description: "We care for every child entrusted to us with compassion and accountability.",
    color: "from-primary to-secondary",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold honesty and transparency in every action and partnership.",
    color: "from-secondary to-accent",
  },
  {
    icon: Heart,
    title: "Trust",
    description: "We build dependable relationships rooted in love and consistency.",
    color: "from-accent to-primary",
  },
  {
    icon: Sparkles,
    title: "Adeptness",
    description: "We serve with excellence, always learning and growing in purpose.",
    color: "from-primary to-accent",
  },
  {
    icon: CheckCircle,
    title: "Honesty",
    description: "We speak truth in love — reflecting the nature and light of God.",
    color: "from-secondary to-primary",
  },
];

const ValuesSection = () => {
  return (
    <section id="mission" className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Our Core Values
            <span className="block mt-2 text-2xl sm:text-3xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              R.I.T.A.H
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Guiding principles that shape everything we do and every life we touch
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.title}
                className="group hover:shadow-[var(--shadow-divine)] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-primary/10 animate-fade-in">
          <blockquote className="text-center space-y-4">
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              "Just like arrows in the hands of a skilled archer, we aim to guide the children God 
              entrusts to us toward the direction of their ordained destinies."
            </p>
            <footer className="text-muted-foreground font-semibold">— Our Vision</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
