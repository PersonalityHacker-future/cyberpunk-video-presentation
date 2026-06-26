import { useEffect, useRef } from "react";
import "./Future.css";

/** Solarpunk icon — sunburst with tech mesh */
function SolarpunkIcon() {
  return (
    <svg className="fu-card-icon" viewBox="0 0 110 110" fill="none">
      {/* Solar rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r1 = 30;
        const r2 = 52;
        const x1 = 55 + r1 * Math.cos(angle);
        const y1 = 55 + r1 * Math.sin(angle);
        const x2 = 55 + r2 * Math.cos(angle);
        const y2 = 55 + r2 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.6 + (i % 3 === 0 ? 0.3 : 0)}
          />
        );
      })}
      {/* Center sun circle */}
      <circle cx="55" cy="55" r="18" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.8" />
      {/* Inner tech grid */}
      <circle cx="55" cy="55" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="55" cy="55" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" opacity="0.25" />
      {/* Leaf / growth motif */}
      <path
        d="M55,37 Q62,25 72,28 Q68,38 66,48 Q60,42 55,37Z"
        fill="currentColor" opacity="0.7"
      />
      <path
        d="M55,37 Q48,25 38,28 Q42,38 44,48 Q50,42 55,37Z"
        fill="currentColor" opacity="0.7"
      />
    </svg>
  );
}

/** Biopunk icon — DNA helix inside a circuit frame */
function BiopunkIcon() {
  return (
    <svg className="fu-card-icon" viewBox="0 0 110 110" fill="none">
      {/* Circuit frame — hexagon */}
      <polygon
        points="55,12 94,34 94,76 55,98 16,76 16,34"
        stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"
      />
      {/* Inner hex */}
      <polygon
        points="55,22 84,39 84,71 55,88 26,71 26,39"
        stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" fill="none" opacity="0.3"
      />
      {/* DNA double helix */}
      {Array.from({ length: 7 }).map((_, i) => {
        const y = 24 + i * 10;
        const offset = Math.sin((i * Math.PI) / 3) * 12;
        return (
          <line
            key={`dna-${i}`}
            x1={55 - offset} y1={y} x2={55 + offset} y2={y}
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            opacity={0.65 + i * 0.04}
          />
        );
      })}
      {/* Backbone lines */}
      <path
        d="M43,22 Q43,55 43,88"
        stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"
      />
      <path
        d="M67,22 Q67,55 67,88"
        stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"
      />
      {/* Node dots along backbone */}
      {[0.15, 0.3, 0.45, 0.55, 0.7, 0.85].map((frac, i) => (
        <circle key={`nl-${i}`} cx="43" cy={22 + frac * 66} r="2.5" fill="currentColor" opacity="0.6" />
      ))}
      {[0.15, 0.3, 0.45, 0.55, 0.7, 0.85].map((frac, i) => (
        <circle key={`nr-${i}`} cx="67" cy={22 + frac * 66} r="2.5" fill="currentColor" opacity="0.6" />
      ))}
    </svg>
  );
}

