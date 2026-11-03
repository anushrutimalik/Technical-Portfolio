import React, { useEffect, useRef } from 'react';

/**
 * Meteor cursor — a small luminous head with a tapered, colour-shifting tail.
 * Visible only while the pointer is moving (fades out when idle).
 * Renders only on fine-pointer devices and respects prefers-reduced-motion.
 */
export default function StardustCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    document.documentElement.classList.add('stardust-cursor');

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const state = {
      x: width / 2,
      y: height / 2,
      tx: width / 2,
      ty: height / 2,
      opacity: 0,
      visible: false,
      angle: 0,
    };

    const trail = [];
    const MAX_TRAIL = 26;
    const embers = [];
    const rings = [];

    const onMove = (e) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
      if (!state.visible) {
        state.x = e.clientX;
        state.y = e.clientY;
        state.visible = true;
      }
    };
    const onLeaveWindow = () => {
      state.visible = false;
    };
    const onEnterWindow = () => {
      state.visible = true;
    };
    const onDown = (e) => {
      // Meteor burst on click
      for (let i = 0; i < 14; i++) {
        const a = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
        const speed = 1.5 + Math.random() * 2.2;
        embers.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 1,
          size: 0.8 + Math.random() * 1.6,
        });
      }
      rings.push({ x: e.clientX, y: e.clientY, r: 6, alpha: 0.7 });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onEnterWindow);
    window.addEventListener('pointerdown', onDown, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;
    const mix = (c1, c2, t) => [
      lerp(c1[0], c2[0], t),
      lerp(c1[1], c2[1], t),
      lerp(c1[2], c2[2], t),
    ];
    const HEAD = [240, 249, 255];
    const TAIL = [56, 189, 248];

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth chase toward pointer
      const prevX = state.x;
      const prevY = state.y;
      state.x += (state.tx - state.x) * 0.42;
      state.y += (state.ty - state.y) * 0.42;
      const vx = state.x - prevX;
      const vy = state.y - prevY;
      const speed = Math.hypot(vx, vy);
      if (speed > 0.5) state.angle = Math.atan2(vy, vx);

      // Fade in/out based on movement
      const targetOpacity = state.visible && speed > 0.8 ? Math.min(1, 0.35 + speed / 9) : 0;
      state.opacity += (targetOpacity - state.opacity) * 0.14;

      // Record trail points (only when moved enough)
      const last = trail[0];
      if (!last || Math.hypot(state.x - last.x, state.y - last.y) > 2) {
        trail.unshift({ x: state.x, y: state.y });
        if (trail.length > MAX_TRAIL) trail.pop();
      }

      // Tail: tapered, colour-shifting ribbon
      if (state.opacity > 0.02 && trail.length > 1) {
        ctx.lineCap = 'round';
        for (let i = 0; i < trail.length - 1; i++) {
          const t = i / (trail.length - 1); // 0 at head … 1 at tail end
          const segAlpha = (1 - t) * (1 - t) * state.opacity;
          const [r, g, b] = mix(HEAD, TAIL, t);
          ctx.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${segAlpha})`;
          ctx.lineWidth = lerp(4.6, 0.6, t);
          ctx.shadowBlur = i < 6 ? 10 * (1 - t) : 0;
          ctx.shadowColor = 'rgba(125, 211, 252, 0.9)';
          ctx.beginPath();
          ctx.moveTo(trail[i].x, trail[i].y);
          ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;

        // Head: white-hot core with cold halo
        const headR = 2.4 + Math.min(2.2, speed * 0.12);
        const glow = ctx.createRadialGradient(state.x, state.y, 0, state.x, state.y, headR * 5);
        glow.addColorStop(0, `rgba(255,255,255,${0.9 * state.opacity})`);
        glow.addColorStop(0.25, `rgba(224,242,254,${0.5 * state.opacity})`);
        glow.addColorStop(1, 'rgba(125,211,252,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(state.x, state.y, headR * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${state.opacity})`;
        ctx.beginPath();
        ctx.arc(state.x, state.y, headR, 0, Math.PI * 2);
        ctx.fill();

        // Faint meteor glint aligned with travel direction
        ctx.save();
        ctx.translate(state.x, state.y);
        ctx.rotate(state.angle);
        ctx.strokeStyle = `rgba(240,249,255,${0.85 * state.opacity})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(headR * 0.4, 0);
        ctx.lineTo(headR * 3.4, 0);
        ctx.stroke();
        ctx.restore();

        // Spawn embers when moving fast
        if (speed > 7) {
          embers.push({
            x: state.x - Math.cos(state.angle) * 3,
            y: state.y - Math.sin(state.angle) * 3,
            vx: -Math.cos(state.angle) * (0.6 + Math.random()) + (Math.random() - 0.5) * 0.5,
            vy: -Math.sin(state.angle) * (0.6 + Math.random()) + (Math.random() - 0.5) * 0.5,
            life: 1,
            size: 0.6 + Math.random() * 1.4,
          });
        }
      }

      // Embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.vx *= 0.96;
        e.vy *= 0.96;
        e.life -= 0.028;
        if (e.life <= 0) {
          embers.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(${TAIL[0]}, ${TAIL[1]}, ${TAIL[2]}, ${e.life * 0.85 * Math.max(state.opacity, 0.35)})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * e.life + 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Click rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.r += 2.6;
        r.alpha -= 0.03;
        if (r.alpha <= 0) {
          rings.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(186,230,253,${r.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onEnterWindow);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.classList.remove('stardust-cursor');
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="meteor-cursor" />;
}
