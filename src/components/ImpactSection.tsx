import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Heart, TrendingUp, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "45",
    label: "Children Supported",
    description: "Lives touched and transformed",
    color: "from-primary to-secondary",
  },
  {
    icon: GraduationCap,
    value: "30",
    label: "Scholarships Awarded",
    description: "Educational dreams fulfilled",
    color: "from-secondary to-accent",
  },
  {
    icon: BookOpen,
    value: "8",
    label: "Active Mentorships",
    description: "Guided toward purpose",
    color: "from-accent to-primary",
  },
  {
    icon: Heart,
    value: "100+",
    label: "Donors Worldwide",
    description: "Partners in hope",
    color: "from-primary to-accent",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    description: "Reaching milestones",
    color: "from-secondary to-primary",
  },
  {
    icon: Globe,
    value: "2",
    label: "Countries Served",
    description: "Kenya & Uganda",
    color: "from-accent to-secondary",
  },
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-20 md:py-32 bg-gradient-to-b from-muted/20 via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Measuring{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Real Impact
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Every number tells a story of transformation, hope, and divine purpose fulfilled
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="group relative overflow-hidden hover:shadow-[var(--shadow-divine)] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardContent className="relative p-6 space-y-3">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <h3 className="text-lg font-semibold">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Impact Statement */}
        <div className="max-w-4xl mx-auto mt-16 text-center space-y-6 animate-fade-in">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Transparency in Every Step
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We believe in complete transparency. Every donation is tracked, every milestone is documented, 
              and every success story is shared. You don't just give — you witness the transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                <span>Verified Impact</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span>Full Accountability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
