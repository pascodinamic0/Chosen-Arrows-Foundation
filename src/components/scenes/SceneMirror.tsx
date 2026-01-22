export default function SceneMirror() {
  return (
    <section id="mirror" className="min-h-screen bg-muted/30 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Scene 3 — Mirror
        </p>
        <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
          Your morning and hers run in parallel.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Your morning</h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground/75">
              <li>Alarm. Warm shower. Coffee on the counter.</li>
              <li>Keys. Phone. A door that opens to the day.</li>
              <li>Plans that wait for you.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Grace's morning</h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground/75">
              <li>Dawn. Shared water tap. Empty bowl on the mat.</li>
              <li>Uniform ironed, but no school fees receipt.</li>
              <li>The classroom waits. The debt does not.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
