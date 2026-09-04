import React from 'react';

export default function FeaturedSection() {
  return (
    <section
      id="featured"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-faint mb-3 font-mono">
          JUPITER · 5.20 AU · STANDOUT TRANSMISSION
        </p>

        <h2 className="text-4xl md:text-6xl text-ink-solid mb-8 tracking-tight font-heading">
          Detective-L 🔍🩸
        </h2>

        {/* Featured Image — clean, no box border */}
        <div className="relative w-full max-w-2xl overflow-hidden rounded-lg mb-8 group">
          <img
            src="/images/detective-l.jpg"
            alt="Detective-L Criminal Investigation Suite"
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-ink-faint uppercase tracking-widest mb-5">
          <span className="text-accent">CYBER-NOIR</span>
          <span>·</span>
          <span>GROQ LLaMA-3.3</span>
          <span>·</span>
          <span>COLD CASE SUITE</span>
        </div>

        <h3 className="text-lg md:text-xl text-ink-solid font-heading mb-3">
          An AI-Powered Murder Mystery & Cold Case Investigation Suite
        </h3>

        <p className="text-xs font-mono text-ink-faint mb-4">
          Architected & Created by Rakesh Soni
        </p>

        <p className="text-sm text-ink-dim leading-relaxed font-light mb-6 max-w-2xl">
          Detective-L is an advanced interactive cyber-noir criminal investigation system designed
          to crack complex unsolved cold cases and locked-room murder mysteries. Features real-time
          suspect cross-examination powered by Groq's high-speed LLaMA-3.3 model, an interactive
          red-string pinboard, an OSINT cyber intelligence lab, and a grand jury verdict chamber.
        </p>

        {/* Feature Highlights — minimal inline list */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-mono text-ink-dim mb-8">
          <span>◈ Suspect Interrogation</span>
          <span>◈ Red-String Pinboard</span>
          <span>◈ OSINT Intel Lab</span>
          <span>◈ Grand Jury Chamber</span>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://detective-l.antideploy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.22em] text-accent hover:text-ink-solid transition-colors font-mono"
          >
            LAUNCH DETECTIVE-L »
          </a>
          <a
            href="#achievements"
            className="text-[11px] uppercase tracking-[0.22em] text-ink-dim hover:text-accent transition-colors font-mono"
          >
            TRANSIT TO ACHIEVEMENTS »
          </a>
        </div>
      </div>
    </section>
  );
}
