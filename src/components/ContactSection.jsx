import React, { useState } from 'react';

export default function ContactSection() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const phone = '+91 6266977655';
  const email = 'rakeshsoni28073@gmail.com';

  const handleCopy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-28 z-10"
    >
      <div className="max-w-3xl w-full">
        <header className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
            NEPTUNE · 30.1 AU · DEEP SPACE DISPATCH
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading mb-4 tracking-tight font-heading">
            Contact
          </h2>

          <p className="text-sm md:text-base text-slate-300 font-light max-w-lg leading-relaxed">
            Available for software engineering opportunities, high-performance full-stack web applications, and immersive 3D WebGL architectures.
          </p>
        </header>

        {/* Contact Cosmic Glass Card */}
        <div className="cosmic-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6">
          {/* Quick Dispatch Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Card */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 transition-colors flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-1 font-medium">
                  MOBILE / WHATSAPP
                </span>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="text-base sm:text-lg font-mono text-slate-100 hover:text-emerald-300 transition-colors font-medium block"
                >
                  {phone}
                </a>
              </div>
              <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="text-[10px] font-mono text-slate-400 hover:text-white uppercase tracking-wider"
                >
                  Call / Dial
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(phone, setCopiedPhone)}
                  className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-emerald-500/20 text-[10px] font-mono text-slate-300 hover:text-emerald-300 border border-white/10 transition-colors uppercase tracking-widest"
                >
                  {copiedPhone ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/30 transition-colors flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 block mb-1 font-medium">
                  DIRECT TRANSMISSION (EMAIL)
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-sm sm:text-base font-mono text-slate-100 hover:text-cyan-300 transition-colors font-medium break-all block"
                >
                  {email}
                </a>
              </div>
              <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href={`mailto:${email}`}
                  className="text-[10px] font-mono text-slate-400 hover:text-white uppercase tracking-wider"
                >
                  Send Email
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(email, setCopiedEmail)}
                  className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-cyan-500/20 text-[10px] font-mono text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors uppercase tracking-widest"
                >
                  {copiedEmail ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>
            </div>
          </div>

          {/* Social Profiles Row */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-3 font-medium">
              VERIFIED ORBITAL PROFILES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/rakeshsoniiii/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-cyan-400/40 transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-xs">in/</span>
                  <span className="text-xs font-mono text-slate-300 group-hover:text-white transition-colors">
                    rakeshsoniiii
                  </span>
                </div>
                <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/rakeshsoniiii"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-emerald-400/40 transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono text-xs">gh/</span>
                  <span className="text-xs font-mono text-slate-300 group-hover:text-white transition-colors">
                    rakeshsoniiii
                  </span>
                </div>
                <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/rakeshsoniiii/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-pink-400/40 transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-pink-400 font-mono text-xs">ig/</span>
                  <span className="text-xs font-mono text-slate-300 group-hover:text-white transition-colors">
                    rakeshsoniiii
                  </span>
                </div>
                <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
