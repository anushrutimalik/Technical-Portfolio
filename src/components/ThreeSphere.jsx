import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sounds } from '../utils/soundEffects';

// High-quality procedural radial star texture with soft glow and subtle diffraction cross
function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const center = 32;

  const grad = ctx.createRadialGradient(center, center, 0, center, center, 30);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.15, 'rgba(240, 248, 255, 0.9)');
  grad.addColorStop(0.35, 'rgba(180, 220, 255, 0.45)');
  grad.addColorStop(0.7, 'rgba(120, 180, 255, 0.12)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  // Subtle cross diffraction spikes (optical diamond glint)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(center - 14, center);
  ctx.lineTo(center + 14, center);
  ctx.moveTo(center, center - 14);
  ctx.lineTo(center, center + 14);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

// Procedural soft lunar corona / atmosphere halo
function createHaloTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const center = 64;

  const grad = ctx.createRadialGradient(center, center, 20, center, center, 64);
  grad.addColorStop(0, 'rgba(190, 225, 255, 0.35)');
  grad.addColorStop(0.3, 'rgba(140, 195, 255, 0.16)');
  grad.addColorStop(0.65, 'rgba(80, 150, 255, 0.05)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  return new THREE.CanvasTexture(canvas);
}

export default function ThreeSphere({ onScatter }) {
  const containerRef = useRef(null);
  const onScatterRef = useRef(onScatter);
  const [, setDispersionActive] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  // Keep callback reference fresh without triggering effect re-runs
  useEffect(() => {
    onScatterRef.current = onScatter;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 450;
    if (width <= 0) width = 450;
    if (height <= 0) height = 450;

    // 1. Scene & Camera Setup - Perfectly centered camera ensures a 100% round, undistorted sphere
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.0;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent to integrate into #050507
    container.appendChild(renderer.domElement);

    const starTexture = createStarTexture();
    const haloTexture = createHaloTexture();

    // 2. Load High-Res NASA Moon Texture & Create Procedural 3D Bump Map
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('/real_moon.jpg', (loadedTex) => {
      const bumpCanvas = document.createElement('canvas');
      bumpCanvas.width = loadedTex.image.width || 1024;
      bumpCanvas.height = loadedTex.image.height || 512;
      const bCtx = bumpCanvas.getContext('2d');
      bCtx.drawImage(loadedTex.image, 0, 0);

      const bData = bCtx.getImageData(0, 0, bumpCanvas.width, bumpCanvas.height);
      const px = bData.data;
      for (let i = 0; i < px.length; i += 4) {
        const avg = (px[i] + px[i + 1] + px[i + 2]) / 3;
        const v = avg < 110 ? avg * 0.4 : avg * 1.3;
        px[i] = Math.min(255, v);
        px[i + 1] = Math.min(255, v);
        px[i + 2] = Math.min(255, v);
      }
      bCtx.putImageData(bData, 0, 0);

      const bumpTex = new THREE.CanvasTexture(bumpCanvas);
      moonMaterial.bumpMap = bumpTex;
      moonMaterial.bumpScale = 0.042;
      moonMaterial.needsUpdate = true;
    });

    moonTexture.colorSpace = THREE.SRGBColorSpace;

    const moonRadius = 1.45;
    const moonGeometry = new THREE.SphereGeometry(moonRadius, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.88,
      metalness: 0.05
    });

    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    // Shifted ~20px up from center (+0.26 in Three.js coordinates at camera.z = 7)
    const MOON_Y_OFFSET = 0.26;
    moonMesh.position.set(0, MOON_Y_OFFSET, 0);
    scene.add(moonMesh);

    // Subtle Lunar Atmosphere Corona Halo
    const haloMat = new THREE.SpriteMaterial({
      map: haloTexture,
      color: 0xcfe4ff,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const haloSprite = new THREE.Sprite(haloMat);
    const baseHaloScale = moonRadius * 2.75;
    haloSprite.scale.set(baseHaloScale, baseHaloScale, 1.0);
    haloSprite.position.set(0, MOON_Y_OFFSET, -0.05);
    scene.add(haloSprite);

    // 3. Directional Sunlight & Ambient Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.8);
    sunLight.position.set(6, 4, 5); // Angle from top right for real 3D terminator shadow line
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.16);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x67e8f9, 0.45);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // 4. Stardust Particles System - Rich Glowing Stars with Twinkle & Astronomical Colors
    const starCount = 3200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starVelocities = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starPalette = [
      new THREE.Color('#ffffff'), // Pure brilliant white
      new THREE.Color('#bcdcff'), // Diamond ice blue
      new THREE.Color('#fff4e8'), // Warm star white
      new THREE.Color('#ffe8ba'), // Soft golden star
      new THREE.Color('#93c5fd')  // sky glimmer
    ];

    const resetStarBurst = () => {
      for (let i = 0; i < starCount; i++) {
        const idx = i * 3;

        // Uniform sphere surface direction vector
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);

        const dx = Math.sin(phi) * Math.cos(theta);
        const dy = Math.sin(phi) * Math.sin(theta);
        const dz = Math.cos(phi);

        // Start right on the moon's rim
        starPositions[idx]     = dx * moonRadius;
        starPositions[idx + 1] = MOON_Y_OFFSET + dy * moonRadius;
        starPositions[idx + 2] = dz * moonRadius;

        // High dispersion speeds for an unmistakable star scatter
        const speed = Math.random() * 0.25 + 0.08;
        const swirl = (Math.random() - 0.5) * 0.08;
        starVelocities[idx]     = dx * speed * 3.2 + (-dy * swirl);
        starVelocities[idx + 1] = dy * speed * 2.8 + (dx * swirl);
        starVelocities[idx + 2] = dz * speed * 2.2;

        const c = starPalette[Math.floor(Math.random() * starPalette.length)];
        starColors[idx]     = c.r;
        starColors[idx + 1] = c.g;
        starColors[idx + 2] = c.b;
      }
      if (starGeometry.attributes.position) {
        starGeometry.attributes.position.needsUpdate = true;
      }
      if (starGeometry.attributes.color) {
        starGeometry.attributes.color.needsUpdate = true;
      }
    };

    // Attach attributes first so they are guaranteed to exist
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Populate initial positions safely
    resetStarBurst();

    // High quality soft glowing star points material
    const starMaterial = new THREE.PointsMaterial({
      size: 0.045,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0, // Invisible before click
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // 5. Interactive Mouse Drag & Click Handlers
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let hasDispersed = false;
    let haloPulse = 0;
    let starOpacity = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;

        moonMesh.rotation.y += deltaX * 0.005;
        moonMesh.rotation.x += deltaY * 0.005;

        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const handleClick = () => {
      // The moon only reacts once — later clicks are ignored.
      if (hasDispersed) return;
      sounds.playClick();
      setDispersionActive(true);
      setHasClicked(true);
      hasDispersed = true;
      haloPulse = 1.0;
      starOpacity = 1.0;
      starMaterial.opacity = 1.0;

      // Burst & scatter fresh stars outward!
      resetStarBurst();

      onScatterRef.current?.();
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('click', handleClick);

    const handleResizeWindow = () => {
      if (!container) return;
      width = container.clientWidth || 450;
      height = container.clientHeight || 450;
      if (width <= 0) width = 450;
      if (height <= 0) height = 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResizeWindow);

    // 6. Animation Loop - Smooth Moon Spin & Twinkling Stardust Dispersal
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        moonMesh.rotation.y += 0.002;
      }

      // Halo breathing & pulse shockwave on click
      if (haloPulse > 0) {
        haloPulse = Math.max(0, haloPulse - delta * 2.0);
      }
      const haloScaleFactor = (1.0 + Math.sin(elapsedTime * 1.8) * 0.03) * (1.0 + haloPulse * 0.35);
      haloSprite.scale.set(baseHaloScale * haloScaleFactor, baseHaloScale * haloScaleFactor, 1.0);
      haloMat.opacity = 0.55 + haloPulse * 0.4 + Math.sin(elapsedTime * 1.5) * 0.1;

      // Disperse Stardust on Click
      if (hasDispersed) {
        starMaterial.opacity = starOpacity;

        // Dynamic star twinkling scintillation
        starMaterial.size = 0.045 * (1.0 + Math.sin(elapsedTime * 2.0) * 0.15);

        const pos = starGeometry.attributes.position.array;
        for (let i = 0; i < starCount; i++) {
          const idx = i * 3;
          pos[idx]     += starVelocities[idx];
          pos[idx + 1] += starVelocities[idx + 1];
          pos[idx + 2] += starVelocities[idx + 2];

          // Gentle deceleration, transitioning into lingering twinkling stars
          starVelocities[idx]     *= 0.982;
          starVelocities[idx + 1] *= 0.982;
          starVelocities[idx + 2] *= 0.982;

          // Subtle floating drift so stars stay alive
          pos[idx]     += Math.sin(elapsedTime + i) * 0.0006;
          pos[idx + 1] += Math.cos(elapsedTime + i) * 0.0006;
        }
        starGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResizeWindow);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('click', handleClick);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      starTexture.dispose();
      haloTexture.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      moonTexture.dispose();
      haloMat.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="moon-canvas-container"
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none bg-transparent"
    >
      {/* "CLICK THE MOON" option fades out and disappears after clicking once */}
      <p
        style={{ top: 'calc(70.5% + 14px)', left: 'calc(50% + 3px)' }}
        className={`absolute -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-[10px] tracking-[0.25em] uppercase text-white/35 font-mono font-medium whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.5)] transition-all duration-500 pointer-events-none select-none ${
          hasClicked
            ? 'opacity-0 scale-95 pointer-events-none'
            : 'opacity-100 scale-100 hover:text-white/60 hover:bg-white/10 hover:border-white/20'
        }`}
      >
        click the moon
      </p>
    </div>
  );
}
