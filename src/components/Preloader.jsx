import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, Cpu } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    "INITIALIZING SYSTEM CORE V4.2...",
    "CONNECTING TO AIIMS & MAMA'S BABY LOUNGE BACKEND SERVICES...",
    "LOADING SPRING BOOT MICROSERVICES...",
    "COMPILING ANGULAR & REACT COMPONENT TREES...",
    "SYSTEM VERIFIED: ANUSHRUTI PORTFOLIO READY."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        const next = prev + 5;
        const stepIdx = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setCurrentStepIndex(stepIdx);
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030305] text-sky-400 font-mono flex flex-col items-center justify-center p-6 selection:bg-sky-500/30">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="w-full max-w-lg glass-panel p-6 sm:p-8 rounded-xl border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.15)] relative">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-sky-500/20 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-300 uppercase">
              BOOT SEQUENCE // SYSTEM_INIT
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500/40 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
          </div>
        </div>

        {/* System Logs */}
        <div className="space-y-2 mb-8 min-h-[140px] text-xs sm:text-sm">
          {steps.slice(0, currentStepIndex + 1).map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-300 transition-all duration-300">
              <span className="text-sky-500 font-bold select-none">&gt;</span>
              <span className={idx === currentStepIndex ? "text-sky-400 font-semibold text-glow-sky" : "opacity-75"}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Meter */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="flex items-center gap-1 text-sky-400">
              <Cpu className="w-3.5 h-3.5 animate-spin" /> LOADING PORTFOLIO MODULES
            </span>
            <span className="text-sky-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-sky-500/30 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-sky-400 rounded-full transition-all duration-150 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
          <span>HOST: ANUSHRUTI-PC</span>
          <span className="flex items-center gap-1 text-sky-500">
            <ShieldCheck className="w-3 h-3" /> VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
}
