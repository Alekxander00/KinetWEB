import { useEffect, useRef } from "react";
import styles from "./InteractiveBackdrop.module.css";

function InteractiveBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return undefined;
    }

    let frameId = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    let audioEnergy = 0;
    let bassEnergy = 0;
    let midEnergy = 0;
    let trebleEnergy = 0;
    let pulseEnergy = 0;

    const pointer = {
      x: window.innerWidth * 0.55,
      y: window.innerHeight * 0.42
    };

    const particles = [];

    const setupParticles = () => {
      particles.length = 0;
      const count = Math.max(16, Math.min(34, Math.round((width * height) / 90000)));

      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          driftX: (Math.random() - 0.5) * 0.18,
          driftY: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.8 + 0.8
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      setupParticles();
    };

    const drawFieldLines = (energy, bass, mid, treble, pulse) => {
      const bandCount = Math.max(10, Math.round(height / 90));
      const stepX = Math.max(24, Math.round(width / 40));
      const amplitudeBoost = 1 + bass * 4.8 + pulse * 3.4;

      for (let band = 0; band < bandCount; band += 1) {
        const baseY = ((band + 0.5) / bandCount) * height;
        context.beginPath();

        for (let x = -stepX; x <= width + stepX; x += stepX) {
          const waveA =
            Math.sin(x * 0.0048 + time * 0.00055 + band * 0.45) * 18 * amplitudeBoost;
          const waveB =
            Math.cos(x * 0.0021 - time * 0.00035 + band * 0.6) * 12 * (1 + mid * 2.1);
          const distanceX = x - pointer.x;
          const distanceY = baseY - pointer.y;
          const influence = Math.max(
            0,
            1 - Math.hypot(distanceX, distanceY) / Math.max(width * 0.34, 320)
          );
          const audioPulse =
            Math.sin(time * 0.008 + band * 0.52) * (5 + pulse * 34) +
            Math.cos(x * 0.012 - time * 0.004 + band * 0.35) * bass * 28;
          const shimmer =
            Math.sin(x * 0.026 - time * 0.01 + band * 0.44) * treble * 12 +
            Math.cos(x * 0.018 + time * 0.008 + band * 0.3) * pulse * 18;
          const magneticOffset =
            Math.sin(time * 0.0012 + band) * 8 +
            influence *
              ((pointer.y - baseY) * (0.11 + energy * 0.08) +
                Math.sin(x * 0.01 + time * 0.003) * (14 + mid * 18 + pulse * 10));
          const y = baseY + waveA + waveB + magneticOffset + audioPulse + shimmer;

          if (x <= -stepX) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        const alpha = Math.min(
          0.42,
          0.04 + (1 - band / bandCount) * 0.05 + energy * 0.12 + treble * 0.1 + pulse * 0.18
        );
        context.strokeStyle = `rgba(198,255,52,${alpha})`;
        context.lineWidth = (band % 3 === 0 ? 1.4 : 0.95) + bass * 1.8 + pulse * 1.1;
        context.stroke();
      }
    };

    const drawLightPool = (energy, pulse) => {
      const radius = 320 + energy * 180 + pulse * 180;
      const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius);
      gradient.addColorStop(0, `rgba(198,255,52,${0.14 + energy * 0.16 + pulse * 0.22})`);
      gradient.addColorStop(0.4, `rgba(198,255,52,${0.05 + energy * 0.05 + pulse * 0.08})`);
      gradient.addColorStop(1, "rgba(198,255,52,0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const drawSignals = (energy, treble, pulse) => {
      particles.forEach((particle, index) => {
        const driftScale = 1 + energy * 1.3 + pulse * 1.6;
        particle.x += particle.driftX * driftScale;
        particle.y += particle.driftY * driftScale;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        context.fillStyle = `rgba(255,255,255,${0.22 + energy * 0.18 + treble * 0.22 + pulse * 0.16})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius + treble * 1.2 + pulse * 1.4, 0, Math.PI * 2);
        context.fill();

        const next = particles[(index + 1) % particles.length];
        const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
        const maxDistance = 180 + energy * 80 + pulse * 90;

        if (distance < maxDistance) {
          context.strokeStyle = `rgba(255,255,255,${0.03 + (1 - distance / maxDistance) * (0.05 + energy * 0.08 + pulse * 0.12)})`;
          context.lineWidth = 1 + pulse * 0.5;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(next.x, next.y);
          context.stroke();
        }
      });
    };

    const draw = () => {
      time += 16;
      const reactiveState = window.__KINET_AUDIO_REACTIVE__ ?? {};
      audioEnergy += ((reactiveState.level ?? 0) - audioEnergy) * 0.14;
      bassEnergy += ((reactiveState.bass ?? 0) - bassEnergy) * 0.18;
      midEnergy += ((reactiveState.mid ?? 0) - midEnergy) * 0.16;
      trebleEnergy += ((reactiveState.treble ?? 0) - trebleEnergy) * 0.18;
      pulseEnergy += ((reactiveState.pulse ?? 0) - pulseEnergy) * 0.24;
      context.clearRect(0, 0, width, height);
      drawLightPool(audioEnergy, pulseEnergy);
      drawFieldLines(audioEnergy, bassEnergy, midEnergy, trebleEnergy, pulseEnergy);
      drawSignals(audioEnergy, trebleEnergy, pulseEnergy);
      frameId = window.requestAnimationFrame(draw);
    };

    const handleMove = (event) => {
      pointer.x += (event.clientX - pointer.x) * 0.22;
      pointer.y += (event.clientY - pointer.y) * 0.22;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handleMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.backdrop} aria-hidden="true" />;
}

export default InteractiveBackdrop;
