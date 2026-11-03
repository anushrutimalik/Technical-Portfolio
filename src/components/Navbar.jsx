import React, { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, Menu, X, Download, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Navbar({ onOpenTerminal, isMuted, onToggleAudio, personal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    sounds.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050508]/85 backdrop-blur-md border-b border-sky-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo & Status */}
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, '#about')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 group-hover:border-sky-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all">
            <span className="font-mono text-sky-400 font-extrabold text-lg group-hover:scale-110 transition-transform">
              A
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
          </div>

          <div className="flex flex-col">
            <span className="font-mono font-bold text-slate-100 text-sm tracking-wider group-hover:text-sky-400 transition-colors">
              ANUSHRUTI
            </span>
            <span className="text-[10px] font-mono text-sky-400/80 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-sky-400" /> CS B.TECH (9.1 GPA)
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-sky-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-sky-400 hover:after:w-full after:transition-all"
            >
              <span className="text-sky-500 mr-0.5">#</span>
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* CLI Terminal Trigger */}
          <button
            onClick={() => {
              sounds.playOpenModal();
              onOpenTerminal();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-sky-500/40 text-sky-400 hover:bg-sky-500/10 hover:border-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all font-mono text-xs cursor-pointer"
            title="Open Interactive Terminal Shell (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-semibold">&gt;_ CLI</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => {
              onToggleAudio();
            }}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/50 text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all cursor-pointer"
            title={isMuted ? "Unmute UI Sound FX" : "Mute UI Sound FX"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
          </button>

          {/* Resume Download */}
          <a
            href="/Anushruti_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-500 hover:to-sky-500 text-white font-mono text-xs font-semibold shadow-lg shadow-sky-900/30 hover:shadow-sky-500/30 hover:scale-105 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> RESUME
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              sounds.playOpenModal();
              onOpenTerminal();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-sky-500/40 text-sky-400 font-mono text-xs flex items-center gap-1"
          >
            <Terminal className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-sky-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#070b14]/95 backdrop-blur-xl border-b border-sky-500/30 p-6 shadow-2xl flex flex-col gap-4 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-slate-200 hover:text-sky-400 py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>
                <span className="text-sky-500 mr-2">#</span>
                {link.name}
              </span>
              <span className="text-xs text-slate-500">&gt;</span>
            </a>
          ))}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onToggleAudio}
              className="flex items-center gap-2 text-xs text-slate-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
              <span>{isMuted ? "Sound Off" : "Sound On"}</span>
            </button>

            <a
              href="/Anushruti_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-bold text-xs"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
