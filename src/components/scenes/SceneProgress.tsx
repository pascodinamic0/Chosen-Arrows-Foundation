"use client";

import { useEffect, useMemo, useState } from "react";

type SceneMeta = {
  id: string;
  label: string;
};

export default function SceneProgress() {
  const scenes = useMemo<SceneMeta[]>(
    () => [
      { id: "moment", label: "Moment" },
      { id: "cause", label: "Cause" },
      { id: "mirror", label: "Mirror" },
      { id: "choice", label: "Choice" },
      { id: "relief", label: "Relief" },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = scenes
      .map((scene) => document.getElementById(scene.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = elements.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActiveIndex(index);
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0.4 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scenes]);

  return (
    <nav
      aria-label="Story progress"
      className="fixed right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex"
    >
      <div className="relative flex flex-col gap-3">
        <span className="absolute left-0 top-0 h-full w-px bg-border/40" />
        <span
          className="absolute left-0 top-0 w-px bg-foreground/60 transition-all duration-300"
          style={{ height: `${progress * 100}%` }}
        />
        {scenes.map((scene, index) => {
          const isActive = index === activeIndex;
          return (
            <a
              key={scene.id}
              href={`#${scene.id}`}
              className="relative flex items-center transition-opacity"
              aria-label={scene.label}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-foreground scale-125"
                    : "bg-foreground/30 scale-100 hover:bg-foreground/50"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
