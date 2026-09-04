import React from 'react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="max-w-xl">
        {/* Location Metadata — exact match with reference format */}
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-faint mb-4 font-mono">
          EARTH · INDIA · 28.6139° N, 77.2090° E
        </p>

        {/* Cursive Signature Centerpiece — exact match with arstraumur title style */}
        <div className="relative mb-6">
          <img
            src="/images/rakesh-signature.png"
            alt="Rakesh Soni"
            className="h-32 sm:h-44 md:h-52 lg:h-60 w-auto object-contain filter invert brightness-200 contrast-125 mix-blend-screen select-none pointer-events-none -ml-4"
          />
          <h1 className="sr-only">Rakesh Soni</h1>
        </div>

        {/* Subtitle description — editorial line-height */}
        <p className="text-sm sm:text-base text-ink-dim font-light leading-[1.8] max-w-md mb-10">
          Full-stack software architecture & embedded systems engineering.
          Building high-performance systems from autonomous robotics to 3D WebGL.
        </p>

        {/* Minimal CTA links */}
        <div className="flex flex-wrap items-center gap-7">
          <a
            href="#featured"
            className="text-[11px] uppercase tracking-[0.22em] text-accent hover:text-ink-solid transition-colors font-mono"
          >
            ENTER THE CATALOGUE »
          </a>
          <a
            href="#achievements"
            className="text-[11px] uppercase tracking-[0.22em] text-ink-dim hover:text-accent transition-colors font-mono"
          >
            AWARDS & HONORS »
          </a>
          <a
            href="#projects"
            className="text-[11px] uppercase tracking-[0.22em] text-ink-dim hover:text-accent transition-colors font-mono"
          >
            ALL 11 WORKS »
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-faint animate-bounce pointer-events-none">
        <span className="text-[9px] tracking-[0.3em] uppercase font-mono">
          Scroll to orbit through planets
        </span>
        <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
