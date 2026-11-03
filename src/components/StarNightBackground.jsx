import React, { useEffect, useRef } from 'react';

export default function StarNightBackground({ scatterTrigger = 0 }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const meteorsRef = useRef([]);
  const scatterFnRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = canvas.parentElement?.clientWidth || window.innerWidth || 1200;
    let height = canvas.parentElement?.clientHeight || window.innerHeight || 800;
    if (width <= 0) width = 1200;
    if (height <= 0) height = 800;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth || window.innerWidth || 1200;
      height = canvas.parentElement.clientHeight || window.innerHeight || 800;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(255, 255, 255, ',    // Pure white
      'rgba(195, 222, 255, ',    // Diamond ice blue
      'rgba(255, 244, 230, ',    // Warm star white
      'rgba(255, 232, 186, ',    // Soft gold
      'rgba(147, 197, 253, ',    // Soft sky
      'rgba(224, 215, 255, '     // Ethereal lavender
    ];

    // Ambient background stars (pre-existing quiet night sky)
    const AMBIENT_COUNT = 180;
    const ambientStars = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      ambientStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.9 + 0.3,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.35 + 0.15,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        hasCross: false
      });
    }

    // Function to scatter a massive, rich starfield from the moon (6x+ density)
    scatterFnRef.current = () => {
      const moonEl = document.querySelector('#moon-canvas-container');
      let originX = width * 0.75;
      let originY = height * 0.45;

      if (moonEl && canvas) {
        const mRect = moonEl.getBoundingClientRect();
        const cRect = canvas.getBoundingClientRect();
        originX = mRect.left + mRect.width / 2 - cRect.left;
        originY = mRect.top + mRect.height / 2 - cRect.top - 20;
      }

      // 4,400 stars per click (2x the previous 2,200)
      const NEW_STAR_COUNT = 4400;
      for (let i = 0; i < NEW_STAR_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const tier = Math.random();

        // Speed tiers: fast sweepers to cover far left, mid-field, and lingering lunar cluster
        let speed;
        if (tier < 0.38) {
          // High-velocity stars sweeping all the way to the far left & edges
          speed = Math.random() * 12 + 14;
        } else if (tier < 0.78) {
          // Mid-velocity stars scattering across the body of the hero
          speed = Math.random() * 8 + 6;
        } else {
          // Slower celestial dust clustering gracefully around the moon
          speed = Math.random() * 4 + 1.5;
        }

        const isHeroStar = Math.random() < 0.08;
        const radius = isHeroStar
          ? Math.random() * 1.5 + 1.2
          : Math.random() * 0.85 + 0.45;

        starsRef.current.push({
          x: originX + Math.cos(angle) * (Math.random() * 50 + 20),
          y: originY + Math.sin(angle) * (Math.random() * 50 + 20),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.8,
          radius,
          colorPrefix: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.6 + 0.35,
          twinkleSpeed: Math.random() * 0.035 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          hasCross: isHeroStar,
          friction: 0.966 + Math.random() * 0.018
        });
      }

      // Spawn multiple shooting stars (meteors) across the heavens
      const meteorOrigins = [
        { x: width * 0.75, y: 40, angle: Math.PI / 4 + 0.1, speed: 14, len: 120 },
        { x: width * 0.55, y: 20, angle: Math.PI / 4 - 0.08, speed: 11, len: 90 },
        { x: width * 0.90, y: 60, angle: Math.PI / 4 + 0.2, speed: 16, len: 140 }
      ];

      meteorOrigins.forEach((mo, idx) => {
        setTimeout(() => {
          meteorsRef.current.push({
            x: mo.x + (Math.random() - 0.5) * 60,
            y: mo.y + (Math.random() - 0.5) * 30,
            length: mo.len,
            speed: mo.speed,
            angle: mo.angle,
            alpha: 1.0,
            decay: 0.018
          });
        }, idx * 180);
      });
    };

    let time = 0;

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw ambient background stars
      for (let i = 0; i < ambientStars.length; i++) {
        const s = ambientStars[i];
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const alpha = Math.max(0, s.baseAlpha * (0.7 + 0.3 * twinkle));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.colorPrefix}${alpha})`;
        ctx.fill();
      }

      // 2. Update and draw the dense scattered starfield bursting from the moon
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (Math.abs(s.vx) > 0.05 || Math.abs(s.vy) > 0.05) {
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= s.friction;
          s.vy *= s.friction;
        }

        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const alpha = Math.max(0, Math.min(1, s.baseAlpha * (0.65 + 0.35 * twinkle)));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.colorPrefix}${alpha})`;
        ctx.fill();

        if (s.hasCross && alpha > 0.4) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.45})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - 5, s.y);
          ctx.lineTo(s.x + 5, s.y);
          ctx.moveTo(s.x, s.y - 5);
          ctx.lineTo(s.x, s.y + 5);
          ctx.stroke();
        }
      }

      // 3. Draw and update shooting stars (meteors)
      const meteors = meteorsRef.current;
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;
        ctx.lineTo(tailX, tailY);

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        grad.addColorStop(0.3, `rgba(180, 220, 255, ${m.alpha * 0.7})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= m.decay;

        if (m.alpha <= 0) {
          meteors.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Trigger scatter when trigger increments
  const prevTriggerRef = useRef(0);
  useEffect(() => {
    if (scatterTrigger > prevTriggerRef.current) {
      prevTriggerRef.current = scatterTrigger;
      if (scatterFnRef.current) {
        scatterFnRef.current();
      }
    }
  }, [scatterTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
