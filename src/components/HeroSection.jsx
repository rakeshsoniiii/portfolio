import React from 'react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-24 pt-28 z-10"
    >
      {/* Large Signature — upper left like arstraumur */}
      <div className="absolute top-20 md:top-28 left-6 md:left-16 lg:left-24">
        <img
          src="/images/rakesh-signature.png"
          alt="Rakesh Soni Signature"
          className="h-20 sm:h-28 md:h-36 lg:h-44 w-auto invert opacity-90 brightness-150 drop-shadow-lg"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Bottom-left minimal info — no box, no panel */}
      <div className="max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-faint mb-6 font-mono">
          EARTH · INDIA · 28.6139° N, 77.2090° E
        </p>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal text-ink-solid mb-5 tracking-tight font-heading leading-[0.95]">
          Rakesh Soni
        </h1>

        <p className="text-sm sm:text-base text-ink-dim font-light leading-relaxed max-w-md mb-8">
          Full-stack software architecture & embedded systems engineering.
          Building high-performance systems from autonomous robotics to 3D WebGL.
        </p>

        {/* Minimal CTA links — no box border */}
        <div className="flex flex-wrap items-center gap-8">
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-faint animate-bounce pointer-events-none">
        <span className="text-[9px] tracking-[0.3em] uppercase font-mono">Scroll to orbit through planets</span>
        <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
