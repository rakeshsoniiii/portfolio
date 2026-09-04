import React, { useState } from 'react';

export default function AchievementsSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const awards = [
    {
      badge: '1ST PLACE',
      year: '2025',
      title: 'The Smart Cooler — Award-Winning IoT System',
      team: 'Team Frostbyte · Technothon IoT Exhibition 2025',
      desc: 'Secured 1st place for an innovative, eco-friendly smart cooling solution combining automatic water refilling, temperature-responsive motor/pump control, humidity regulation, UV air sterilization, and ultra-cooling powered by a Peltier module with real-time mobile app and voice automation.',
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
      desc: 'Directed and successfully delivered Robokriti 2025, an inter-college Science & Innovation Exhibition hosting 31 teams and 155+ participants.',
      images: ['/images/robokriti-lead.jpg'],
      tags: ['Technical Lead', 'Event Leadership', '155+ Participants'],
    },
    {
      badge: 'ROBOTICS',
      year: '2024',
      title: 'Team Bloody Moon — Inter-College Soccer Bot',
      team: 'Team Bloody Moon · Competitive Robotics',
      desc: 'Co-engineered competitive soccer bot for inter-college robotics tournaments. Motor driver calibration, micro-controller radio control for athletic robot matches.',
      images: ['/images/soccer-bot-1.jpg', '/images/soccer-bot-2.jpg'],
      tags: ['Competitive Robotics', 'Embedded C++', 'Motor Control'],
    },
  ];

  return (
    <section
      id="achievements"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-28 z-10"
    >
      <div className="max-w-5xl w-full">
        {/* Section Header */}
        <header className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-amber-400/90 mb-3 font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
            SATURN · 9.58 AU · HONORS & RECOGNITION
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-blend-heading mb-4 tracking-tight font-heading">
            Achievements
          </h2>
          <p className="text-sm md:text-base text-slate-300/90 font-light max-w-2xl leading-relaxed">
            Competitive robotics victories, hackathon podium placements, and exhibition leadership milestones.
          </p>
        </header>

        {/* Balanced Achievement Cards */}
        <div className="space-y-6">
          {awards.map((award, idx) => (
            <article
              key={idx}
              className="cosmic-panel cosmic-panel-hover rounded-2xl p-6 md:p-8 group relative overflow-hidden"
            >
              {/* Top Row: Year, Badge, Team */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">
                    {award.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    {award.badge}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  {award.team}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-heading text-slate-100 group-hover:text-amber-300 transition-colors mb-2 font-medium">
                {award.title}
              </h3>

              {/* Mobile Team display */}
              <p className="text-xs font-mono text-slate-400 mb-3 sm:hidden">
                {award.team}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-5 max-w-3xl">
                {award.desc}
              </p>

              {/* Balanced Photo Gallery Grid Box */}
              <div className="mb-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <span>Photo Evidence (Click to inspect)</span>
                  <span>·</span>
                  <span className="text-amber-400/80">{award.images.length} frame{award.images.length > 1 ? 's' : ''}</span>
                </p>

                <div className={`grid gap-3 sm:gap-4 ${
                  award.images.length === 1
                    ? 'grid-cols-1 sm:grid-cols-2 max-w-lg'
                    : award.images.length === 2
                    ? 'grid-cols-2 max-w-xl'
                    : 'grid-cols-2 sm:grid-cols-3'
                }`}>
                  {award.images.map((imgSrc, imgIdx) => (
                    <div
                      key={imgIdx}
                      onClick={() => setSelectedImage(imgSrc)}
                      className="h-28 sm:h-36 md:h-40 rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/60 hover:scale-[1.02] transition-all group/photo relative bg-black/50 shadow-md"
                      title="Click to view high-resolution photo"
                    >
                      <img
                        src={imgSrc}
                        alt={`${award.title} proof photo ${imgIdx + 1}`}
                        className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                        <span className="text-[10px] font-mono text-amber-300 bg-black/80 px-2 py-0.5 rounded">
                          Enlarge ↗
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
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

        {/* Transition Link */}
        <div className="mt-10">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-amber-300 hover:text-white transition-colors font-mono font-medium px-4 py-2 rounded-full border border-amber-500/30 hover:border-amber-400/60 bg-amber-950/20"
          >
            <span>Transit to Projects · 11 Repositories</span>
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
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-xl border border-line">
            <img
              src={selectedImage}
              alt="Achievement fullscreen"
              className="max-h-[85vh] w-auto object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-white bg-black/70 hover:bg-accent hover:text-black rounded-full w-8 h-8 flex items-center justify-center font-mono text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