/** Hopepunk icon — small flame / candle in darkness */
function HopepunkIcon() {
  return (
    <svg className="fu-card-icon" viewBox="0 0 110 110" fill="none">
      {/* Dark void circle */}
      <circle cx="55" cy="55" r="50" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="none" />
      {/* Outer ring fragments — community / solidarity */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 55 + 44 * Math.cos(rad);
        const y = 55 + 44 * Math.sin(rad);
        return (
          <circle key={angle} cx={x} cy={y} r="4" fill="currentColor" opacity="0.35" />
        );
      })}
      {/* Connecting ring */}
      <circle cx="55" cy="55" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="4 12" opacity="0.25" fill="none" />
      {/* Central flame */}
      <path
        d="M55,62 Q58,52 55,38 Q52,52 55,62Z"
        fill="currentColor" opacity="0.85"
      >
        <animate attributeName="opacity" values="0.85;0.5;0.85" dur="1.5s" repeatCount="indefinite" />
      </path>
      {/* Inner flame flicker */}
      <path
        d="M55,58 Q56.5,52 55,45 Q53.5,52 55,58Z"
        fill="currentColor" opacity="0.55"
      >
        <animate attributeName="opacity" values="0.55;0.3;0.55" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
      </path>
      {/* Warm halo */}
      <circle cx="55" cy="55" r="16" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none">
        <animate attributeName="r" values="16;22;16" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function Future({ step }: { step: number }) {
  /* ─── Step 0 ─── sub-genre icon cards */
  if (step === 0) {
    return (
      <div className="fu-scene">
        <div className="fu-bg-grid" />

        <div className="fu-step0-wrap">
          <div className="fu-step0-title">赛博朋克的演进分化</div>

          <div className="fu-genre-row">
            {/* Solarpunk */}
            <div className="fu-genre-card fu-card-solar">
              <SolarpunkIcon />
              <div className="fu-card-label">Solarpunk</div>
              <div className="fu-card-desc">自然与科技共生</div>
            </div>

            {/* Biopunk */}
            <div className="fu-genre-card fu-card-bio">
              <BiopunkIcon />
              <div className="fu-card-label">Biopunk</div>
              <div className="fu-card-desc">基因取代机械</div>
            </div>

            {/* Hopepunk */}
            <div className="fu-genre-card fu-card-hope">
              <HopepunkIcon />
              <div className="fu-card-label">Hopepunk</div>
              <div className="fu-card-desc">绝望中坚持希望</div>
            </div>
          </div>
        </div>

        <div className="fu-tagline">Solarpunk、Biopunk、Hopepunk。</div>
      </div>
    );
  }

  /* ─── Step 1 ─── 2077 shockwave spread */
  if (step === 1) {
    return (
      <div className="fu-scene">
        <div className="fu-bg-grid" />

        <div className="fu-step1-wrap">
          {/* Epicenter */}
          <div className="fu-epicenter">2077</div>

          {/* Shockwave rings */}
          <div className="fu-shock-ring" />
          <div className="fu-shock-ring" />
          <div className="fu-shock-ring" />
          <div className="fu-shock-ring" />
          <div className="fu-shock-ring" />

          {/* Spread copies — inner ring */}
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>

          {/* Spread copies — outer ring */}
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>
          <div className="fu-spread-tag">2077</div>

          {/* Sub-text */}
          <div className="fu-step1-sub">从小众亚文化 → 全球大众现象</div>
        </div>

        <div className="fu-tagline" style={{ animationDelay: "2.4s" }}>
          赛博朋克已经分裂。
        </div>
      </div>
    );
  }

  /* ─── Step 2 ─── hollow surface vs real core */
  if (step === 2) {
    return (
      <div className="fu-scene">
        <div className="fu-bg-grid" />

        <div className="fu-step2-wrap">
          {/* Left — hollow 赛博风 */}
          <div className="fu-split-half fu-hollow">
            <div className="fu-hollow-grid">
              <div className="fu-hollow-tag">霓虹</div>
              <div className="fu-hollow-tag">雨夜</div>
              <div className="fu-hollow-tag">招牌</div>
              <div className="fu-hollow-tag">全息</div>
              <div className="fu-hollow-tag">义体</div>
              <div className="fu-hollow-tag">线缆</div>
              <div className="fu-hollow-tag">霓虹</div>
              <div className="fu-hollow-tag">雨夜</div>
              <div className="fu-hollow-tag">招牌</div>
              <div className="fu-hollow-tag">全息</div>
              <div className="fu-hollow-tag">义体</div>
              <div className="fu-hollow-tag">线缆</div>
            </div>
            <div className="fu-split-label">赛 博 风</div>
          </div>

          {/* Center divider */}
          <div className="fu-split-div" />

          {/* Right — real core */}
          <div className="fu-split-half fu-core">
            <div className="fu-core-grit" />
            <div className="fu-core-signs">
              <div className="fu-core-sign">高科技低生活</div>
              <div className="fu-core-sign">社会批判内核</div>
              <div className="fu-core-sign">阶级张力美学</div>
            </div>
            <div className="fu-split-label">真 · 赛 博 朋 克</div>
          </div>
        </div>

        <div className="fu-tagline" style={{ animationDelay: "1.1s" }}>
          AI复制了它的所有符号。
        </div>
      </div>
    );
  }

  /* ─── Step 3 ─── closing ceremony with vaporwave chromatic aberration finale */
  if (step === 3) {
    return <Step3Finale />;
  }

  return null;
}

/* ═══════════════════════════════════════════════════════════════
 * STEP 3 — Vaporwave Chromatic Aberration finale
 *
 * Dense cyberpunk backdrop with:
 *   - Neon rain (Canvas slant-drops + cyan/magenta particle streams)
 *   - Vertical city silhouette in SVG (dark towers + lit windows)
 *   - Hologram ring echoes animating outward
 *   - Ghost tag drift (CYBERPUNK / AI × scattered, fading)
 *   - Chromatic Aberration text (3-layer: cyan offset / magenta offset / orange core)
 *   - Glitch scan lines + gradient underline
 *   - Persistent grid from neon-cyber theme
 * ═══════════════════════════════════════════════════════════════ */

const GHOST_TAGS_3 = [
  { text: "CYBERPUNK", x: 80,  y: 120, delay: "0s" },
  { text: "AI ×",       x: 1520, y: 180, delay: "1.2s" },
  { text: "CYBERPUNK", x: 560, y: 880, delay: "0.6s" },
  { text: "AI ×",       x: 280, y: 700, delay: "1.8s" },
  { text: "CYBERPUNK", x: 1300, y: 800, delay: "0.3s" },
  { text: "AI ×",       x: 820, y: 100, delay: "1.5s" },
  { text: "CYBERPUNK", x: 940, y: 940, delay: "0.9s" },
  { text: "AI ×",       x: 1580, y: 620, delay: "2.1s" },
];

