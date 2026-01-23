# Payment System Implementation PRD

> **Priority**: CRITICAL  
> **Status**: Not Started  
> **Last Updated**: January 23, 2026

## Context

The Chosen Arrows Foundation donation page currently has a **mock payment system** that does not process real transactions. The UI and validation are complete, but the actual payment processing is simulated with fake delays and random success/failure responses.

**Current state**: Donors fill out the form, see a "success" message, but no money is collected.

---

## Objective

Implement a production-ready Stripe payment integration that:
1. Processes real donations securely
2. Supports one-time and recurring (monthly) donations
3. Complies with PCI DSS standards
4. Provides proper confirmation and receipt handling

---

## Technical Requirements

### 1. Install Dependencies

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

### 2. Environment Variables

Add to `.env.local` (get keys from Stripe Dashboard):

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

Update `env.example` with placeholders (no real keys):

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### 3. Files to Create

#### `lib/stripe.ts` - Stripe client initialization

```typescript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia', // Use latest stable API version
  typescript: true,
});
```

#### `app/api/create-checkout-session/route.ts` - Checkout session API

Create a Next.js API route that:
- Accepts POST requests with `{ amount, frequency, donorName, donorEmail }`
- Creates a Stripe Checkout Session
- For `frequency: "once"` → use `mode: 'payment'`
- For `frequency: "monthly"` → use `mode: 'subscription'`
- Returns the session ID or checkout URL

#### `app/api/webhooks/stripe/route.ts` - Webhook handler

Create a webhook handler that:
- Verifies Stripe signature using `STRIPE_WEBHOOK_SECRET`
- Handles these events:
  - `checkout.session.completed` → Record successful donation
  - `invoice.payment_succeeded` → Record recurring payment
  - `customer.subscription.deleted` → Handle subscription cancellation
- Stores donation records in Supabase

#### `app/donate/success/page.tsx` - Success page

Create a success page that:
- Shows confirmation message
- Displays donation details (amount, type)
- Shows donation ID/reference
- Provides option to download receipt

#### `app/donate/cancel/page.tsx` - Cancel page

Create a cancel page that:
- Shows friendly message about cancelled donation
- Provides option to try again
- Links back to donate page

### 4. Files to Modify

#### `app/donate/DonateClient.tsx`

Replace mock form submission with Stripe Checkout:

```typescript
// Replace the current onSubmit function
const onSubmit = async (data: DonationFormValues) => {
  setIsPending(true);
  
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: parseFloat(data.amount),
        frequency: data.frequency,
        donorName: data.name,
        donorEmail: data.email,
      }),
    });
    
    const { url } = await response.json();
    
    if (url) {
      window.location.href = url; // Redirect to Stripe Checkout
    }
  } catch (error) {
    toast.error('Failed to initiate payment. Please try again.');
  } finally {
    setIsPending(false);
  }
};
```

#### `app/donate/actions.ts`

Either:
- **Option A**: Remove this file entirely (if using API routes)
- **Option B**: Convert to call the Stripe API instead of mock logic

Remove the mock simulation code:
```typescript
// DELETE THIS:
await new Promise((resolve) => setTimeout(resolve, 1500));
if (Math.random() < 0.1) { ... }
```

### 5. Database Schema Addition

Add a `donations` table to track all donations. Create migration file:

#### `supabase/migrations/002_donations_table.sql`

