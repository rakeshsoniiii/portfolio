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
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-faint mb-3 font-mono">
          SATURN · 9.58 AU · YEAR RINGS & HONORS
        </p>

        <h2 className="text-4xl md:text-6xl text-ink-solid mb-12 tracking-tight font-heading">
          Achievements
        </h2>

        {/* Individual Achievement Rows — no grid, no cards */}
        <div className="space-y-0">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="border-t border-line/50 py-8 md:py-10 group hover:bg-white/[0.02] transition-colors -mx-4 px-4"
            >
              {/* Date + Badge Row */}
              <div className="flex items-center gap-4 mb-3 text-[11px] font-mono text-ink-faint uppercase tracking-widest">
                <span>{award.year}</span>
                <span className="text-accent">{award.badge}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-heading text-ink-solid mb-2 group-hover:text-accent transition-colors">
                {award.title}
              </h3>

              {/* Team */}
              <p className="text-xs font-mono text-ink-faint mb-3">
                {award.team}
              </p>

              {/* Description */}
              <p className="text-sm text-ink-dim leading-relaxed font-light mb-5 max-w-2xl">
                {award.desc}
              </p>

              {/* Inline Photo Strip — small thumbnails, click to fullscreen */}
              <div className="flex items-center gap-3 mb-4">
                {award.images.map((imgSrc, imgIdx) => (
                  <div
                    key={imgIdx}
                    onClick={() => setSelectedImage(imgSrc)}
                    className="w-20 h-14 md:w-28 md:h-20 rounded overflow-hidden cursor-pointer border border-line/40 hover:border-accent/50 transition-all group/img"
                  >
                    <img
                      src={imgSrc}
                      alt={`${award.title} photo ${imgIdx + 1}`}
                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Tags — minimal inline */}
              <div className="flex flex-wrap gap-2">
                {award.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] font-mono tracking-wider uppercase text-ink-faint"
                  >
                    {tag}{tIdx < award.tags.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-line/50" />
        </div>

        <a
          href="#projects"
          className="inline-block mt-10 text-[11px] uppercase tracking-[0.22em] text-accent hover:text-ink-solid transition-colors font-mono"
        >
          VIEW ALL 11 PROJECTS »
        </a>
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
