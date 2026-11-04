import React, { useEffect, useRef } from 'react';

const BURST_CAP = 1500;
const BURST_PER_PAGE = 170;
const BURST_PER_FRAME = 9;
const GOLDEN_ANGLE = 2.399963229; // rad — phyllotaxis spiral spacing

export default function CosmosBackground({ burstSignal = { n: 0, origin: null } }) {
  const canvasRef = useRef(null);
  const burstStarsRef = useRef([]);
  const pendingBurstsRef = useRef([]);
  const lastBurstNRef = useRef(0);

  useEffect(() => {
    if (!burstSignal || burstSignal.n === lastBurstNRef.current) return;
    lastBurstNRef.current = burstSignal.n;
    if (burstSignal.n === 0) return;

    const origin = burstSignal.origin ?? { x: window.innerWidth * 0.25, y: window.innerHeight * 0.4, width: window.innerWidth * 0.5, height: 80 };
    const room = Math.max(0, BURST_CAP - burstStarsRef.current.length - pendingBurstsRef.current.reduce((sum, b) => sum + b.remaining, 0));
    const count = Math.min(BURST_PER_PAGE, room);
    if (count > 0) {
      pendingBurstsRef.current.push({
        x: origin.x,
        y: origin.y,
        w: origin.width ?? 200,
        h: origin.height ?? 80,
        remaining: count,
        total: count,
        spawned: 0,
        rotation: Math.random() * Math.PI * 2,
      });
    }
  }, [burstSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Pre-rendered nebula layer (radial gradient blobs, built once per resize)
    const nebula = document.createElement('canvas');

    const buildNebula = () => {
      nebula.width = Math.max(1, width);
      nebula.height = Math.max(1, height);
      const n = nebula.getContext('2d');
      if (!n) return;
      n.clearRect(0, 0, width, height);
      const maxDim = Math.max(width, height);
      const blobs = [
        { x: width * 0.12, y: height * 0.18, r: maxDim * 0.45, color: 'rgba(56,189,248, 0.12)' },
        { x: width * 0.88, y: height * 0.78, r: maxDim * 0.50, color: 'rgba(129, 140, 248, 0.10)' },
        { x: width * 0.62, y: height * 0.12, r: maxDim * 0.35, color: 'rgba(217, 70, 239, 0.06)' },
        { x: width * 0.28, y: height * 0.88, r: maxDim * 0.42, color: 'rgba(14, 165, 233, 0.08)' },
        { x: width * 0.55, y: height * 0.55, r: maxDim * 0.60, color: 'rgba(15, 23, 42, 0)' },
      ];
      for (const b of blobs) {
        const g = n.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        n.fillStyle = g;
        n.fillRect(0, 0, width, height);
      }
    };

    let stars = [];
    const seedStars = () => {
      stars = [];
      // Seed the max density; individual stars fade in via the scroll ramp below.
      const count = Math.floor((width * height) / 7500);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.15 + 0.35,
          base: Math.random() * 0.55 + 0.25,
          speed: Math.random() * 0.035 + 0.012,
          phase: Math.random() * Math.PI * 2,
          blue: Math.random() < 0.18,
          depth: Math.random(), // 0 = appears first, 1 = last to fade in
        });
      }
    };

    // Star density ramps from sparse (top of page) to full, then stays constant.
    // First ~35% of viewport height = sparse, full by ~1.5 viewports, constant after.
    const densityAt = (scrollY, maxScroll) => {
      const t = Math.min(1, Math.max(0, scrollY / (window.innerHeight * 1.5)));
      const eased = t * t * (3 - 2 * t); // smoothstep
      return 0.3 + 0.7 * eased;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNebula();
      seedStars();
    };

    const meteors = [];
    let frame = 0;
    let animId;

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(nebula, 0, 0, width, height);

      // Pending bursts trickle in over frames — fluent instead of instant
      const pending = pendingBurstsRef.current;
      if (pending.length) {
        for (let b = pending.length - 1; b >= 0; b--) {
          const burst = pending[b];
          const room = Math.max(0, BURST_CAP - burstStarsRef.current.length);
          const n = Math.min(BURST_PER_FRAME, burst.remaining, room);
          const spiralColors = [
            'rgba(255, 255, 255, ',
            'rgba(255, 255, 255, ',
            'rgba(255, 255, 255, ',
            'rgba(186, 230, 253, ',
            'rgba(224, 242, 254, ',
            'rgba(224, 215, 255, ',
          ];
          for (let i = 0; i < n; i++) {
            const index = burst.spawned + i;
            // Golden-angle spiral velocity vectors, positions spread across the whole title block
            const angle = burst.rotation + index * GOLDEN_ANGLE;
            const radius = 4 + Math.sqrt(index / burst.total) * 30;
            const speed = 1.4 + (index / burst.total) * 2.1;
            const isBright = index % 34 === 0;

            burstStarsRef.current.push({
              x: burst.x + Math.random() * burst.w,
              y: burst.y + Math.random() * burst.h,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed * 0.85,
              radius: isBright ? Math.random() * 1.1 + 0.9 : Math.random() * 0.75 + 0.3,
              colorPrefix: spiralColors[index % spiralColors.length],
              baseAlpha: Math.random() * 0.45 + 0.4,
              twinkleSpeed: Math.random() * 0.03 + 0.012,
              twinklePhase: Math.random() * Math.PI * 2,
              hasCross: isBright,
              friction: 0.975 + Math.random() * 0.014,
            });
          }
          burst.spawned += n;
          burst.remaining -= n;
          if (burst.remaining <= 0 || room <= 0) pending.splice(b, 1);
        }
      }

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const density = densityAt(scrollY, 0);

      // Twinkling starfield — density ramps in gradually, constant after ~1.5 viewports
      for (const s of stars) {
        const reveal = density - s.depth;
        if (reveal <= 0) continue;
        const revealAlpha = Math.min(1, reveal / 0.12);
        const twinkle = Math.sin(frame * s.speed + s.phase);
        const alpha = Math.max(0, Math.min(1, s.base * (0.65 + 0.35 * twinkle) * revealAlpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.blue
          ? `rgba(186,230,253, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // Burst stars (spawned when a section is reached) — spread like the moon burst
      const burstStars = burstStarsRef.current;
      for (let i = 0; i < burstStars.length; i++) {
        const s = burstStars[i];
        if (Math.abs(s.vx) > 0.05 || Math.abs(s.vy) > 0.05) {
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= s.friction;
          s.vy *= s.friction;
        }
        const twinkle = Math.sin(frame * s.twinkleSpeed + s.twinklePhase);
        const alpha = Math.max(0, Math.min(1, s.baseAlpha * (0.65 + 0.35 * twinkle)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.colorPrefix}${alpha})`;
        ctx.fill();
        if (s.hasCross && alpha > 0.4) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - 5, s.y);
          ctx.lineTo(s.x + 5, s.y);
          ctx.moveTo(s.x, s.y - 5);
          ctx.lineTo(s.x, s.y + 5);
          ctx.stroke();
        }
      }

      // Occasional shooting stars
      if (Math.random() < 0.006 && meteors.length < 2) {
        meteors.push({
          x: width * (0.15 + Math.random() * 0.7),
          y: Math.random() * height * 0.35,
          vx: 9 + Math.random() * 7,
          vy: 4.5 + Math.random() * 3,
          len: 90 + Math.random() * 90,
          alpha: 1,
        });
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const tailX = m.x - m.len;
        const tailY = m.y - m.len * 0.48;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${m.alpha})`);
        grad.addColorStop(0.35, `rgba(186,230,253,${m.alpha * 0.6})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.018;
        if (m.alpha <= 0) meteors.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
}
