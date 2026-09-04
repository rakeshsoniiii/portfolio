import React from 'react';

export default function FeaturedSection() {
  return (
    <section
      id="featured"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      {/* Constrained Left Column — Leaves Right 55% unobstructed for Jupiter & Galilean Moons */}
      <div className="max-w-xl w-full">
        <header className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
            THE CATALOGUE · JUPITER 5.20 AU
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading tracking-tight font-heading">
            Latest release
          </h2>
        </header>

        {/* Compact Featured Showcase Card inspired by arstraumur.music */}
        <article className="cosmic-panel cosmic-panel-hover rounded-2xl p-5 sm:p-6 border border-white/[0.08] shadow-2xl">
          {/* Top image box: compact 16:10 ratio, not giant */}
          <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl mb-5 border border-white/10 group bg-black/60 shadow-inner">
            <img
              src="/images/detective-l.jpg"
              alt="Detective-L Criminal Investigation Suite Interface"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
              <span className="bg-black/70 backdrop-blur-md border border-white/10 text-emerald-300 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md font-medium">
                FLAGSHIP AI
              </span>
              <span className="bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-cyan-400/90 uppercase tracking-widest mb-2 font-medium">
            <span>CYBER-NOIR</span>
            <span className="text-slate-500">·</span>
            <span>GROQ LLaMA-3.3</span>
            <span className="text-slate-500">·</span>
            <span>COLD CASE SUITE</span>
          </div>

          <h3 className="text-xl sm:text-2xl text-slate-100 font-heading mb-1.5 font-medium">
            Detective-L 🔍🩸
          </h3>

          <p className="text-xs font-mono text-slate-400 mb-3">
            Architected & Created by Rakesh Soni
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-5">
            Interactive cyber-noir criminal investigation system designed to crack complex unsolved cold cases.
            Features real-time suspect cross-examination via Groq's ultra-low-latency LLaMA-3.3 model,
            an interactive red-string pinboard, and an OSINT intelligence lab.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-2 mb-6 text-[10px] font-mono text-slate-300">
            <span className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">◈ Suspect Interrogation</span>
            <span className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">◈ Red-String Pinboard</span>
            <span className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">◈ OSINT Intel Lab</span>
            <span className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">◈ Grand Jury Chamber</span>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
            <a
              href="https://detective-l.antideploy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-300 hover:text-white transition-colors font-mono font-medium"
            >
              <span>ENTER THE WORK »</span>
            </a>
            <a
              href="#achievements"
              className="text-xs uppercase tracking-[0.22em] text-slate-400 hover:text-amber-300 transition-colors font-mono"
            >
              AWARDS & HONORS »
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
