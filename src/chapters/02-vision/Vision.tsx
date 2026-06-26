import { useEffect, useRef } from "react";
import "./Vision.css";

/**
 * Return an array of [left%, top%, speed], each in [0,1) so JSX can
 * unroll stable positions without using Math.random in render.
 */
function genRain(n: number): [number, number, number][] {
  const a: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    a.push([Math.random(), Math.random(), 0.35 + Math.random() * 0.65]);
  }
  return a;
}

export default function Vision({ step }: { step: number }) {
  /* ── shared rain Canvas ref ── */
  const rainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = rainRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    cvs.width = 1920;
    cvs.height = 1080;

    const drops = genRain(180).map(([x, y, speed]) => ({
      x: x * 1920,
      y: y * 1080,
      speed: 4 + speed * 14,
      len: 18 + speed * 45,
    }));

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, 1920, 1080);
      for (const d of drops) {
        d.y += d.speed;
        if (d.y > 1080) {
          d.y = -d.len;
          d.x = Math.random() * 1920;
        }
        const alpha = 0.1 + (d.speed / 18) * 0.25;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 0.8, d.y + d.len);
        ctx.strokeStyle = `rgba(0,255,204,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  /* ================================================================
   * STEP 0 — 霓虹灯在雨幕中反射的特写
   * ================================================================ */
  if (step === 0) {
    return (
      <div className="vi-scene">
        {/* Rain canvas */}
        <canvas ref={rainRef} className="vi-rain vi-rain-heavy" />

        {/* Neon tubes — suspended */}
        <div className="vi-tubes-row">
          <div className="vi-tube vi-tube-cyan" />
          <div className="vi-tube vi-tube-magenta" />
        </div>

        {/* Reflection on wet ground — flipped, blurred */}
        <div className="vi-reflection-layer">
          <div className="vi-reflect-bar vi-reflect-cyan" />
          <div className="vi-reflect-bar vi-reflect-magenta" />
        </div>

        {/* Puddle / wet ground */}
        <div className="vi-puddle" />

        {/* Ripple rings */}
        <div className="vi-ripple-wrap">
          <div className="vi-ripple" />
          <div className="vi-ripple" />
          <div className="vi-ripple" />
        </div>

        {/* Tagline */}
        <div className="vi-tag">雨夜的城市，霓虹灯闪烁</div>
      </div>
    );
  }

  /* ================================================================
   * STEP 1 — 永远潮湿昏暗的环境氛围
   * ================================================================ */
  if (step === 1) {
    return (
      <div className="vi-scene">
        {/* Overhead pipe with condensation */}
        <div className="vi-pipe" />

        {/* Condensation drips — SVG for precise placement */}
        <svg className="vi-drips-svg" viewBox="0 0 1920 160" preserveAspectRatio="none">
          {[
            [180, 12], [340, 28], [510, 10], [680, 22], [790, 8],
            [960, 20], [1120, 6], [1350, 16], [1520, 24], [1680, 12],
            [1780, 18],
          ].map(([cx, h], i) => (
            <line
              key={i}
              x1={cx} y1={0} x2={cx} y2={h}
              stroke="rgba(0,255,204,0.18)"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* Wall streaks — condensation on surfaces */}
        {[100, 280, 460, 720, 900, 1100, 1340, 1560, 1750].map((x, i) => (
          <div
            key={i}
            className="vi-streak"
            style={{
              left: x,
              height: 280 + Math.sin(i * 2.1) * 120,
              animationDelay: `${0.3 + i * 0.13}s`,
            }}
          />
        ))}

        {/* Mist layers */}
        <div className="vi-mist-layer" />
        <div className="vi-mist-deep" />

        {/* Overhead dim light */}
        <div className="vi-overhead" />

        {/* Tagline */}
        <div className="vi-tag-alt">永远潮湿，永远昏暗</div>
      </div>
    );
  }

  /* ================================================================
   * STEP 2 — 色彩体系：紫色与青色冷暖对比
   * ================================================================ */
  if (step === 2) {
    return (
      <div className="vi-scene">
        {/* Rain canvas — faint */}
        <canvas ref={rainRef} className="vi-rain" style={{ opacity: 0.4 }} />

        {/* Dual glow backdrop */}
        <div className="vi-glow-stage">
          <div className="vi-glow-cyan-half" />
          <div className="vi-glow-magenta-half" />
        </div>

        {/* Center split bar */}
        <div className="vi-split-bar" />

        {/* Dual neon tube columns */}
        <div className="vi-dual-tubes">
          <div className="vi-col-tube vi-col-cyan" />
          <div className="vi-col-tube vi-col-magenta" />
        </div>

        {/* Color titles */}
        <div className="vi-col-title vi-title-cyan">CYAN</div>
        <div className="vi-col-title vi-title-magenta">MAGENTA</div>

        {/* Tagline */}
        <div className="vi-tag-last">紫色与青色，冷暖对撞</div>
      </div>
    );
  }

  return null;
}
