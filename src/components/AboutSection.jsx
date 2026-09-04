import React from 'react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-faint mb-3 font-mono">
          THE MOON & MARS · RELAYED TRANSMISSION
        </p>

        <h2 className="text-4xl md:text-6xl text-ink-solid mb-8 tracking-tight font-heading">
          About
        </h2>

        <div className="text-ink-dim text-sm md:text-base leading-[1.8] space-y-5 font-light mb-10">
          <p>
            I am a developer who views software through the lens of craftsmanship.
            Much like deep space exploration, great engineering is about precision,
            endurance, and stripping away unnecessary noise.
          </p>
          <p>
            Whether orchestrating complex interactive 3D WebGL scenes or constructing
            bulletproof backend APIs, I prioritize clean architecture, high framerates,
            and frictionless user journeys.
          </p>
        </div>

        {/* Minimal telemetry data — individual rows, no cards */}
        <div className="border-t border-line/50 space-y-0 mb-10">
          {[
            { label: 'DISCIPLINE', value: 'Full-Stack Software Engineering' },
            { label: 'CORE STACK', value: 'React · Node.js · TypeScript · Three.js · Python' },
            { label: 'LOCATION', value: 'India · UTC+5:30' },
            { label: 'PHILOSOPHY', value: 'Clarity over clutter · Systems-level execution' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border-b border-line/30 py-3 flex items-baseline gap-6"
            >
              <span className="text-[10px] uppercase font-mono tracking-widest text-ink-faint w-28 flex-shrink-0">
                {item.label}
              </span>
              <span className="text-sm text-ink-solid font-light">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#featured"
          className="text-[11px] uppercase tracking-[0.22em] text-accent hover:text-ink-solid transition-colors font-mono"
        >
          ORBIT TO FEATURED WORK »
        </a>
      </div>
    </section>
  );
}
