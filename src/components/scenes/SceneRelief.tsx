import Image from "next/image";
import childRelief from "@/assets/child-2.jpg";

export default function SceneRelief() {
  return (
    <section id="relief" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid min-h-screen max-w-5xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Scene 5 — Relief
          </p>
          <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
            Morning arrives. The bowl is not empty.
          </h2>
          <div className="mt-6 space-y-4 text-base text-foreground/75">
            <p>She eats. She walks. The uniform is on.</p>
            <p>The classroom door opens. Her name is called.</p>
            <p>A day continues because a decision did.</p>
          </div>
        </div>
        <div className="relative h-80 overflow-hidden rounded-3xl shadow-lg md:h-[420px]">
          <Image
            src={childRelief}
            alt="Child in morning light"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
