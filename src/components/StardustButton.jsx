import React, { useRef, useEffect, useCallback } from 'react';

const PALETTE = ['255,255,255', '224,242,254', '186,230,253', '125,211,252'];

/**
 * White pill CTA with a sliding sky fill on hover, arrow nudge,
 * and a stardust particle trail shed as the pointer moves across it.
 * Used for the hero Connect button and extended to other primary CTAs.
 */
export default function StardustButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  innerClassName = '',
  ariaLabel,
  size = 'md',
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const rafRef = useRef(null);
  const looping = useRef(false);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
      p.twinkle += 0.25;
      const alpha = Math.max(0, p.life) * (0.6 + 0.4 * Math.sin(p.twinkle));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
      ctx.fill();

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
      looping.current = false;
    }
  }, []);

  const spawn = useCallback(
    (x, y, count = 3) => {
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 10,
          vx: 0.8 + Math.random() * 2.4,
          vy: (Math.random() - 0.5) * 1.6,
          size: Math.random() * 1.7 + 0.6,
          life: 1,
          decay: 0.018 + Math.random() * 0.02,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          sparkle: Math.random() < 0.3,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
      if (!looping.current) {
        looping.current = true;
        rafRef.current = requestAnimationFrame(loop);
      }
    },
    [loop]
  );

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ro = wrap && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    if (ro && wrap) ro.observe(wrap);
    return () => {
      window.removeEventListener('resize', resize);
      if (ro) ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [resize]);

  const handleMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    spawn(e.clientX - rect.left, e.clientY - rect.top, 3);
  };

  const sizing =
    size === 'sm'
      ? 'h-9 px-4 text-[11px]'
      : size === 'lg'
      ? 'h-12 px-7 text-sm'
      : 'h-10 px-5 text-xs';

  return (
    <span
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseEnter={handleMove}
      className="relative inline-flex"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -inset-y-6 z-20"
      />
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`group relative ${sizing} cursor-pointer rounded-full border-none outline-none overflow-hidden flex items-center justify-center transition-all duration-500 bg-white hover:shadow-[0_0_28px_rgba(186,230,253,0.55)] disabled:opacity-60 ${className}`}
      >
        <div className="absolute inset-0 bg-sky-200 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        <span
          className={`relative z-10 font-semibold text-slate-950 tracking-tight flex items-center justify-center gap-1.5 ${innerClassName}`}
        >
          {children}
        </span>
      </button>
    </span>
  );
}
