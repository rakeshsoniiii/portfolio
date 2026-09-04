import React from 'react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-28 z-10"
    >
      <div className="max-w-5xl w-full">
        <header className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
            THE MOON & MARS · RELAYED TRANSMISSION
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading tracking-tight font-heading">
            About
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Portrait Column — Balanced Box with Cosmic Glass Border */}
          <div className="lg:col-span-5">
            <div className="cosmic-panel rounded-2xl p-3 sm:p-4 border border-white/[0.08] shadow-2xl">
              <div className="relative overflow-hidden rounded-xl border border-white/10 group bg-black/40">
                <img
                  src="/images/rakesh.png"
                  alt="Rakesh Soni — Software Engineer & 3D WebGL Architect"
                  className="w-full h-auto object-cover brightness-[0.96] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-400 px-1 pt-3">
                <span className="text-cyan-300 font-medium">PILOT // RAKESH SONI</span>
                <span>DEV · CREATOR · ARCHITECT</span>
              </div>
            </div>
          </div>

          {/* Narrative & Telemetry Column — Frosted Cosmic Panel for 100% Readability */}
          <div className="lg:col-span-7">
            <div className="cosmic-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex flex-col justify-between">
              <div className="text-slate-300 text-sm md:text-base leading-[1.8] space-y-4 font-light mb-8">
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

              {/* Telemetry data table */}
              <div className="border-t border-white/[0.08] space-y-0 mb-8">
                {[
                  { label: 'DISCIPLINE', value: 'Full-Stack Software Engineering' },
                  { label: 'CORE STACK', value: 'React · Three.js · Node.js · TypeScript · Python' },
                  { label: 'LOCATION', value: 'India · UTC+5:30' },
                  { label: 'PHILOSOPHY', value: 'Clarity over clutter · Systems-level execution' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border-b border-white/[0.06] py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
                  >
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/80 w-28 flex-shrink-0 font-medium">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 font-light">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-emerald-300 hover:text-white transition-colors font-mono font-medium px-4 py-2 rounded-full border border-emerald-500/30 hover:border-emerald-400/60 bg-emerald-950/20"
                >
                  <span>Orbit to Featured Work</span>
                  <span>»</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
