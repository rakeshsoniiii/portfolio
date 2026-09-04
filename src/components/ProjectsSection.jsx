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
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-faint mb-3 font-mono">
          URANUS · 19.2 AU · DEPLOYED SYSTEMS
        </p>

        <h2 className="text-4xl md:text-6xl text-ink-solid mb-6 tracking-tight font-heading">
          Selected Works
        </h2>

        {/* Minimal Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 text-[11px] font-mono uppercase tracking-widest">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`transition-colors ${
                filter === cat.key
                  ? 'text-accent'
                  : 'text-ink-faint hover:text-ink-solid'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Individual Project Rows — no grid, no cards */}
        <div className="space-y-0">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="border-t border-line/50 py-7 md:py-9 group hover:bg-white/[0.02] transition-colors -mx-4 px-4"
            >
              {/* Badge + Status Row */}
              <div className="flex items-center justify-between gap-3 mb-2 text-[10px] font-mono uppercase tracking-widest">
                <span className="text-ink-faint">{proj.badge}</span>
                {proj.isLive ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                ) : (
                  <span className="text-ink-faint">GITHUB</span>
                )}
              </div>

              {/* Title Row with Inline Thumbnail */}
              <div className="flex items-start gap-4 md:gap-6">
                {/* Small Inline Thumbnail */}
                <div
                  onClick={() => setSelectedProject(proj)}
                  className="w-20 h-14 md:w-28 md:h-20 rounded overflow-hidden cursor-pointer border border-line/40 hover:border-accent/50 transition-all flex-shrink-0 group/img"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="text-lg md:text-xl font-heading text-ink-solid group-hover:text-accent transition-colors mb-0.5 truncate">
                      {proj.title}
                    </h3>
                  </a>
                  <p className="text-[11px] font-mono text-ink-faint mb-2">
                    {proj.subtitle}
                  </p>
                  <p className="text-xs text-ink-dim leading-relaxed font-light line-clamp-2 mb-3 max-w-lg">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono tracking-wider uppercase text-ink-faint"
                      >
                        {tag}{tIdx < proj.tags.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-1 text-[10px] font-mono text-accent hover:text-ink-solid transition-colors uppercase tracking-widest flex-shrink-0 pt-1"
                >
                  {proj.isLive ? 'LAUNCH' : 'REPO'}
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
          <div className="border-t border-line/50" />
        </div>

        <a
          href="#contact"
          className="inline-block mt-10 text-[11px] uppercase tracking-[0.22em] text-accent hover:text-ink-solid transition-colors font-mono"
        >
          ESTABLISH CONTACT »
        </a>
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