```sql
-- Donations table
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id VARCHAR(255) UNIQUE,
  stripe_payment_intent_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  frequency VARCHAR(20) NOT NULL, -- 'once' or 'monthly'
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  campaign_id UUID REFERENCES campaigns(id),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_donations_email ON donations(donor_email);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_stripe_session ON donations(stripe_session_id);

-- RLS policies
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Admins can view all donations
CREATE POLICY "Admins can view donations"
  ON donations FOR SELECT
  USING (is_admin_user());

-- Service role can insert (for webhooks)
CREATE POLICY "Service role can insert donations"
  ON donations FOR INSERT
  WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## Implementation Steps

### Step 1: Setup (Do First)
- [ ] Install Stripe packages
- [ ] Add environment variables to `.env.local`
- [ ] Update `env.example` with placeholders
- [ ] Create `lib/stripe.ts`

### Step 2: API Routes
- [ ] Create `/api/create-checkout-session/route.ts`
- [ ] Create `/api/webhooks/stripe/route.ts`
- [ ] Test checkout session creation locally

### Step 3: Database
- [ ] Create `002_donations_table.sql` migration
- [ ] Run migration in Supabase

### Step 4: Frontend Updates
- [ ] Modify `DonateClient.tsx` to use Stripe Checkout
- [ ] Create success page at `/donate/success`
- [ ] Create cancel page at `/donate/cancel`
- [ ] Remove or update `actions.ts`

### Step 5: Webhook Setup
- [ ] Set up Stripe webhook endpoint in Stripe Dashboard
- [ ] Point to `https://[your-domain]/api/webhooks/stripe`
- [ ] Configure events: `checkout.session.completed`, `invoice.payment_succeeded`

### Step 6: Testing
- [ ] Test one-time donation flow
- [ ] Test monthly subscription flow
- [ ] Test webhook handling
- [ ] Test error scenarios

---

## Security Checklist

- [ ] Never log or store full card numbers
- [ ] Use Stripe Checkout (hosted) - card data never touches our servers
- [ ] Verify webhook signatures before processing
- [ ] Use HTTPS only in production
- [ ] Validate all input amounts server-side
- [ ] Set minimum ($1) and maximum ($100,000) donation limits

---

## Stripe Configuration Notes

### For Nonprofits
Stripe offers discounted rates for verified nonprofits. Apply at:
https://stripe.com/docs/nonprofit

### Product Setup in Stripe Dashboard
For recurring donations, you may want to create Products in Stripe:
- "Monthly Donation - Custom Amount" (usage-based pricing)

Or use dynamic pricing with `price_data` in the checkout session.

### Checkout Session Options

```typescript
// One-time donation
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'One-time Donation to Chosen Arrows Foundation',
      },
      unit_amount: amount * 100, // Stripe uses cents
    },
    quantity: 1,
  }],
  customer_email: donorEmail,
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/cancel`,
  metadata: {
    donor_name: donorName,
    frequency: 'once',
  },
});

// Monthly recurring donation
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Monthly Donation to Chosen Arrows Foundation',
      },
      unit_amount: amount * 100,
      recurring: {
        interval: 'month',
      },
    },
    quantity: 1,
  }],
  customer_email: donorEmail,
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/cancel`,
  metadata: {
    donor_name: donorName,
    frequency: 'monthly',
  },
});
```

---

## Expected Behavior After Implementation

### User Flow
1. User fills out donation form (amount, frequency, name, email)
2. User clicks "Proceed to Payment"
3. User is redirected to Stripe Checkout (hosted payment page)
4. User enters card details on Stripe's secure page
5. On success → Redirected to `/donate/success`
6. On cancel → Redirected to `/donate/cancel`
7. Webhook fires → Donation recorded in database

### Admin Flow
1. Admin can view donations in admin panel
2. All donations are logged with Stripe references
3. Recurring donations are tracked separately

---

## Out of Scope (Future Enhancements)

- Campaign-specific donations (linking donation to specific campaign)
- Donation receipts via email (use Stripe's built-in receipts initially)
- Donor portal for managing recurring donations
- Multiple currency support
- PayPal as alternative payment method
- Apple Pay / Google Pay (can be enabled in Stripe Dashboard)

---

## Questions for Stakeholder

1. Do you have a Stripe account? If not, create one at https://stripe.com
2. Should we apply for Stripe nonprofit rates?
3. Do you need campaign-specific donation tracking now or later?
4. Any specific branding requirements for the Stripe Checkout page?

---

## Resources

- [Stripe Checkout Quickstart](https://stripe.com/docs/checkout/quickstart)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Next.js + Stripe Example](https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript)
- [Stripe API Reference](https://stripe.com/docs/api)
