import React from 'react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      {/* Constrained Left Column — Leaves Right 55% unobstructed for the Moon & Mars */}
      <div className="max-w-xl w-full">
        <header className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
            THE MOON & MARS · RELAYED TRANSMISSIONS
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading tracking-tight font-heading">
            About
          </h2>
        </header>

        {/* Compact Cosmic Glass Panel */}
        <div className="cosmic-panel cosmic-panel-hover rounded-2xl p-5 sm:p-6 border border-white/[0.08] shadow-2xl space-y-5">
          {/* Top Row: Compact Pilot Portrait + Identity Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-white/[0.08]">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-white/15 flex-shrink-0 bg-black/60 shadow-md">
              <img
                src="/images/rakesh.png"
                alt="Rakesh Soni"
                className="w-full h-full object-cover brightness-[0.96] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase block font-medium">
                PILOT // RAKESH SONI
              </span>
              <h3 className="text-lg sm:text-xl font-heading text-slate-100 font-medium">
                Full-Stack & 3D WebGL Architect
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Crafting high-speed web systems & embedded robotics
              </p>
            </div>
          </div>

          {/* Narrative description with editorial line-height */}
          <div className="text-slate-300 text-xs sm:text-sm leading-[1.8] space-y-3 font-light">
            <p>
              I view software through the lens of craftsmanship. Much like deep space exploration,
              great engineering is about precision, endurance, and stripping away unnecessary noise.
            </p>
            <p>
              Whether orchestrating complex interactive 3D WebGL scenes or constructing bulletproof
              backend APIs, I prioritize clean architecture, high framerates, and frictionless user journeys.
            </p>
          </div>

          {/* Telemetry data table */}
          <div className="border-t border-white/[0.08] pt-2 space-y-0 text-xs">
            {[
              { label: 'DISCIPLINE', value: 'Full-Stack Software Engineering' },
              { label: 'CORE STACK', value: 'React · Three.js · Node.js · TypeScript · Python' },
              { label: 'LOCATION', value: 'India · UTC+5:30' },
              { label: 'PHILOSOPHY', value: 'Clarity over clutter · Systems execution' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border-b border-white/[0.06] py-2.5 flex items-baseline justify-between gap-4"
              >
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/80 flex-shrink-0 font-medium">
                  {item.label}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-200 font-light text-right">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Link */}
          <div className="pt-2 flex items-center justify-between">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-300 hover:text-white transition-colors font-mono font-medium"
            >
              <span>ORBIT TO FEATURED WORK »</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
