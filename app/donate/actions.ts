"use server";

import { z } from "zod";

// Validation schema for donation form
const donationSchema = z.object({
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

export type DonationFormData = z.infer<typeof donationSchema>;

export type DonationActionResult = 
  | { success: true; message: string; donationId?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Server Action to process donation
 * In a real application, this would integrate with a payment processor
 */
export async function processDonation(
  formData: FormData
): Promise<DonationActionResult> {
  try {
    // Extract form data
    const rawData = {
      amount: formData.get("amount") as string,
      frequency: formData.get("frequency") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    };

    // Validate input
    const validationResult = donationSchema.safeParse(rawData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      
      validationResult.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(error.message);
      });

      return {
        success: false,
        error: "Please correct the errors in the form",
        fieldErrors,
      };
    }

    const validatedData = validationResult.data;
    const amount = parseFloat(validatedData.amount);

    // Simulate payment processing
    // In a real app, this would call a payment API (Stripe, PayPal, etc.)
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

    // Simulate potential payment failures (10% chance for demo)
    if (Math.random() < 0.1) {
      return {
        success: false,
        error: "Payment processing failed. Please try again or contact support if the issue persists.",
      };
    }

    // Generate a mock donation ID
    const donationId = `DON-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // In a real application, you would:
    // 1. Create a donation record in the database
    // 2. Process payment through payment gateway
    // 3. Send confirmation email
    // 4. Update campaign totals if applicable

    const frequencyText = validatedData.frequency === "monthly" ? "monthly" : "one-time";
    
    return {
      success: true,
      message: `Thank you, ${validatedData.name}! Your ${frequencyText} donation of $${amount.toFixed(2)} has been processed successfully.`,
      donationId,
    };
  } catch (error) {
    console.error("Donation processing error:", error);
    
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later or contact support.",
    };
  }
}
