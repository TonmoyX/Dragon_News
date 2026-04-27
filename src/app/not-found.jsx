"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NotFound() {
  const canvasRef = useRef(null);
  const nebulaRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  /* ── Starfield canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Layered stars: tiny (far), medium, bright (near)
    const layers = [
      { count: 300, size: [0.3, 0.8], speed: 0.015, alpha: [0.2, 0.5] },
      { count: 120, size: [0.8, 1.5], speed: 0.03,  alpha: [0.4, 0.8] },
      { count:  40, size: [1.5, 2.8], speed: 0.06,  alpha: [0.7, 1.0] },
    ];

    const stars = layers.flatMap(({ count, size, speed, alpha }) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: size[0] + Math.random() * (size[1] - size[0]),
        speed,
        alpha: alpha[0] + Math.random() * (alpha[1] - alpha[0]),
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.008 + Math.random() * 0.015,
        // Colour: mostly white, some blue/gold
        hue: Math.random() < 0.15 ? (Math.random() < 0.5 ? 210 : 45) : 0,
        sat: Math.random() < 0.15 ? 80 : 0,
      }))
    );

    // Shooting stars
    const shoots = [];
    const spawnShoot = () => {
      if (shoots.length < 3) {
        shoots.push({
          x: Math.random() * canvas.width * 0.7,
          y: Math.random() * canvas.height * 0.4,
          len: 80 + Math.random() * 120,
          speed: 6 + Math.random() * 8,
          alpha: 1,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        });
      }
    };
    const shootInterval = setInterval(spawnShoot, 3200);

    let frame = 0;
    let animId;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Stars
      stars.forEach((s) => {
        const tw = Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
        const a = s.alpha * (0.75 + tw * 0.25);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue === 0
            ? `rgba(255,255,255,${a})`
            : s.hue === 210
            ? `hsla(210,${s.sat}%,85%,${a})`
            : `hsla(45,${s.sat}%,88%,${a})`;
        ctx.fill();
      });

      // Shooting stars
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];
        const grd = ctx.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );
        grd.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.018;
        if (s.alpha <= 0) shoots.splice(i, 1);
      }
    };
    draw();
    setTimeout(() => setLoaded(true), 80);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(shootInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Nebula (SVG filter) mouse parallax ── */
  useEffect(() => {
    const el = nebulaRef.current;
    if (!el) return;
    const move = (e) => {
      const dx = (e.clientX / window.innerWidth  - 0.5) * 30;
      const dy = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Raleway:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --void:      #03010a;
          --deep:      #07022a;
          --nebula-a:  #1a0540;
          --nebula-b:  #001a3a;
          --cyan:      #00d4ff;
          --cyan-dim:  rgba(0,212,255,0.15);
          --gold:      #ffd166;
          --rose:      #ff6b9d;
          --white:     #e8eeff;
          --muted:     rgba(200,210,255,0.45);
          --glow:      rgba(0,212,255,0.6);
        }

        html, body { height: 100%; background: var(--void); }

        .universe {
          position: relative;
          min-height: 100vh;
          background: radial-gradient(ellipse 120% 80% at 60% 40%, var(--nebula-a) 0%, var(--deep) 45%, var(--void) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Raleway', sans-serif;
          color: var(--white);
        }

        /* Star canvas sits behind everything */
        .stars-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* Nebula blobs */
        .nebula {
          position: absolute;
          inset: -15%;
          z-index: 1;
          pointer-events: none;
          transition: transform 0.12s ease-out;
        }

        .nebula-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          mix-blend-mode: screen;
        }
        .nb1 {
          width: 60vw; height: 50vh;
          top: 5%; left: -10%;
          background: radial-gradient(circle, rgba(80,0,160,0.55) 0%, transparent 70%);
        }
        .nb2 {
          width: 50vw; height: 55vh;
          top: 20%; right: -5%;
          background: radial-gradient(circle, rgba(0,40,120,0.50) 0%, transparent 70%);
        }
        .nb3 {
          width: 35vw; height: 35vh;
          bottom: 0; left: 30%;
          background: radial-gradient(circle, rgba(180,0,80,0.30) 0%, transparent 70%);
        }
        .nb4 {
          width: 25vw; height: 25vh;
          top: 10%; left: 50%;
          background: radial-gradient(circle, rgba(0,180,220,0.20) 0%, transparent 70%);
        }

        /* Central content */
        .content {
          position: relative;
          z-index: 10;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Planet */
        .planet-wrap {
          position: relative;
          width: 160px;
          height: 160px;
          margin-bottom: 36px;
        }

        .planet {
          width: 120px;
          height: 120px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%,
            #2a1060 0%,
            #0d0530 40%,
            #03010a 100%
          );
          box-shadow:
            -12px -8px 30px rgba(100,60,220,0.6),
            inset -10px -10px 30px rgba(0,0,0,0.8),
            inset 8px 8px 20px rgba(120,80,255,0.2),
            0 0 60px rgba(80,40,180,0.4);
          animation: planetFloat 6s ease-in-out infinite;
        }

        /* Surface detail lines */
        .planet::before {
          content: '';
          position: absolute;
          inset: 10%;
          border-radius: 50%;
          border: 1px solid rgba(120,80,255,0.2);
          box-shadow: 0 4px 0 rgba(120,80,255,0.1), 0 8px 0 rgba(120,80,255,0.06);
        }

        /* Ring */
        .planet-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 160px;
          height: 40px;
          transform: translate(-50%, -50%) rotateX(75deg);
          border-radius: 50%;
          border: 10px solid transparent;
          border-top-color: rgba(0,212,255,0.35);
          border-bottom-color: rgba(255,209,102,0.25);
          box-shadow:
            0 0 20px rgba(0,212,255,0.2),
            inset 0 0 10px rgba(0,212,255,0.1);
          animation: ringPulse 4s ease-in-out infinite;
        }

        /* Orbiting moon */
        .moon-orbit {
          position: absolute;
          top: 50%; left: 50%;
          width: 140px; height: 140px;
          margin: -70px 0 0 -70px;
          border-radius: 50%;
          border: 1px dashed rgba(0,212,255,0.15);
          animation: orbit 8s linear infinite;
        }
        .moon {
          position: absolute;
          top: -5px; left: 50%;
          width: 10px; height: 10px;
          background: radial-gradient(circle at 35% 35%, #c0d0ff, #6080c0);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(150,180,255,0.7);
          margin-left: -5px;
        }

        @keyframes planetFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50%       { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.8; }
          50%       { opacity: 1; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Error code */
        .error-num {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(72px, 16vw, 140px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, var(--cyan) 0%, #a78bfa 50%, var(--rose) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(0,212,255,0.4));
          animation: numGlow 3s ease-in-out infinite alternate;
        }

        @keyframes numGlow {
          from { filter: drop-shadow(0 0 20px rgba(0,212,255,0.3)); }
          to   { filter: drop-shadow(0 0 50px rgba(167,139,250,0.7)); }
        }

        .tagline {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(11px, 2.5vw, 16px);
          font-weight: 400;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--cyan);
          margin-top: 6px;
          opacity: 0.85;
        }

        .divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, var(--cyan), transparent);
          margin: 24px auto;
          opacity: 0.5;
        }

        .headline {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(18px, 3.5vw, 26px);
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--white);
          text-shadow: 0 0 20px rgba(0,212,255,0.3);
        }

        .body-text {
          margin-top: 16px;
          font-size: clamp(12px, 1.8vw, 14px);
          font-weight: 300;
          color: var(--muted);
          letter-spacing: 0.05em;
          line-height: 1.9;
          max-width: 400px;
        }

        /* Coordinates readout */
        .coords {
          margin-top: 28px;
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .coord-item {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: rgba(0,212,255,0.5);
          text-transform: uppercase;
        }
        .coord-item span {
          color: rgba(0,212,255,0.85);
        }

        /* Buttons */
        .actions {
          margin-top: 40px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-home {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: transparent;
          border: 1px solid rgba(0,212,255,0.5);
          color: var(--cyan);
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .btn-home::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--cyan);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          z-index: -1;
        }
        .btn-home:hover {
          color: var(--void);
          border-color: var(--cyan);
          box-shadow: 0 0 30px rgba(0,212,255,0.4);
        }
        .btn-home:hover::before { transform: scaleX(1); }

        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: transparent;
          border: 1px solid rgba(200,210,255,0.2);
          color: var(--muted);
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 0.3s, color 0.3s;
        }
        .btn-back:hover {
          border-color: rgba(200,210,255,0.5);
          color: var(--white);
        }

        /* Corner decorations */
        .corner {
          position: absolute;
          width: 40px;
          height: 40px;
          z-index: 5;
          pointer-events: none;
          opacity: 0.4;
        }
        .corner-tl { top: 24px; left: 24px; border-top: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .corner-tr { top: 24px; right: 24px; border-top: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }
        .corner-bl { bottom: 24px; left: 24px; border-bottom: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .corner-br { bottom: 24px; right: 24px; border-bottom: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }

        /* Bottom status bar */
        .status-bar {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 32px;
          font-size: 9px;
          letter-spacing: 0.18em;
          color: rgba(0,212,255,0.35);
          text-transform: uppercase;
          white-space: nowrap;
        }

        .pulse-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 6px var(--cyan);
          animation: dotPulse 2s ease-in-out infinite;
          vertical-align: middle;
          margin-right: 6px;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.6); }
        }

        @media (max-width: 480px) {
          .corner { width: 24px; height: 24px; }
          .status-bar { gap: 16px; font-size: 8px; }
          .coords { gap: 14px; }
        }
      `}</style>

      <div className="universe">
        <canvas className="stars-canvas" ref={canvasRef} />

        {/* Nebula parallax layer */}
        <div className="nebula" ref={nebulaRef}>
          <div className="nebula-blob nb1" />
          <div className="nebula-blob nb2" />
          <div className="nebula-blob nb3" />
          <div className="nebula-blob nb4" />
        </div>

        {/* HUD corners */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Main content */}
        <div className={`content ${loaded ? "visible" : ""}`}>
          {/* Planet illustration */}
          <div className="planet-wrap">
            <div className="planet-ring" />
            <div className="planet" />
            <div className="moon-orbit">
              <div className="moon" />
            </div>
          </div>

          {/* 404 */}
          <div className="error-num">404</div>
          <div className="tagline">Signal Lost in Deep Space</div>

          <div className="divider" />

          <h1 className="headline">Page Not Found</h1>
          <p className="body-text">
            The coordinates you entered lead to an uncharted void. This sector of
            the universe holds no data — the page may have drifted beyond reach or
            was never mapped.
          </p>

          {/* Fake telemetry */}
          <div className="coords">
            <div className="coord-item">RA <span>∅ 00h 00m</span></div>
            <div className="coord-item">Dec <span>∅ +00° 00′</span></div>
            <div className="coord-item">Status <span>LOST</span></div>
          </div>

          <div className="actions">
            <Link href="/" className="btn-home">
              ⟵ Return to Base
            </Link>
            <Link href="/explore" className="btn-back">
              Explore Universe
            </Link>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="status-bar">
          <span><span className="pulse-dot" />System Online</span>
          <span>Deep Space Network</span>
          <span>ERR · HTTP 404</span>
        </div>
      </div>
    </>
  );
}