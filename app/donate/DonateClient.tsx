"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heart, CreditCard, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { processDonation, type DonationActionResult } from "./actions";
import { toast } from "sonner";

const donationFormSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Amount must be a positive number")
    .refine((val) => {
      const num = parseFloat(val);
      return num >= 1;
    }, "Minimum donation amount is $1")
    .refine((val) => {
      const num = parseFloat(val);
      return num <= 100000;
    }, "Maximum donation amount is $100,000"),
  frequency: z.enum(["once", "monthly"], {
    required_error: "Please select a donation frequency",
  }),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

// Type guard for error result
function isErrorResult(
  result: DonationActionResult
): result is Extract<DonationActionResult, { success: false }> {
  return result.success === false;
}

export default function DonateClient() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<DonationActionResult | null>(null);
  const [selectedAmount, setSelectedAmount] = useState("50");
  
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: "50",
      frequency: "once",
      name: "",
      email: "",
    },
  });

  const presetAmounts = ["25", "50", "100", "250", "500"];

  // Handle server action response
  useEffect(() => {
    if (!result) return;
    
    if (result.success) {
      toast.success(result.message, {
        description: result.donationId ? `Donation ID: ${result.donationId}` : undefined,
        duration: 5000,
      });
      form.reset();
      setSelectedAmount("50");
      setResult(null);
    } else if (isErrorResult(result)) {
      toast.error(result.error, {
        duration: 5000,
      });
      
      // Set field errors if provided
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, errors]) => {
          form.setError(field as keyof DonationFormValues, {
            type: "server",
            message: errors[0],
          });
        });
      }
      setResult(null);
    }
  }, [result, form]);

  const onSubmit = async (data: DonationFormValues) => {
    setIsPending(true);
    setResult(null);
    
    try {
      const formData = new FormData();
      formData.append("amount", data.amount);
      formData.append("frequency", data.frequency);
      formData.append("name", data.name);
      formData.append("email", data.email);
      
      const actionResult = await processDonation(formData);
      setResult(actionResult);
    } catch (_error) {
      setResult({
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    form.setValue("amount", amount, { shouldValidate: true });
  };

  const handleAmountChange = (value: string) => {
    setSelectedAmount(value);
    form.setValue("amount", value, { shouldValidate: true });
  };

  return (
    <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-taffy-50 via-mint-50/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-taffy-400 to-mint-400 flex items-center justify-center mb-4 shadow-lg shadow-taffy-400/25">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Make a <span className="bg-gradient-to-r from-taffy-500 to-mint-500 bg-clip-text text-transparent">Difference</span>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Card>
                    <CardContent className="p-8 space-y-8">
                      {/* Success Message */}
                      {result?.success && (
                        <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                              {result.message}
                            </p>
                            {result.donationId && (
                              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                Reference: {result.donationId}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Error Message */}
                      {result && isErrorResult(result) && result.error && !result.fieldErrors && (
                        <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium text-red-800 dark:text-red-200">
                            {result.error}
                          </p>
                        </div>
                      )}

                      {/* Frequency Selection */}
                      <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-semibold">Donation Frequency</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
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
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Amount Selection */}
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-semibold">Select Amount</FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-3">
                                  {presetAmounts.map((preset) => (
                                    <Button
                                      key={preset}
                                      type="button"
                                      variant={selectedAmount === preset ? "default" : "outline"}
                                      onClick={() => handleAmountSelect(preset)}
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
                                    {...field}
                                    onChange={(e) => handleAmountChange(e.target.value)}
                                    className="pl-7 h-12 text-lg"
                                    placeholder="Custom amount"
                                    min="1"
                                    max="100000"
                                    step="0.01"
                                  />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Personal Information */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">Your Information</Label>
                        <div className="grid gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="John Doe" className="mt-1" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder="john@example.com"
                                    className="mt-1"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Payment Button */}
                      <Button
                        type="submit"
                        disabled={isPending}
                        variant="gradient"
                        className="w-full h-14 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isPending ? (
                          <>
                            <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Proceed to Payment
                          </>
                        )}
                      </Button>

                      {/* Security Note */}
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4" />
                        <span>Secure & encrypted payment processing</span>
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </Form>

              {/* Impact Message */}
              <Card className="mt-6 bg-gradient-to-br from-mint-50 to-taffy-50/50 border-mint-200/50">
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-medium">
                    ${selectedAmount} {form.watch("frequency") === "monthly" ? "monthly" : ""} can provide:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li className="flex items-center justify-center gap-2"><span className="text-mint-500">✓</span> School supplies for 2 children</li>
                    <li className="flex items-center justify-center gap-2"><span className="text-taffy-500">✓</span> Weekly meals for 5 children</li>
                    <li className="flex items-center justify-center gap-2"><span className="text-mint-500">✓</span> Medical checkup for 1 child</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
  );
}
