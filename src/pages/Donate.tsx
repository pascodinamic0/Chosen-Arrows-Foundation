import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, CreditCard, Shield } from "lucide-react";
import { useState } from "react";

const Donate = () => {
  const [amount, setAmount] = useState("50");
  const [frequency, setFrequency] = useState("once");

  const presetAmounts = ["25", "50", "100", "250", "500"];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Make a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Difference</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Your generosity changes lives. Every donation helps guide a child toward their divine destiny.
              </p>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8 space-y-8">
                  {/* Frequency Selection */}
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold">Donation Frequency</Label>
                    <RadioGroup value={frequency} onValueChange={setFrequency} className="grid grid-cols-2 gap-4">
                      <div>
                        <RadioGroupItem value="once" id="once" className="peer sr-only" />
                        <Label
                          htmlFor="once"
                          className="flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          One-time
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                        <Label
                          htmlFor="monthly"
                          className="flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          Monthly
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold">Select Amount</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {presetAmounts.map((preset) => (
                        <Button
                          key={preset}
                          variant={amount === preset ? "default" : "outline"}
                          onClick={() => setAmount(preset)}
                          className="h-12"
                        >
                          ${preset}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-7 h-12 text-lg"
                        placeholder="Custom amount"
                      />
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Your Information</Label>
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <Button className="w-full h-14 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </Button>

                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure & encrypted payment processing</span>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Message */}
              <Card className="mt-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-medium">
                    ${amount} {frequency === "monthly" ? "monthly" : ""} can provide:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>✓ School supplies for 2 children</li>
                    <li>✓ Weekly meals for 5 children</li>
                    <li>✓ Medical checkup for 1 child</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
