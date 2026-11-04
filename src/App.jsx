import React, { useState, useEffect, useRef } from 'react';
import VikasHeader from './components/VikasHeader';
import VikasHero from './components/VikasHero';
import BentoGrid from './components/BentoGrid';
import VikasProjects from './components/VikasProjects';
import VikasExperience from './components/VikasExperience';
import Skills from './components/Skills';
import VikasAchievements from './components/VikasAchievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import VikasFooter from './components/VikasFooter';
import FloatingDock from './components/FloatingDock';
import CosmosBackground from './components/CosmosBackground';
import StardustCursor from './components/StardustCursor';
import CommandPalette from './components/CommandPalette';
import TerminalModal from './components/TerminalModal';
import ProjectModal from './components/ProjectModal';

import { PORTFOLIO_DATA } from './data/portfolioData';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [moonClicked, setMoonClicked] = useState(false);
  const [burstSignal, setBurstSignal] = useState({ n: 0, origin: null });
  const burstFired = useRef(new Set());

  // Scroll reveal for sections (fade-in-up)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('section, footer');
    targets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Star burst once per panel when it's meaningfully in view.
  // Origin = the centre of that panel's title, so the burst erupts from the heading.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ids = ['how-i-work', 'projects', 'experience', 'skills', 'achievements', 'certifications', 'contact', 'end'];
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !burstFired.current.has(entry.target.id)) {
            burstFired.current.add(entry.target.id);
            const title = entry.target.querySelector('h2');
            let origin = { x: window.innerWidth * 0.25, y: window.innerHeight * 0.4, width: window.innerWidth * 0.5, height: 80 };
            if (title) {
              const rect = title.getBoundingClientRect();
              origin = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
            }
            entry.target.classList.add('page-flash');
            setBurstSignal((prev) => ({ n: prev.n + 1, origin }));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Global Keyboard listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sounds.playOpenModal();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 relative font-sans selection:bg-sky-400/25 selection:text-white">

      {/* Site-wide animated cosmos (stars, nebula, shooting stars, section bursts) */}
      <CosmosBackground burstSignal={burstSignal} />

      {/* Space-themed meteor cursor (fine pointers only) */}
      <StardustCursor />

      {/* VikasDev Top Floating Header */}
      <VikasHeader onOpenSearch={() => setSearchOpen(true)} />

      {/* Hero Landing Page with Photorealistic 3D Moon Canvas */}
      <VikasHero personal={PORTFOLIO_DATA.personal} onMoonClick={() => setMoonClicked(true)} />

      {/* 3D Bento Grid System */}
      <BentoGrid />

      {/* Projects Showcase */}
      <VikasProjects
        projects={PORTFOLIO_DATA.projects}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Work Experience */}
      <VikasExperience experiences={PORTFOLIO_DATA.experience} />

      {/* Skills Matrix */}
      <Skills skills={PORTFOLIO_DATA.skills} />

      {/* Hackathons, Leadership & Academic Honors */}
      <VikasAchievements achievements={PORTFOLIO_DATA.achievements} />

      {/* Certifications */}
      <Certifications certifications={PORTFOLIO_DATA.certifications} />

      {/* Contact Section */}
      <Contact personal={PORTFOLIO_DATA.personal} />

      {/* VikasDev Footer with Infinite Marquee */}
      <VikasFooter personal={PORTFOLIO_DATA.personal} />

      {/* Floating Apple-Style Bottom Navigation Dock */}
      <FloatingDock
        personal={PORTFOLIO_DATA.personal}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        musicEnabled={moonClicked}
      />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={PORTFOLIO_DATA}
      />

      {/* Interactive CLI Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        data={PORTFOLIO_DATA}
      />

      {/* Project Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
