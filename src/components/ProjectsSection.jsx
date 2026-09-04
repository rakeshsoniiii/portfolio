import React, { useState } from 'react';

export default function ProjectsSection() {
  const [filter, setFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1, title: 'Detective-L 🔍🩸', subtitle: 'AI Murder Mystery & Cold Case Suite', category: 'AI',
      image: '/images/detective-l.jpg',
      desc: 'Interactive cyber-noir criminal investigation system. Real-time suspect cross-examination via Groq LLaMA-3.3, interactive red-string pinboard, OSINT intel lab, and grand jury verdict chamber.',
      tags: ['Groq LLaMA-3.3', 'AI', 'Cyber-Noir', 'Full-Stack'],
      liveUrl: 'https://detective-l.antideploy.com/', isLive: true, badge: 'FLAGSHIP AI',
    },
    {
      id: 2, title: 'JanAI Smart City Platform 🏙️', subtitle: 'AI-Powered Smart-City Demo', category: 'AI',
      image: '/images/smart-city.jpg',
      desc: 'End-to-end smart-city platform with education, healthcare triage, safety routing, fraud detection, analytics, and real-time SOS backed by Gemini LLMs and Firebase.',
      tags: ['Gemini LLM', 'Google Maps', 'Firebase', 'Smart City'],
      liveUrl: 'https://smartcity-7oy1.onrender.com/', isLive: true, badge: 'GEMINI AI',
    },
    {
      id: 3, title: 'Your Dr. 🩺', subtitle: 'AI Medicine & Product Safety Scanner', category: 'AI',
      image: '/images/your-dr.jpg',
      desc: '"Know. Decide. Stay Healthy." AI-powered scanner for ingredients, contraindications, and product safety.',
      tags: ['AI Health', 'React', 'Safety Analysis', 'Netlify'],
      liveUrl: 'https://yourdr.netlify.app/', isLive: true, badge: 'HEALTH AI',
    },
    {
      id: 4, title: 'Zombie Loot Rush 🧟', subtitle: 'Mobile Survival Game in C++17', category: 'GAME',
      image: '/images/zombie-game.jpg',
      desc: 'Landscape mobile zombie-survival game in C++17 with raylib. Desktop playable, packaged for Android.',
      tags: ['C++17', 'Raylib', 'Game Dev', 'Android'],
      liveUrl: 'https://github.com/rakeshsoniiii/Zombie-land.git', isLive: false, badge: 'C++17 GAME',
    },
    {
      id: 5, title: 'Autonomous Warehouse-Bot 🤖', subtitle: 'Robotics & Logistics Navigation', category: 'IOT',
      image: '/images/warehouse-bot.jpg',
      desc: 'Intelligent autonomous guided vehicle (AGV) for warehouse logistics, path-finding, and obstacle avoidance.',
      tags: ['IoT', 'Robotics', 'Embedded C++', 'Autonomous'],
      liveUrl: 'https://github.com/rakeshsoniiii/Autonomous_Warehouse-Bot', isLive: false, badge: 'IOT / ROBOTICS',
    },
    {
      id: 6, title: 'Drone-ESP32-cam-to-yolo 🛸', subtitle: 'Real-Time Aerial Vision Pipeline', category: 'IOT',
      image: '/images/drone-vision.jpg',
      desc: 'ESP32-CAM wireless video streaming feeding aerial frames into real-time YOLO object detection.',
      tags: ['ESP32-CAM', 'YOLO', 'Computer Vision', 'Drone'],
      liveUrl: 'https://github.com/rakeshsoniiii/Drone-ESP32-cam-to-yolo', isLive: false, badge: 'COMPUTER VISION',
    },
    {
      id: 7, title: 'Techno Vivarta 🌐', subtitle: 'College Technical Club Official Portal', category: 'WEB',
      image: '/images/techno-vivarta.jpg',
      desc: 'Official digital platform for Techno Vivarta technical society, tech event registrations and hackathon operations.',
      tags: ['Full-Stack', 'Community', 'Web Platform'],
      liveUrl: 'https://www.technovivarta.com/', isLive: true, badge: 'PRODUCTION',
    },
    {
      id: 8, title: 'SHASHTRA: Learning Platform 📚', subtitle: 'Collaborative LMS & Education Hub', category: 'WEB',
      image: '/images/shashtra-lms.jpg',
      desc: 'Full-featured Learning Management System for interactive coursework, collaborative learning, and progress tracking.',
      tags: ['LMS', 'EdTech', 'PHP / MySQL'],
      liveUrl: 'https://shashtra.rf.gd/?i=1', isLive: true, badge: 'EDUCATION',
    },
    {
      id: 9, title: 'Luv Notes.. 📝', subtitle: 'Modern AI-Assisted Note-Taking App', category: 'WEB',
      image: '/images/luv-notes.jpg',
      desc: 'Feature-rich note-taking app with dynamic aesthetic themes, AI-powered tools, and comprehensive organization.',
      tags: ['React', 'Firebase', 'AI Notes', 'Vercel'],
      liveUrl: 'https://luv-notes.vercel.app/', isLive: true, badge: 'REACT APP',
    },
    {
      id: 10, title: 'Sumedha — Artist Portfolio 🎨', subtitle: 'Creative Visual Art Showcase', category: 'CREATIVE',
      image: '/images/sumedha-art.jpg',
      desc: 'Bespoke creative portfolio for an artist friend, with generous typography, media galleries, and storytelling.',
      tags: ['Creative Portfolio', 'UI/UX', 'GitHub Pages'],
      liveUrl: 'https://rakeshsoniiii.github.io/Sumedha/', isLive: true, badge: 'ARTIST PORTFOLIO',
    },
    {
      id: 11, title: 'Sundi-SaaB — Client Portfolio 🖼️', subtitle: 'Minimalist Client Art Exhibition', category: 'CREATIVE',
      image: '/images/sundi-saab.jpg',
      desc: 'Curated client portfolio with sleek dark aesthetics, visual hierarchy, and responsive performance.',
      tags: ['Client Project', 'Creative Direction', 'Web Design'],
      liveUrl: 'https://rakeshsoniiii.github.io/Sundi-SaaB/', isLive: true, badge: 'CLIENT WORK',
    },
  ];

  const categories = [
    { key: 'ALL', label: 'All (11)' },
    { key: 'AI', label: 'AI' },
    { key: 'WEB', label: 'Web' },
    { key: 'IOT', label: 'IoT' },
    { key: 'GAME', label: 'Game' },
    { key: 'CREATIVE', label: 'Creative' },
  ];

  const filteredProjects =
    filter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-28 z-10"
    >
      <div className="max-w-6xl w-full">
        {/* Section Header */}
        <header className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
            URANUS · 19.2 AU · DEPLOYED ARCHITECTURES
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading mb-4 tracking-tight font-heading">
            Selected Works
          </h2>
          <p className="text-sm md:text-base text-slate-300/90 font-light max-w-2xl leading-relaxed">
            Production-grade web platforms, autonomous robotics pipelines, game engines, and full-stack AI applications engineered for performance.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 text-[11px] font-mono uppercase tracking-widest" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={filter === cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 border ${
                filter === cat.key
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                  : 'bg-black/30 text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Balanced Responsive Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((proj) => (
            <article
              key={proj.id}
              className="cosmic-panel cosmic-panel-hover rounded-2xl p-5 md:p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top: Balanced Image Box */}
              <div>
                <div
                  onClick={() => setSelectedProject(proj)}
                  className="w-full h-44 sm:h-48 md:h-52 rounded-xl overflow-hidden mb-4 relative cursor-pointer group/img border border-white/[0.08] bg-black/50 shadow-inner"
                  title={`View details for ${proj.title}`}
                >
                  <img
                    src={proj.image}
                    alt={`${proj.title} project interface preview`}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Scrim for Top & Bottom of Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                  {/* Overlaid Badges inside the Image Box */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="bg-black/70 backdrop-blur-md border border-white/10 text-emerald-300 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md font-medium">
                      {proj.badge}
                    </span>
                    {proj.isLive ? (
                      <span className="bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </span>
                    ) : (
                      <span className="bg-black/70 backdrop-blur-md border border-white/10 text-slate-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full">
                        GITHUB
                      </span>
                    )}
                  </div>

                  {/* Quick Expand Prompt */}
                  <div className="absolute bottom-2.5 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-white/20 text-slate-200 text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1">
                    <span>Inspect</span>
                    <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="text-xl font-heading text-slate-100 group-hover:text-emerald-300 transition-colors mb-1">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:outline-none"
                  >
                    {proj.title}
                  </a>
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mb-2.5">
                  {proj.subtitle}
                </p>

                {/* Clear, readable description that blends smoothly */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light line-clamp-3 mb-4">
                  {proj.desc}
                </p>
              </div>

              {/* Bottom: Tags & Actions */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono tracking-wide px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(proj)}
                    className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    Details
                  </button>

                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300 text-[11px] font-mono uppercase tracking-wider transition-all duration-200"
                  >
                    <span>{proj.isLive ? 'Launch Live' : 'View Code'}</span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Established link to Contact */}
        <div className="mt-12 text-center md:text-left">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-cyan-300 hover:text-white transition-colors font-mono font-medium px-4 py-2 rounded-full border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-950/20"
          >
            <span>Proceed to Deep Dispatch · Contact</span>
            <span>»</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Project Preview Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-surface/95 border border-line-strong rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 cursor-default"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-ink-dim hover:text-accent bg-card-bg/80 border border-line rounded-full w-8 h-8 flex items-center justify-center font-mono text-sm transition-colors"
            >
              ✕
            </button>

            <div className="relative h-52 md:h-72 w-full overflow-hidden rounded-xl border border-line mb-6 bg-black/50">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-accent/10 border border-accent/30 text-accent uppercase tracking-wider">
                {selectedProject.badge}
              </span>
              <span className="text-xs font-mono text-ink-faint">{selectedProject.subtitle}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-heading text-ink-solid mb-3">{selectedProject.title}</h3>
            <p className="text-sm text-ink-dim leading-relaxed mb-6 font-light">{selectedProject.desc}</p>

            <div className="flex gap-4">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-surface font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent/90 transition-colors"
              >
                {selectedProject.isLive ? 'Launch Live »' : 'Open Repo »'}
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-3 rounded-lg bg-surface border border-line text-ink-dim font-mono text-xs uppercase tracking-wider hover:text-ink-solid transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
