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
      {/* Constrained Left Column — Leaves Right 50% to 55% unobstructed for Uranus & Neptune */}
      <div className="max-w-2xl w-full">
        {/* Section Header */}
        <header className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
            URANUS & NEPTUNE · 19.2 AU · REPOSITORIES
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading mb-3 tracking-tight font-heading">
            Selected Works
          </h2>
          <p className="text-sm text-slate-300/90 font-light max-w-lg leading-relaxed">
            Production web platforms, autonomous robotics pipelines, game engines, and full-stack AI applications.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 text-[10px] font-mono uppercase tracking-widest" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={filter === cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-3 py-1 rounded-full transition-all duration-200 border ${
                filter === cat.key
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                  : 'bg-black/40 text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Compact, Balanced Project Feed inspired by arstraumur.music */}
        <div className="space-y-4">
          {filteredProjects.map((proj) => (
            <article
              key={proj.id}
              className="cosmic-panel cosmic-panel-hover rounded-2xl p-4 sm:p-5 group relative overflow-hidden flex flex-col sm:flex-row gap-4 items-start"
            >
              {/* Thumbnail Image Box: compact square/16:10 box */}
              <div
                onClick={() => setSelectedProject(proj)}
                className="w-full sm:w-36 md:w-40 h-28 sm:h-28 rounded-xl overflow-hidden relative cursor-pointer flex-shrink-0 border border-white/10 bg-black/60 shadow-md group/img"
                title={`Inspect ${proj.title}`}
              >
                <img
                  src={proj.image}
                  alt={`${proj.title} thumbnail`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-2 left-2">
                  <span className="bg-black/80 backdrop-blur-sm border border-white/15 text-emerald-300 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-medium">
                    {proj.badge}
                  </span>
                </div>

                <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/80 text-[9px] font-mono text-slate-200 px-1.5 py-0.5 rounded border border-white/15">
                  Inspect ↗
                </div>
              </div>

              {/* Text & Meta Column */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-heading text-slate-100 group-hover:text-emerald-300 transition-colors font-medium truncate">
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline focus:outline-none"
                      >
                        {proj.title}
                      </a>
                    </h3>
                    {proj.isLive ? (
                      <span className="flex-shrink-0 flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </span>
                    ) : (
                      <span className="flex-shrink-0 text-[9px] font-mono text-slate-400">
                        CODE
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 mb-2">
                    {proj.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2 mb-3">
                    {proj.desc}
                  </p>
                </div>

                {/* Tags & Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className="text-[10px] font-mono text-slate-400 hover:text-white uppercase tracking-wider transition-colors"
                    >
                      DETAILS »
                    </button>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-emerald-300 hover:text-white uppercase tracking-wider transition-colors font-medium"
                    >
                      {proj.isLive ? 'LAUNCH »' : 'VIEW CODE »'}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Minimal Bottom Transition */}
        <div className="mt-8">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-300 hover:text-white transition-colors font-mono font-medium"
          >
            <span>DISPATCH TO CONTACT & COMMS »</span>
          </a>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="cosmic-panel rounded-2xl p-6 sm:p-8 max-w-xl w-full border border-white/20 shadow-2xl relative cursor-default"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-black/60 rounded-full w-8 h-8 flex items-center justify-center font-mono text-sm border border-white/10"
            >
              ✕
            </button>

            <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-5 border border-white/10 bg-black/50">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {selectedProject.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {selectedProject.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-heading text-slate-100 mb-1 font-medium">
              {selectedProject.title}
            </h3>
            <p className="text-xs font-mono text-cyan-400 mb-4">
              {selectedProject.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-5">
              {selectedProject.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/[0.08]">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-300 hover:text-white transition-colors font-mono font-medium"
              >
                <span>{selectedProject.isLive ? 'LAUNCH LIVE SYSTEM »' : 'VIEW REPOSITORY CODE »'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
