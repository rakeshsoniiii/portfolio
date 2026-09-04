import React, { useState, useEffect } from 'react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'featured', 'achievements', 'projects', 'contact', 'solarsystem'];
      const scrollPos = window.scrollY + 250;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'EARTH' },
    { id: 'about', label: 'ABOUT' },
    { id: 'featured', label: 'FEATURED' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 px-6 md:px-12 flex items-center justify-between bg-surface/50 backdrop-blur-lg border-b border-line/50">
      {/* Signature Logo Image with Fallback */}
      <a href="#hero" className="flex items-center gap-3 group">
        <img
          src="/images/rakesh-signature.png"
          alt="Rakesh Soni Signature"
          className="h-10 md:h-12 w-auto filter invert brightness-200 mix-blend-screen opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all select-none"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <span className="font-heading text-lg md:text-xl text-ink-solid group-hover:text-accent transition-colors tracking-wide hidden sm:inline">
          Rakesh Soni
        </span>
      </a>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-7 text-[11px] font-mono tracking-[0.2em] uppercase">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`py-1 relative transition-colors ${
                  isActive ? 'text-accent' : 'text-ink-dim hover:text-accent'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transition-all" />
                )}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Mobile Hamburger Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex flex-col justify-center gap-1.5 p-2 text-ink"
        aria-label="Toggle Navigation"
      >
        <span
          className={`w-6 h-[1.5px] bg-ink transition-transform ${
            mobileOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`w-6 h-[1.5px] bg-ink transition-opacity ${
            mobileOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`w-6 h-[1.5px] bg-ink transition-transform ${
            mobileOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-line p-6 flex flex-col gap-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              className={`text-xs font-mono tracking-widest uppercase py-2 ${
                activeSection === item.id ? 'text-accent' : 'text-ink-dim'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
