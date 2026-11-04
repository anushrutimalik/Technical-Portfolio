import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function VikasHeader({ onOpenSearch }) {
  const [greeting, setGreeting] = useState('Good day');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good afternoon');
    } else if (hour >= 17 && hour < 22) {
      setGreeting('Good evening');
    } else {
      setGreeting('Good night');
    }
  }, []);

  return (
    <>
      {/* Desktop Floating Header Bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="flex items-center gap-2">

          {/* Greeting Pill */}
          <div className="relative flex items-center h-11 rounded-2xl border px-4 bg-[#07070c]/70 border-white/10 backdrop-blur-xl shadow-lg">
            <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
              {greeting}, welcome to Anushruti's portfolio
            </span>
          </div>

          {/* Search / Command Palette Button */}
          <button
            onClick={() => {
              sounds.playOpenModal();
              onOpenSearch();
            }}
            className="group flex items-center gap-2.5 h-11 px-3.5 rounded-2xl border transition-all duration-300 text-slate-400 hover:text-white bg-[#07070c]/70 border-white/10 hover:border-white/25 backdrop-blur-xl shadow-lg hover:bg-white/5 cursor-pointer"
            title="Open Command Search (⌘K / Ctrl+K)"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-slate-300">
                ⌘K
              </kbd>
            </span>
          </button>

        </div>
      </div>

      {/* Mobile Top Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-4 h-14 bg-[#07070c]/80 backdrop-blur-xl border-b border-white/10">
        <div className="text-xs font-medium text-slate-300">
          {greeting}
        </div>

        <button
          onClick={() => {
            sounds.playOpenModal();
            onOpenSearch();
          }}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
