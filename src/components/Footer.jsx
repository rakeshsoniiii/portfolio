import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/60 bg-surface/80 backdrop-blur-md py-8 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-faint">
      <div>
        © 2026 Rakesh Soni · All planetary systems nominal.
      </div>
      <div className="flex items-center gap-6 uppercase tracking-wider">
        <a
          href="https://github.com/rakeshsoniiii"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/rakeshsoniiii/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/rakeshsoniiii/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
