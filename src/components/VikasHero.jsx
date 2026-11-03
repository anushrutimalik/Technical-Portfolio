import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, Mail, Copy, Check } from 'lucide-react';
import ThreeSphere from './ThreeSphere';
import StarNightBackground from './StarNightBackground';
import { sounds } from '../utils/soundEffects';

// Stardust particle system for the Connect CTA arrow
function useStardust(canvasRef, containerRef) {
  const particles = useRef([]);
  const frame = useRef(0);
  const rafRef = useRef(null);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const alive = [];
    for (const p of particles.current) {
      p.life -= p.decay;
      if (p.life <= 0) continue;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.97;
      p.vy *= 0.97;
      p.twinkle = (p.twinkle || 0) + 0.25;
      const alpha = Math.max(0, p.life) * (0.6 + 0.4 * Math.sin(p.twinkle));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
      ctx.fill();

      // Sparkle cross on the brighter particles
      if (p.sparkle) {
        ctx.strokeStyle = `rgba(${p.color}, ${alpha * 0.75})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(p.x - p.size * 3, p.y);
        ctx.lineTo(p.x + p.size * 3, p.y);
        ctx.moveTo(p.x, p.y - p.size * 3);
        ctx.lineTo(p.x, p.y + p.size * 3);
        ctx.stroke();
      }
      alive.push(p);
    }
    particles.current = alive;

    if (particles.current.length > 0) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, width, height);
      frame.current = 0;
    }
  }, [canvasRef, containerRef]);

  const burst = useCallback((x, y, count = 3) => {
    const palette = ['255,255,255', '186,230,253', '224,242,254', '125,211,252'];
    for (let i = 0; i < count; i++) {
      particles.current.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 10,
        vx: 0.8 + Math.random() * 2.4,
        vy: (Math.random() - 0.5) * 1.6,
        size: Math.random() * 1.7 + 0.6,
        life: 1,
        decay: 0.018 + Math.random() * 0.02,
        color: palette[Math.floor(Math.random() * palette.length)],
        sparkle: Math.random() < 0.3,
      });
    }
    if (frame.current === 0) {
      frame.current = 1;
      rafRef.current = requestAnimationFrame(loop);
    } else if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return burst;
}

export default function VikasHero({ personal, onMoonClick }) {
  const [copied, setCopied] = useState(false);
  const [scatterTrigger, setScatterTrigger] = useState(0);
  const moonUsed = useRef(false);
  const connectWrapRef = useRef(null);
  const dustCanvasRef = useRef(null);
  const shedDust = useStardust(dustCanvasRef, connectWrapRef);

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

  // Size the stardust canvas to the Connect button wrapper
  useEffect(() => {
    const canvas = dustCanvasRef.current;
    const wrap = connectWrapRef.current;
    if (!canvas || !wrap) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleDustMove = (e) => {
    const canvas = dustCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    shedDust(e.clientX - rect.left, e.clientY - rect.top, 3);
  };

  return (
    <section id="about" className="relative w-full h-[calc(100svh-4rem)] min-h-[560px] max-h-[850px] overflow-hidden bg-transparent">
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
              <span className="block font-display text-[clamp(4rem,10vw,8rem)] text-white leading-[0.85]">
                Anushruti
              </span>
            </div>
            <div className="overflow-hidden pt-2">
              <span className="block font-display text-[clamp(1.75rem,3.6vw,2.9rem)] leading-tight text-sky-300/95">
                Java Spring Boot Developer
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
            <span
              ref={connectWrapRef}
              onMouseMove={handleDustMove}
              onMouseEnter={handleDustMove}
              className="relative inline-flex"
            >
              <canvas
                ref={dustCanvasRef}
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-6 z-20"
              />
              <button
                onClick={handleConnectClick}
                className="group relative h-10 cursor-pointer rounded-full border-none px-5 outline-none w-44 flex items-center justify-center overflow-hidden transition-all duration-500 bg-white hover:shadow-[0_0_28px_rgba(125,211,252,0.55)]"
              >
                <div className="absolute inset-0 bg-sky-300 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10 font-semibold text-slate-950 text-xs tracking-tight flex items-center gap-1.5">
                  Let's Connect
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950 drop-shadow-[0_0_3px_rgba(125,211,252,0.9)] group-hover:translate-x-1.5 group-hover:text-sky-600 transition-all" />
                </span>
              </button>
            </span>

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
        <div className="relative flex-1 w-full h-[240px] sm:h-[320px] lg:h-full translate-x-6 sm:translate-x-10 lg:translate-x-14 translate-y-2 sm:translate-y-3">
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
