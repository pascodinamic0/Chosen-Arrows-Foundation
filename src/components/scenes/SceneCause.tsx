import Image from "next/image";
import childCause from "@/assets/child-1.jpg";

export default function SceneCause() {
  return (
    <section id="cause" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid min-h-screen max-w-5xl items-center gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Scene 2 — Cause
          </p>
          <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
            This moment exists because the safety net has gaps.
          </h2>
          <div className="mt-8 grid gap-6 text-base leading-relaxed text-foreground/80">
            <p>
              Children's homes in under-resourced communities rely on external funding.
              When donations pause, basic needs—food, school fees, uniforms—pause with them.
            </p>
            <p>
              Grace lives in one of these homes. The staff care deeply. The funding is inconsistent.
              She stays home when fees aren't met. Not by choice. By circumstance.
            </p>
          </div>
        </div>
        <div className="relative h-80 overflow-hidden rounded-3xl shadow-lg md:h-[420px]">
          <Image
            src={childCause}
            alt="Child waiting in daylight"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}
