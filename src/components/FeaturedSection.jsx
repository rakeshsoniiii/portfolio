import React from 'react';

export default function FeaturedSection() {
  return (
    <section
      id="featured"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-28 z-10"
    >
      <div className="max-w-4xl w-full">
        <header className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
            JUPITER · 5.20 AU · STANDOUT TRANSMISSION
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading tracking-tight font-heading">
            Detective-L 🔍🩸
          </h2>
        </header>

        {/* Balanced Featured Showcase Card */}
        <article className="cosmic-panel cosmic-panel-hover rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl">
          {/* Balanced Featured Image Box */}
          <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden rounded-xl mb-6 border border-white/10 group bg-black/50 shadow-inner">
            <img
              src="/images/detective-l.jpg"
              alt="Detective-L Criminal Investigation Suite Interface"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="bg-black/70 backdrop-blur-md border border-white/10 text-emerald-300 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md font-medium">
                FLAGSHIP AI ARCHITECTURE
              </span>
              <span className="bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE PRODUCTION
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-cyan-400/90 uppercase tracking-widest mb-3 font-medium">
            <span>CYBER-NOIR</span>
            <span className="text-slate-500">·</span>
            <span>GROQ LLaMA-3.3</span>
            <span className="text-slate-500">·</span>
            <span>COLD CASE SUITE</span>
          </div>

          <h3 className="text-xl sm:text-2xl text-slate-100 font-heading mb-2 font-medium">
            AI-Powered Murder Mystery & Cold Case Investigation Suite
          </h3>

          <p className="text-xs font-mono text-slate-400 mb-4">
            Architected & Created by Rakesh Soni
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6 max-w-2xl">
            Detective-L is an advanced interactive cyber-noir criminal investigation system designed
            to crack complex unsolved cold cases and locked-room murder mysteries. Features real-time
            suspect cross-examination powered by Groq's ultra-low-latency LLaMA-3.3 model, an interactive
            red-string pinboard, an OSINT cyber intelligence lab, and a grand jury verdict chamber.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 text-[11px] font-mono text-slate-300">
            <span className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">◈ Suspect Interrogation</span>
            <span className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">◈ Red-String Pinboard</span>
            <span className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">◈ OSINT Intel Lab</span>
            <span className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">◈ Grand Jury Chamber</span>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
            <a
              href="https://detective-l.antideploy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-wider transition-all duration-200 font-medium"
            >
              <span>Launch Detective-L Live</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a
              href="#achievements"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 text-xs font-mono uppercase tracking-wider transition-all duration-200"
            >
              <span>Transit to Achievements »</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
