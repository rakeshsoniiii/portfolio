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
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-faint mb-3 font-mono">
          NEPTUNE · 30.1 AU · TRANSMISSIONS
        </p>

        <h2 className="text-4xl md:text-6xl text-ink-solid mb-6 tracking-tight font-heading">
          Contact
        </h2>

        <p className="text-sm text-ink-dim leading-relaxed font-light mb-10 max-w-lg">
          Available for software engineering opportunities, AI architectures, and immersive 3D web applications.
        </p>

        {/* Individual Contact Rows — no cards */}
        <div className="border-t border-line/50 space-y-0 mb-10">
          {/* Phone */}
          <div className="border-b border-line/30 py-5 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-ink-faint block mb-1">
                MOBILE / WHATSAPP
              </span>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="text-lg md:text-xl font-mono text-ink-solid hover:text-accent transition-colors"
              >
                {phone}
              </a>
            </div>
            <button
              onClick={() => handleCopy(phone, setCopiedPhone)}
              className="text-[10px] font-mono text-ink-faint hover:text-accent transition-colors uppercase tracking-widest"
            >
              {copiedPhone ? 'COPIED ✓' : 'COPY'}
            </button>
          </div>

          {/* Email */}
          <div className="border-b border-line/30 py-5 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-ink-faint block mb-1">
                EMAIL
              </span>
              <a
                href={`mailto:${email}`}
                className="text-base md:text-lg font-mono text-ink-solid hover:text-accent transition-colors"
              >
                {email}
              </a>
            </div>
            <button
              onClick={() => handleCopy(email, setCopiedEmail)}
              className="text-[10px] font-mono text-ink-faint hover:text-accent transition-colors uppercase tracking-widest"
            >
              {copiedEmail ? 'COPIED ✓' : 'COPY'}
            </button>
          </div>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rakeshsoniiii/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-line/30 py-4 flex items-center justify-between gap-4 group"
          >
            <span className="text-sm font-mono text-ink-dim group-hover:text-accent transition-colors">
              LinkedIn /rakeshsoniiii
            </span>
            <svg className="w-3.5 h-3.5 text-ink-faint group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/rakeshsoniiii"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-line/30 py-4 flex items-center justify-between gap-4 group"
          >
            <span className="text-sm font-mono text-ink-dim group-hover:text-accent transition-colors">
              GitHub /rakeshsoniiii
            </span>
            <svg className="w-3.5 h-3.5 text-ink-faint group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/rakeshsoniiii/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-line/30 py-4 flex items-center justify-between gap-4 group"
          >
            <span className="text-sm font-mono text-ink-dim group-hover:text-accent transition-colors">
              Instagram /rakeshsoniiii
            </span>
            <svg className="w-3.5 h-3.5 text-ink-faint group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
