import React, { useState } from 'react';
import ImageSlideshow from './ImageSlideshow';

export default function AchievementsSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const awards = [
    {
      badge: '1ST PLACE',
      year: '2025',
      title: 'The Smart Cooler — Award-Winning IoT System',
      team: 'Team Frostbyte · Technothon IoT Exhibition 2025',
      desc: 'Secured 1st place for an innovative smart cooling solution combining automatic water refilling, temperature-responsive pump control, UV air sterilization, and ultra-cooling via Peltier module with real-time mobile app and voice automation.',
      images: ['/images/smart-cooler-1.jpg', '/images/smart-cooler-2.jpg', '/images/smart-cooler-3.jpg'],
      tags: ['IoT', 'Peltier Module', 'Mobile & Voice Control', 'UV Sterilization'],
    },
    {
      badge: '3RD PLACE',
      year: '2024',
      title: 'PayPalm — Biometric 3-Factor Money Transmission',
      team: 'Technothon AI UNLEASHED',
      desc: 'Architected PayPalm, an innovative device-independent payment system using 3-factor authentication: Face Recognition, Palm Recognition, and Gesture-based Authorization.',
      images: ['/images/paypal-1.jpg', '/images/paypal-2.jpg'],
      tags: ['Biometrics', 'Computer Vision', 'Gesture Auth', 'AI Security'],
    },
    {
      badge: 'LEADERSHIP',
      year: '2025',
      title: 'Technical Lead — Robokriti 2025 Exhibition',
      team: 'Takshila Robotics · 31 Teams, 155+ Participants',
      desc: 'Directed and delivered Robokriti 2025, an inter-college Science & Innovation Exhibition hosting 31 engineering teams and 155+ active participants.',
      images: ['/images/robokriti-lead.jpg'],
      tags: ['Technical Lead', 'Event Leadership', '155+ Participants'],
    },
    {
      badge: 'ROBOTICS',
      year: '2024',
      title: 'Team Bloody Moon — Inter-College Soccer Bot',
      team: 'Team Bloody Moon · Competitive Robotics',
      desc: 'Co-engineered competitive soccer bot for inter-college tournaments. Motor driver calibration, micro-controller radio control for high-speed athletic robot matches.',
      images: ['/images/soccer-bot-1.jpg', '/images/soccer-bot-2.jpg'],
      tags: ['Competitive Robotics', 'Embedded C++', 'Motor Control'],
    },
  ];

  return (
    <section
      id="achievements"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      {/* Constrained Left Column — Leaves Right 55% unobstructed for Saturn & titan */}
      <div className="max-w-xl w-full">
        {/* Section Header */}
        <header className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-amber-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
            SATURN · 9.58 AU · HONORS & RECOGNITION
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading mb-3 tracking-tight font-heading">
            Achievements
          </h2>
          <p className="text-sm text-slate-300/90 font-light max-w-lg leading-relaxed">
            Competitive robotics victories, hackathon podium placements, and exhibition leadership milestones.
          </p>
        </header>

        {/* Compact, Balanced Achievement Cards */}
        <div className="space-y-5">
          {awards.map((award, idx) => (
            <article
              key={idx}
              className="cosmic-panel cosmic-panel-hover rounded-2xl p-5 sm:p-6 group relative overflow-hidden"
            >
              {/* Top Row: Year, Badge, Team */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono text-slate-400">
                    {award.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    {award.badge}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  {award.team}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-heading text-slate-100 group-hover:text-amber-300 transition-colors mb-2 font-medium">
                {award.title}
              </h3>

              {/* Mobile Team display */}
              <p className="text-[11px] font-mono text-slate-400 mb-2 sm:hidden">
                {award.team}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
                {award.desc}
              </p>

              {/* Compact Slideshow for Multiple Images — Avoids wide multi-column blowing out the screen */}
              <div className="mb-4">
                <ImageSlideshow
                  images={award.images}
                  alt={award.title}
                  onImageClick={(imgSrc) => setSelectedImage(imgSrc)}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                {award.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono tracking-wide px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Minimal CTA link */}
        <div className="mt-8">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-amber-300 hover:text-white transition-colors font-mono font-medium"
          >
            <span>TRANSIT TO PROJECTS · 11 REPOSITORIES</span>
            <span>»</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-white/20">
            <img
              src={selectedImage}
              alt="Achievement fullscreen proof"
              className="max-h-[85vh] w-auto object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-white bg-black/70 hover:bg-amber-400 hover:text-black rounded-full w-8 h-8 flex items-center justify-center font-mono text-sm border border-white/20 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