function Step3Finale() {
  return (
    <div className="fu-scene fu-scene-deep">
      {/* Theme grid backdrop */}
      <div className="fu-bg-grid" />

      {/* ── Canvas: neon-rain + particle streams ── */}
      <canvas className="fu-finale-rain" id="fu-finale-rain-canvas" />

      {/* ── SVG: vertical city silhouette ── */}
      <svg className="fu-finale-city" viewBox="0 0 1920 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="fu-fc-fade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--surface-2)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--surface)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Towers rising from bottom */}
        {[
          [20, 380, 90, 220], [130, 320, 60, 280], [210, 410, 80, 190],
          [310, 260, 110, 340], [440, 370, 70, 230], [530, 220, 140, 380],
          [690, 340, 80, 260], [790, 280, 100, 320], [910, 390, 60, 210],
          [990, 240, 160, 360], [1170, 350, 90, 250], [1280, 290, 130, 310],
          [1430, 380, 70, 220], [1520, 310, 80, 290], [1620, 400, 100, 200],
          [1740, 270, 110, 330],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="url(#fu-fc-fade)"
            rx="2" className="fu-fc-tower" style={{ animationDelay: `${i * 0.06}s` }} />
        ))}

        {/* Accent tower — slightly taller, cyan edge */}
        <rect x="570" y="140" width="90" height="460" fill="var(--accent-soft)"
          rx="3" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.35"
          className="fu-fc-tower" style={{ animationDelay: "0.5s" }} />

        {/* Scattered lit windows */}
        {Array.from({ length: 120 }).map((_, i) => (
          <rect key={`fw-${i}`}
            x={40 + (i * 173) % 1780}
            y={340 + (i * 89) % 250}
            width={4 + (i % 3) * 3}
            height={5 + (i % 4) * 2}
            fill="var(--accent)"
            opacity={0.08 + (i % 5) * 0.03}
            className="fu-fc-win" style={{ animationDelay: `${(i * 0.07) % 2}s` }} />
        ))}
      </svg>

      {/* ── Hologram ring echoes ── */}
      <div className="fu-holo-echoes">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="fu-holo-echo-ring"
            style={{ animationDelay: `${n * 0.8}s` }} />
        ))}
      </div>

      {/* ── Ghost tags ── */}
      <div className="fu-ghost-tags">
        {GHOST_TAGS_3.map((tag, i) => (
          <div key={i} className="fu-ghost-tag"
            style={{ left: tag.x, top: tag.y, animationDelay: tag.delay }}>
            {tag.text}
          </div>
        ))}
      </div>

      {/* ── Closing question: Vaporwave Chromatic Aberration ── */}
      <div className="fu-close-stage">
        <div className="fu-close-text">
          <span className="fu-ca-layer fu-ca-cyan">未来，到底会怎样？</span>
          <span className="fu-ca-layer fu-ca-magenta">未来，到底会怎样？</span>
          <span className="fu-ca-layer fu-ca-core">未来，到底会怎样？</span>
        </div>
        <div className="fu-close-underline" />
        <div className="fu-close-glitch-line" />
        <div className="fu-close-glitch-line fu-close-glitch-line-2" />
      </div>

      {/* Inline canvas init */}
      <InitRainCanvas />
    </div>
  );
}

/* Inline component that kicks off the rain canvas once mounted */
function InitRainCanvas() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const el = document.getElementById('fu-finale-rain-canvas') as HTMLCanvasElement | null;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    el.width = 1920;
    el.height = 1080;

    interface Drop { x: number; y: number; speed: number; len: number; drift: number; color: string }
    const drops: Drop[] = [];
    const cy = 'rgba(0,255,204,%a)';
    const mg = 'rgba(255,0,170,%a)';
    for (let i = 0; i < 260; i++) {
      drops.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        speed: 7 + Math.random() * 16,
        len: 22 + Math.random() * 55,
        drift: 0.8 + Math.random() * 2.4,
        color: i % 3 === 0 ? mg : cy,
      });
    }

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, 1920, 1080);

      drops.forEach((d) => {
        d.y += d.speed;
        d.x += d.drift;
        if (d.y > 1100) { d.y = -d.len; d.x = Math.random() * 1920; }
        if (d.x > 1940) d.x = -20;

        const alpha = 0.06 + (d.speed / 20) * 0.22;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.drift * 2, d.y + d.len);
        ctx.strokeStyle = d.color.replace('%a', alpha.toFixed(2));
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}