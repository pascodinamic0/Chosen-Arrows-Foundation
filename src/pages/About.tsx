import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, Target, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                About <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Chosen Arrows</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Just like arrows in the hands of a skilled archer, we aim to guide the children God 
                entrusts to us toward the direction of their ordained destinies.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="border-primary/20">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To provide holistic care, education, and mentorship to vulnerable children, 
                    empowering them to discover and fulfill their God-given purpose with integrity, 
                    responsibility, and excellence.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A world where every child, regardless of circumstance, has the opportunity to 
                    grow into their fullest potential as leaders, changemakers, and beacons of hope 
                    in their communities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded on the biblical principle that children are like arrows in the hands of a warrior 
                  (Psalm 127:4), Chosen Arrows Foundation began with a simple yet profound vision: to direct 
                  vulnerable children toward their divine destiny.
                </p>
                <p>
                  What started as a small community initiative has grown into a comprehensive support system 
                  that provides education, healthcare, mentorship, and spiritual guidance to children who need 
                  it most. We believe that every child has been chosen for a purpose, and our role is to help 
                  them discover and fulfill that calling.
                </p>
                <p>
                  Today, we serve hundreds of children across multiple communities, partnering with local 
                  churches, schools, and families to create lasting impact. Our approach is holistic, 
                  addressing not just physical needs but also emotional, educational, and spiritual development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { value: "500+", label: "Children Supported" },
                { value: "15", label: "Communities Served" },
                { value: "100+", label: "Mentors" },
                { value: "98%", label: "Success Rate" }
              ].map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6 space-y-2">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
