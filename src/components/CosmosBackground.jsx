import React, { useEffect, useRef } from 'react';

export default function CosmosBackground() {
  const canvasRef = useRef(null);

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
