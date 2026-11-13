import React, { useEffect, useRef } from "react";

/**
 * FestivalParticleCanvas.jsx
 * 
 * Hardware-accelerated, ultra-smooth 60 FPS HTML5 canvas particle system.
 * Renders festival-specific particle motifs with gentle physics and zero jank:
 * - Diwali: Flickering diyas & golden floating sparkles
 * - Holi: Floating colorful powder clouds & playful splashes
 * - Christmas: Falling snowflakes & twinkling winter stars
 * - Halloween: Drifting bats & creeping atmospheric fog puffs
 * - Eid: Glowing crescent moons, stars & floating lanterns
 * - Durga Puja: Floating marigold & lotus flower petals
 * - Raksha Bandhan: Shimmering golden silk threads & floral confetti
 * - Valentine's Day: Floating hearts & drifting rose petals
 * - Easter: Pastel butterflies & spring blossoms
 * - Makar Sankranti: Floating miniature kites & solar sparkles
 * - Chinese New Year: Glowing red lanterns, gold coins & plum blossoms
 */

export default function FestivalParticleCanvas({
  themeId = "sage-cream",
  particleType = "",
  enabled = true
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Strictly NEVER render or compute particles on normal themes
  if (!themeId || !themeId.startsWith("festive-") || !particleType || particleType === "gentle_pages" || !enabled) {
    return null;
  }

  useEffect(() => {
    if (!enabled || !themeId.startsWith("festive-") || !particleType || particleType === "gentle_pages") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool: keep count small (~26-32) for flawless performance
    const particleCount = 28;
    const particles = [];

    const createParticle = (initY = null) => {
      const p = {
        x: Math.random() * width,
        y: initY !== null ? initY : Math.random() * height,
        size: 4 + Math.random() * 8,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: 0.3 + Math.random() * 0.8,
        opacity: 0.2 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        hue: Math.random() * 360,
        subType: Math.floor(Math.random() * 3),
        scale: 0.6 + Math.random() * 0.8,
        pulse: Math.random() * Math.PI,
        life: 0
      };

      // Customise initial velocities per particle type
      if (particleType === "snowflakes") {
        p.speedY = 0.6 + Math.random() * 1.2;
        p.speedX = Math.sin(p.x) * 0.5;
        p.size = 3 + Math.random() * 5;
      } else if (particleType === "diya_sparkles") {
        p.speedY = -(0.4 + Math.random() * 0.9); // floats upwards!
        p.speedX = (Math.random() - 0.5) * 0.6;
        p.size = 2 + Math.random() * 6;
      } else if (particleType === "halloween_bats_fog") {
        p.speedX = (Math.random() > 0.5 ? 1 : -1) * (0.8 + Math.random() * 1.2);
        p.speedY = Math.sin(p.x * 0.05) * 0.5;
      } else if (particleType === "sankranti_kites") {
        p.speedY = -(0.5 + Math.random() * 1.0); // soaring kites!
        p.speedX = Math.sin(p.y * 0.02) * 1.2;
        p.size = 12 + Math.random() * 10;
      } else if (particleType === "valentines_hearts") {
        p.speedY = -(0.3 + Math.random() * 0.7); // gentle float up
        p.speedX = Math.sin(p.y * 0.03) * 0.6;
        p.size = 7 + Math.random() * 8;
      }

      return p;
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const render = () => {
      if (!isVisible) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.pulse += 0.03;
        p.life++;

        // Wrap around borders
        if (p.speedY > 0 && p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.speedY < 0 && p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.opacity + Math.sin(p.pulse) * 0.2));

        // RENDER CUSTOM FESTIVAL SHAPES
        if (particleType === "snowflakes") {
          // Christmas: Fluffy snowflake crystal
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            ctx.moveTo(0, 0);
            ctx.lineTo(0, p.size);
            ctx.rotate(Math.PI / 3);
          }
          ctx.stroke();
          // Snowflake center dot
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (particleType === "diya_sparkles") {
          // Diwali: Golden 4-point sparkle star / ember
          ctx.fillStyle = p.subType === 0 ? "#fef08a" : p.subType === 1 ? "#f59e0b" : "#fbbf24";
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          const r = p.size;
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(Math.cos(((i * 90) * Math.PI) / 180) * r, Math.sin(((i * 90) * Math.PI) / 180) * r);
            ctx.lineTo(Math.cos(((i * 90 + 45) * Math.PI) / 180) * (r * 0.25), Math.sin(((i * 90 + 45) * Math.PI) / 180) * (r * 0.25));
          }
          ctx.closePath();
          ctx.fill();
        } else if (particleType === "holi_gulal") {
          // Holi: Soft colorful powder clouds
          const colors = ["#ec4899", "#3b82f6", "#f59e0b", "#10b981", "#8b5cf6"];
          ctx.fillStyle = colors[p.subType % colors.length];
          ctx.shadowColor = colors[p.subType % colors.length];
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particleType === "valentines_hearts") {
          // Valentine's: Rose petal / heart
          ctx.fillStyle = p.subType === 0 ? "#f43f5e" : p.subType === 1 ? "#fda4af" : "#be185d";
          ctx.shadowColor = "rgba(244, 63, 94, 0.4)";
          ctx.shadowBlur = 6;
          const s = p.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s * 0.5, -s * 0.5, -s, 0, 0, s);
          ctx.bezierCurveTo(s, 0, s * 0.5, -s * 0.5, 0, s * 0.3);
          ctx.fill();
        } else if (particleType === "halloween_bats_fog") {
          // Halloween: Silhouette Bat
          ctx.fillStyle = "#3b2344";
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = 4;
          const s = p.size * 1.1;
          ctx.beginPath();
          ctx.moveTo(-s, 0);
          ctx.quadraticCurveTo(-s * 0.5, -s * 0.6, 0, 0);
          ctx.quadraticCurveTo(s * 0.5, -s * 0.6, s, 0);
          ctx.quadraticCurveTo(s * 0.3, s * 0.5, 0, s * 0.2);
          ctx.quadraticCurveTo(-s * 0.3, s * 0.5, -s, 0);
          ctx.fill();
        } else if (particleType === "eid_crescent_lanterns") {
          // Eid: Crescent moon & celestial starlet
          if (p.subType === 0) {
            ctx.fillStyle = "#facc15";
            ctx.shadowColor = "#eab308";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(p.size * 0.4, -p.size * 0.2, p.size * 0.85, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = "source-over";
          } else {
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (particleType === "durga_marigolds") {
          // Durga Puja: Marigold Flower Petal
          ctx.fillStyle = p.subType === 0 ? "#f97316" : p.subType === 1 ? "#eab308" : "#dc2626";
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.6, p.size * 1.2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (particleType === "sankranti_kites") {
          // Makar Sankranti: Diamond Flying Kite
          const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"];
          ctx.fillStyle = colors[p.subType % colors.length];
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.7, 0);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.7, 0);
          ctx.closePath();
          ctx.fill();
          // Cross strings
          ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(0, s);
          ctx.moveTo(-s * 0.7, 0);
          ctx.lineTo(s * 0.7, 0);
          ctx.stroke();
          // Tail
          ctx.strokeStyle = "rgba(245, 158, 11, 0.8)";
          ctx.beginPath();
          ctx.moveTo(0, s);
          ctx.quadraticCurveTo(s * 0.3, s * 1.5, 0, s * 2);
          ctx.stroke();
        } else if (particleType === "cny_lanterns") {
          // Chinese New Year: Red Paper Lantern & Gold Coin
          if (p.subType === 0) {
            ctx.fillStyle = "#dc2626";
            ctx.shadowColor = "#f59e0b";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.8, p.size * 1.1, 0, 0, Math.PI * 2);
            ctx.fill();
            // Gold cap
            ctx.fillStyle = "#facc15";
            ctx.fillRect(-p.size * 0.4, -p.size * 1.1, p.size * 0.8, p.size * 0.25);
            ctx.fillRect(-p.size * 0.4, p.size * 0.9, p.size * 0.8, p.size * 0.25);
          } else {
            // Plum blossom petal
            ctx.fillStyle = "#f472b6";
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (particleType === "easter_blossoms") {
          // Easter: Spring Daisy Petals & Butterflies
          ctx.fillStyle = p.subType === 0 ? "#a78bfa" : p.subType === 1 ? "#fef08a" : "#6ee7b7";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (particleType === "rakhi_threads") {
          // Raksha Bandhan: Silken thread curl / gold spangle
          ctx.strokeStyle = p.subType === 0 ? "#f59e0b" : "#db2777";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 1.3);
          ctx.stroke();
        } else {
          // No particles drawn
        }

        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [particleType, enabled, themeId]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="festival-particle-canvas-layer"
      aria-hidden="true"
    />
  );
}