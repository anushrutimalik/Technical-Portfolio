import React, { useState, useEffect } from 'react';
import { ArrowUp, Terminal, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Footer({ personal }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#030407] border-t border-sky-500/20 py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>ANUSHRUTI // TECH PORTFOLIO</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Engineered with React 19, Tailwind CSS v4 & Web Audio API. Inspired by the-portfolio-green.
          </p>
        </div>

        {/* Middle Clock & Status */}
        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800 text-[11px]">
          <span className="flex items-center gap-1.5 text-sky-400">
            <ShieldCheck className="w-3.5 h-3.5" /> SYSTEM OK
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">UTC+05:30</span>
          <span className="text-slate-600">|</span>
          <span className="text-sky-300 font-bold">{time || "19:30:00"}</span>
        </div>

        {/* Right Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 text-slate-300 hover:text-sky-300 transition-all cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
