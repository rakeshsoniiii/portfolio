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
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      {/* Constrained Left Column — Leaves Right 55% unobstructed for Neptune and Deep Space */}
      <div className="max-w-xl w-full">
        <header className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
            NEPTUNE · 30.1 AU · DEEP SPACE DISPATCH
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading mb-3 tracking-tight font-heading">
            Contact
          </h2>

          <p className="text-sm text-slate-300/90 font-light max-w-lg leading-relaxed">
            Available for software engineering opportunities, high-performance full-stack web applications, and immersive 3D WebGL architectures.
          </p>
        </header>

        {/* Contact Cosmic Glass Card */}
        <div className="cosmic-panel cosmic-panel-hover rounded-2xl p-5 sm:p-6 border border-white/[0.08] shadow-2xl space-y-4">
          {/* Phone Card */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 transition-colors flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-1 font-medium">
                MOBILE / WHATSAPP
              </span>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="text-base font-mono text-slate-100 hover:text-emerald-300 transition-colors font-medium block"
              >
                {phone}
              </a>
            </div>
            <div className="pt-2.5 mt-2.5 border-t border-white/[0.06] flex items-center justify-between">
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
            <div className="pt-2.5 mt-2.5 border-t border-white/[0.06] flex items-center justify-between">
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

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
            {[
              { label: 'GITHUB', url: 'https://github.com/rakeshsoniiii', sub: '@rakeshsoniiii' },
              { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/rakesh-soni-66b962323/', sub: 'in/rakesh-soni' },
              { label: 'INSTAGRAM', url: 'https://www.instagram.com/rakesh_soni_16/', sub: '@rakesh_soni_16' },
              { label: 'LOCATION', url: '#hero', sub: 'Earth · India' },
            ].map((soc, sIdx) => (
              <a
                key={sIdx}
                href={soc.url}
                target={soc.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all group"
              >
                <span className="text-[9px] font-mono text-slate-400 group-hover:text-cyan-300 block tracking-wider uppercase">
                  {soc.label}
                </span>
                <span className="text-xs font-mono text-slate-200 truncate block">
                  {soc.sub}
                </span>
              </a>
            ))}
          </div>

          <div className="pt-3">
            <p className="text-[11px] font-mono text-slate-400 text-center">
              All communications acknowledged within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
