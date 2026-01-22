import { Button } from "@/components/ui/button";

const choices = [
  {
    amount: "$50",
    headline: "Cover her school fees this term.",
    detail: "One term of primary education.",
  },
  {
    amount: "$120",
    headline: "Provide meals and supplies for the term.",
    detail: "Breakfast, lunch, uniforms, books, and hygiene items.",
  },
  {
    amount: "$250",
    headline: "Secure her year with mentorship.",
    detail: "Full-year support: fees, meals, supplies, and monthly visits.",
  },
];

export default function SceneChoice() {
  return (
    <section id="choice" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Scene 4 — Choice
        </p>
        <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
          This is not a payment. It is a decision.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-foreground/75">
          Choose the outcome you want to be true for Grace tomorrow.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {choices.map((choice) => (
            <div
              key={choice.amount}
              className="flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-muted/20 p-6 shadow-sm"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {choice.amount}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{choice.headline}</h3>
                <p className="mt-3 text-sm text-foreground/75">{choice.detail}</p>
              </div>
              <Button className="mt-6 w-full" type="button">
                Choose {choice.amount}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
