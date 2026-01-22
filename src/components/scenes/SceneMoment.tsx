import Image from "next/image";
import heroBackground from "@/assets/hero-background.jpg";
import logo from "@/assets/logo.jpg";

export default function SceneMoment() {
  return (
    <section id="moment" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <Image
          src={heroBackground}
          alt="Child in low light"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex items-center gap-3 text-white/80">
            <Image
              src={logo}
              alt="Chosen Arrows Foundation"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-sm tracking-widest uppercase">Scene 1 — Moment</span>
          </div>

          <div className="mt-10 max-w-2xl text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">
              9:14 PM · Children's Home, Nairobi
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Grace is awake.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              The bowl is empty. The uniform waits. Tomorrow's school fees remain unpaid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
