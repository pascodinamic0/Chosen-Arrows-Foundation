"use client";

/**
 * SceneAccountability
 * Inserted after SceneChoice, before SceneRelief.
 * Shows real-time funding progress for the featured child.
 * Inspired by Komarek Foundation's transparent funding cards.
 */

export default function SceneAccountability() {
  // In production, fetch from Supabase campaigns table
  const campaign = {
    childName: "Grace",
    raised: 3240,
    goal: 6000,
    donors: 52,
  };

  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <section
      id="accountability"
      className="relative min-h-screen flex items-center justify-center bg-background py-20 px-4"
    >
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Scene 4.5 — Accountability
          </p>
          <h2 className="text-3xl md:text-4xl font-light leading-tight">
            Every decision is tracked.
            <br />
            Every cent is accounted for.
          </h2>
        </div>

        {/* Progress Card */}
        <div className="border border-border/60 bg-card p-8 space-y-6">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {campaign.childName}'s Fund
              </p>
              <p className="text-4xl font-light tabular-nums">
                ${campaign.raised.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Goal</p>
              <p className="text-2xl font-light tabular-nums text-muted-foreground">
                ${campaign.goal.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.round(progress)}% funded</span>
              <span>{campaign.donors} decisions made</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed pt-4 border-t border-border/40">
            Funds go directly to the children's home. School receipts and monthly visit reports
            are posted to her profile. 100% goes to the child. No administrative fees.
          </p>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Recent decisions
          </h3>
          <div className="space-y-3 text-sm">
            {[
              { time: "12 minutes ago", amount: 120, location: "Toronto" },
              { time: "1 hour ago", amount: 50, location: "London" },
              { time: "3 hours ago", amount: 250, location: "Nairobi" },
            ].map((decision, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-muted-foreground border-l-2 border-foreground/20 pl-3 py-1"
              >
                <span>{decision.location}</span>
                <span className="tabular-nums">${decision.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
