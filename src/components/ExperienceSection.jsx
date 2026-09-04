import React from 'react';

export default function ExperienceSection() {
  const experiences = [
    { year: '2025', title: 'Senior Full-Stack Engineer — Freelance / Systems', type: 'CURRENT' },
    { year: '2025', title: 'Interactive 3D WebGL Web Apps & Creative Dev', type: 'CLIENT' },
    { year: '2024', title: 'Frontend Systems Architect — High Growth Tech', type: 'CONTRACT' },
    { year: '2024', title: 'Real-Time Telemetry & Monitoring Dashboard Suite', type: 'PROJECT' },
    { year: '2023', title: 'Microservices & Distributed REST / GraphQL APIs', type: 'PROJECT' },
    { year: '2023', title: 'Full-Stack SaaS Platform Architecture', type: 'ENTERPRISE' },
    { year: '2022', title: 'Software Developer — Digital Product Studio', type: 'ROLE' },
    { year: '2021', title: 'Computer Science & Software Systems Foundation', type: 'EDUCATION' },
  ];

  return (
    <section
      id="experience"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 z-10 border-t border-line/40"
    >
      <div className="max-w-2xl scrim-panel p-6 md:p-10 rounded-xl border border-line/40">
        <p className="text-xs uppercase tracking-[0.24em] text-ink-faint mb-3 font-mono">
          SATURN · 9.6 AU · YEAR RINGS
        </p>
        <h2 className="text-3xl md:text-4xl text-ink-solid mb-8 tracking-tight">
          Experience & Milestones
        </h2>

        {/* Experience Table matching Discography list style */}
        <div className="divide-y divide-line/60 border-t border-b border-line/60 mb-8 font-mono">
          {experiences.map((item, idx) => (
            <div
              key={idx}
              className="py-3.5 flex items-center justify-between text-xs md:text-sm hover:bg-accent/5 px-2 -mx-2 rounded transition-colors group cursor-default"
            >
              <span className="text-ink-faint w-14 font-mono">{item.year}</span>
              <span className="font-heading text-ink-solid text-sm md:text-base group-hover:text-accent transition-colors flex-1 px-4 truncate">
                {item.title}
              </span>
              <span className="text-[10px] tracking-widest text-ink-faint uppercase">
                {item.type}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#projects"
          className="text-xs uppercase tracking-[0.2em] text-accent hover:text-ink-solid transition-colors font-mono"
        >
          VIEW THE PROJECT WORKS »
        </a>
      </div>
    </section>
  );
}
