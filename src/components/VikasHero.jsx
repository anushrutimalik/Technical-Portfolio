import React, { useState, useRef } from 'react';
import { ArrowRight, Mail, Copy, Check } from 'lucide-react';
import ThreeSphere from './ThreeSphere';
import StarNightBackground from './StarNightBackground';
import { sounds } from '../utils/soundEffects';
import StardustButton from './StardustButton';

export default function VikasHero({ personal, onMoonClick }) {
  const [copied, setCopied] = useState(false);
  const [scatterTrigger, setScatterTrigger] = useState(0);
  const moonUsed = useRef(false);

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConnectClick = () => {
    sounds.playClick();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative w-full h-[calc(100svh_-_4rem)] min-h-[560px] max-h-[850px] overflow-hidden bg-transparent">
      {/* Starry Night Sky Background - Stars Scatter Across Full Sky on Moon Click */}
      <StarNightBackground scatterTrigger={scatterTrigger} />

      <div className="relative z-10 h-full w-full max-w-[1300px] mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center">
        
        {/* Left Column: Headline, Bio & CTAs */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[52%] shrink-0 gap-4 sm:gap-5 pt-20 pb-6 lg:pt-0 lg:pb-0 lg:justify-center lg:h-full">

           {/* Headline Stack */}
          <h1 className="tracking-tight leading-none">
            <div className="overflow-visible py-0.5">
              <span className="inline-flex items-center gap-2 font-mono text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.3em] text-sky-300 drop-shadow-[0_0_14px_rgba(125,211,252,0.45)] translate-x-3 sm:translate-x-5">
                <span className="inline-block h-px w-6 bg-sky-400/70" aria-hidden="true" />
                Hi, I'm
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="block font-display text-[clamp(3rem,6.5vw,5rem)] text-white leading-[0.9] tracking-tight">
                Anushruti
              </span>
            </div>
            <div className="overflow-hidden py-2">
              <span className="block font-display text-[clamp(1.75rem,4.2vw,3.1rem)] font-bold leading-[1.2] text-white">
                Java Full-Stack Engineer
              </span>
            </div>
            <div className="overflow-hidden pt-3">
              <span className="block font-mono text-[clamp(0.85rem,1.5vw,1.1rem)] font-semibold uppercase tracking-[0.22em] text-sky-300 text-glow-sky">
                Spring Boot · Hibernate · PostgreSQL
              </span>
            </div>
          </h1>

          {/* Intro Line */}
          <div>
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-400 font-light tracking-wide flex-wrap">
              <span>Building scalable backends & full-stack web apps.</span>
            </div>
          </div>

          {/* CTA Buttons Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
            
            {/* Sliding Connect Button with stardust trail */}
            <StardustButton onClick={handleConnectClick} ariaLabel="Let's connect — scroll to contact" className="w-44">
              Let's Connect
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 drop-shadow-[0_0_3px_rgba(125,211,252,0.9)] group-hover:translate-x-1.5 group-hover:text-sky-600 transition-all" />
            </StardustButton>

            {/* Email Copy Pill */}
            <div className="inline-flex items-center gap-0 overflow-hidden text-xs rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-mono font-bold text-[11px]">{personal.email}</span>
              </a>

              <div className="w-px h-3.5 bg-white/10 shrink-0" />

              <button
                onClick={handleCopyEmail}
                aria-label="Copy email"
                className="inline-flex items-center justify-center px-3 py-2 text-slate-400 hover:text-sky-400 hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-sky-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Moon + CLICK THE MOON grouped together, shifted further right */}
        <div className="relative flex-1 w-full h-[120px] sm:h-[190px] lg:h-full translate-x-4 sm:translate-x-8 lg:translate-x-14 translate-y-1 sm:translate-y-2">
          <ThreeSphere
            onScatter={() => {
              setScatterTrigger((prev) => prev + 1);
              // The moon click is the one and only trigger for the background music.
              if (!moonUsed.current) {
                moonUsed.current = true;
                onMoonClick?.();
              }
            }}
          />
        </div>

      </div>
    </section>
  );
}
