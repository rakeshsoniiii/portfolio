import React, { useState, useEffect } from 'react';

export default function ImageSlideshow({ images = [], alt = '', onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  if (!images || images.length === 0) return null;

  const total = images.length;

  // Auto-advance slideshow every 4.5 seconds unless hovered/paused
  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total, isPaused]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleDotClick = (idx, e) => {
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  return (
    <div
      className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden group/slide border border-white/10 bg-black/60 shadow-lg cursor-pointer select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => onImageClick && onImageClick(images[currentIndex])}
      title="Click to enlarge photo in high resolution"
    >
      {/* Current Slide Image with smooth transition */}
      {images.map((imgSrc, idx) => (
        <img
          key={imgSrc + idx}
          src={imgSrc}
          alt={`${alt} — slide ${idx + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        />
      ))}

      {/* Subtle bottom gradient for readability of overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      {/* Frame Counter Tag (Top Right) */}
      {total > 1 && (
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-amber-300 font-medium">
          {currentIndex + 1} / {total}
        </div>
      )}

      {/* Slide Navigation Arrows (Prev / Next) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-amber-400 hover:text-black text-white/90 border border-white/15 flex items-center justify-center transition-all duration-200 opacity-80 group-hover/slide:opacity-100 z-10"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-amber-400 hover:text-black text-white/90 border border-white/15 flex items-center justify-center transition-all duration-200 opacity-80 group-hover/slide:opacity-100 z-10"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Bottom Bar: Inspect Label on Left, Dots on Right */}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span className="text-[10px] font-mono text-slate-300/90 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
          <span>Enlarge</span>
          <span className="text-amber-400">↗</span>
        </span>

        {/* Dot Indicators */}
        {total > 1 && (
          <div className="flex items-center gap-1.5 pointer-events-auto bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => handleDotClick(dotIdx, e)}
                aria-label={`Jump to slide ${dotIdx + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  dotIdx === currentIndex
                    ? 'w-4 bg-amber-400'
                    : 'bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
