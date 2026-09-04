import React, { useState } from 'react';
import SolarCanvas, { PLANET_INFO } from './components/SolarCanvas';
import Navigation from './components/Navigation';
import RightSidebar from './components/RightSidebar';
import CinematicIntro from './components/CinematicIntro';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturedSection from './components/FeaturedSection';
import AchievementsSection from './components/AchievementsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [currentPlanet, setCurrentPlanet] = useState(PLANET_INFO ? PLANET_INFO[0] : null);

  return (
    <div className="relative min-h-screen bg-surface text-ink selection:bg-accent/30 selection:text-ink-solid">
      {/* 3D WebGL Solar System Canvas */}
      <SolarCanvas onPlanetChange={setCurrentPlanet} onWaypointChange={setCurrentPlanet} />

      {/* Fixed Navigation Header */}
      <Navigation />

      {/* Fixed Right Astronomical Sidebar */}
      <RightSidebar currentPlanet={currentPlanet} />

      {/* Main Narrative Content Sections */}
      <main className="relative z-10 md:pr-14">
        {/* Pure Code-Based 3D Continuous Scroll Zoom-Out Intro */}
        <CinematicIntro />

        {/* Core Narrative Sections */}
        <HeroSection />
        <AboutSection />
        <FeaturedSection />
        <AchievementsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
