import { useEffect, useRef, useMemo } from "react";
import "./Reality.css";

/* ──────────────────────────────────────────────────────────
 * Chapter 06 · reality — 从预言到现实
 *
 * Step 0 — Surveillance capitalism: massive camera lens SVG
 *          with live scanlines, data flow arteries, redaction
 *          rectangles, and a pulsing "watching you" eye.
 * Step 1 — Algorithm + gig economy: glowing UI grid with
 *          gig labels, routing lines, and statistical overlays
 *          that evoke delivery-app / platform governance.
 * Step 2 — Asian creators reclaiming subjectivity: animated
 *          neon signs and works gallery staged as a takeover
 *          — symbols originally consumed by the West as
 *          "exotic" now wielded by their own authors.
 * Step 3 — AI aesthetic inflation: Canvas flood of cloned
 *          cyberpunk cards multiplying and fading, with a
 *          counter ticking up — the mechanics of symbol
 *          replication hollowing out meaning.
 * ────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════
 * Pre-generated positions — no Math.random in JSX render
 * ═══════════════════════════════════════════════════════════ */

const SCANLINES_Y = Array.from({ length: 30 }, (_, i) => 40 + i * 35);
const DATA_PIPES = [
  { x: 60, w: 4, speed: 2.2 },
  { x: 200, w: 3, speed: 1.6 },
  { x: 380, w: 5, speed: 2.8 },
  { x: 560, w: 3, speed: 1.9 },
  { x: 740, w: 4, speed: 2.4 },
  { x: 920, w: 2, speed: 1.5 },
  { x: 1080, w: 5, speed: 3.0 },
  { x: 1260, w: 3, speed: 2.1 },
  { x: 1440, w: 4, speed: 2.6 },
  { x: 1620, w: 3, speed: 1.8 },
  { x: 1780, w: 4, speed: 2.3 },
];

const GIG_LABELS = [
  { text: "外卖骑手", row: 0, col: 0 },
  { text: "网约车", row: 0, col: 1 },
  { text: "AI 标注", row: 0, col: 2 },
  { text: "内容审核", row: 1, col: 0 },
  { text: "算法调度", row: 1, col: 1 },
  { text: "评分系统", row: 1, col: 2 },
];

const ASIAN_WORKS = [
  { cn: "九龙城寨·再思考", en: "Kowloon Reclaimed", x: 3, y: 3 },
  { cn: "攻壳·本土读解", en: "Ghost in the Locale", x: 41, y: 5 },
  { cn: "赛博 2077·Mod", en: "Mod as Agency", x: 3, y: 48 },
  { cn: "霓虹·不是奇观", en: "Neon is Not Spectacle", x: 41, y: 50 },
  { cn: "Asian Futurism", en: "We Write Our Own", x: 22, y: 30 },
];

export default function Reality({ step }: { step: number }) {
  /* ================================================================
   * STEP 0 — Surveillance camera + data streams
   * ================================================================ */
  if (step === 0) {
    return <Step0Surveillance />;
  }

  /* ================================================================
   * STEP 1 — Algorithm interface + gig economy
   * ================================================================ */
  if (step === 1) {
    return <Step1GigEconomy />;
  }

  /* ================================================================
   * STEP 2 — Asian creators reclaiming subjectivity
   * ================================================================ */
  if (step === 2) {
    return <Step2AsianReclaim />;
  }

  /* ================================================================
   * STEP 3 — AI flood / symbol inflation
   * ================================================================ */
  if (step === 3) {
    return <Step3Inflation />;
  }

  return null;
}

/* ═══════════════════════════════════════════════════════════
 * STEP 0 — Surveillance capitalism
 *
 * A giant camera lens dominates center screen, encircled by
 * data pipes flowing upward (streaming user data to the cloud),
 * periodic scanlines washing across the frame, and redaction
 * rectangles that suggest faces/citizens being tracked.
 * ═══════════════════════════════════════════════════════════ */

function Step0Surveillance() {
  const pipeCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = pipeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 1920;
    canvas.height = 1080;

    const particles: { x: number; y: number; speed: number; alpha: number; pipeIdx: number }[] = [];
    for (let i = 0; i < 200; i++) {
      const pi = i % DATA_PIPES.length;
      particles.push({
        x: DATA_PIPES[pi]!.x + (Math.random() - 0.5) * 8,
        y: Math.random() * 1080,
        speed: 1 + DATA_PIPES[pi]!.speed * (Math.random() * 1.2),
        alpha: 0.15 + Math.random() * 0.5,
        pipeIdx: pi,
      });
    }

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, 1920, 1080);

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = 1090;
          p.x = DATA_PIPES[p.pipeIdx]!.x + (Math.random() - 0.5) * 8;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,204,${p.alpha})`;
        ctx.fill();
      });
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="re-scene">
      {/* Data flow canvas behind camera */}
      <canvas ref={pipeCanvasRef} className="re-pipe-canvas" />

      {/* Scanlines sweeping down */}
      <div className="re-scan-wrap">
        {SCANLINES_Y.map((y, i) => (
          <div
            key={i}
            className="re-scanline"
            style={{ top: y, animationDelay: `${i * 0.07}s` }}
          />
        ))}
      </div>

      {/* Redaction rectangles — tracked faces / subjects */}
      <div className="re-redactions">
        {[
          { x: 120, y: 280, w: 90, h: 110 },
          { x: 400, y: 180, w: 70, h: 85 },
          { x: 680, y: 320, w: 85, h: 100 },
          { x: 1050, y: 210, w: 75, h: 95 },
          { x: 1400, y: 290, w: 90, h: 105 },
          { x: 1680, y: 190, w: 80, h: 98 },
        ].map((r, i) => (
          <div
            key={i}
            className="re-redact"
            style={{
              left: r.x,
              top: r.y,
              width: r.w,
              height: r.h,
              animationDelay: `${0.5 + i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Giant camera lens SVG */}
      <svg className="re-lens-svg" viewBox="0 0 1920 1080">
        <defs>
          <radialGradient id="re-lens-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--surface)" />
            <stop offset="60%" stopColor="var(--surface-2)" />
            <stop offset="100%" stopColor="var(--surface-3)" />
          </radialGradient>
          <radialGradient id="re-lens-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.12" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="re-lens-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Outer bezel */}
        <circle cx="960" cy="460" r="220" fill="url(#re-lens-bg)" className="re-lens-outer" />
        <circle cx="960" cy="460" r="190" fill="none" stroke="var(--surface-3)" strokeWidth="8" className="re-lens-ring-1" />
        <circle cx="960" cy="460" r="175" fill="none" stroke="var(--surface-2)" strokeWidth="3" />

        {/* Lens blades — 8 segments */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const x1 = 960 + Math.cos(angle) * 60;
          const y1 = 460 + Math.sin(angle) * 60;
          const x2 = 960 + Math.cos(angle) * 165;
          const y2 = 460 + Math.sin(angle) * 165;
          return (
            <line
              key={`blade-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--surface-3)"
              strokeWidth="2"
              opacity="0.5"
            />
          );
        })}

        {/* Inner aperture — the "eye" */}
        <circle cx="960" cy="460" r="55" fill="none" stroke="var(--accent)" strokeWidth="2" className="re-aperture" />
        <circle cx="960" cy="460" r="45" fill="var(--accent-glow)" opacity="0.08" className="re-aperture-glow" />
        <circle cx="960" cy="460" r="18" fill="var(--accent)" opacity="0.2" filter="url(#re-lens-blur)" className="re-aperture-core" />

        {/* Red LED recording dot */}
        <circle cx="1120" cy="310" r="8" fill="rgba(255,0,170,0.9)" className="re-rec-dot" />
        <rect x="1114" y="304" width="12" height="12" rx="2" fill="none" stroke="rgba(255,0,170,0.5)" strokeWidth="1" />

        {/* REC text */}
        <text x="1140" y="316" className="re-rec-label" fontFamily="var(--font-mono)" fontSize="14" fill="rgba(255,0,170,0.8)" letterSpacing="0.15em">REC</text>

        {/* Focus brackets — corners */}
        {[
          { x: 720, y: 240 },
          { x: 1140, y: 240 },
          { x: 720, y: 640 },
          { x: 1140, y: 640 },
        ].map((c, i) => {
          const hFlip = i % 2 === 1 ? 1 : -1;
          const vFlip = i < 2 ? 1 : -1;
          return (
            <g key={`focus-${i}`}>
              <line
                x1={c.x}
                y1={c.y}
                x2={c.x + 50 * hFlip}
                y2={c.y}
                stroke="var(--accent)"
                strokeWidth="2"
                opacity="0.25"
                className="re-focus-corner"
              />
              <line
                x1={c.x}
                y1={c.y}
                x2={c.x}
                y2={c.y + 40 * vFlip}
                stroke="var(--accent)"
                strokeWidth="2"
                opacity="0.25"
                className="re-focus-corner"
              />
            </g>
          );
        })}
      </svg>

      {/* HUD overlay text — tracking metadata */}
      <div className="re-hud-left">
        <div className="re-hud-row">SYS.TRACKING // ACTIVE</div>
        <div className="re-hud-row">SUBJECTS // ▮▮▮▮▮▮ 847</div>
        <div className="re-hud-row">UPLINK // 2.4 TB/s</div>
      </div>
      <div className="re-hud-right">
        <div className="re-hud-row">FACIAL.ID // VERIFIED</div>
        <div className="re-hud-row">SOCIAL.SCORE // CALC</div>
        <div className="re-hud-row">GEO.FENCE // LOCKED</div>
      </div>

      {/* Big word: 监控 */}
      <div className="re-big-word">监控</div>
      <div className="re-big-sub">SURVEILLANCE CAPITALISM</div>

      {/* Tagline */}
      <div className="re-tagline">从预言变成现实</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * STEP 1 — Algorithm interface + gig economy
 *
 * A platform-style UI grid with gig economy labels appearing
 * one by one. Behind them, algorithmic routing lines connect
 * nodes like a delivery app's dispatch system. A large clock
 * counter suggests real-time tracking / algorithmic time
 * pressure. The whole composition evokes the cold, optimized
 * feel of platform labor governance.
 * ═══════════════════════════════════════════════════════════ */

function Step1GigEconomy() {
  const routeCanvasRef = useRef<HTMLCanvasElement>(null);

  // Pre-generate fixed route nodes
  const routeNodes = useMemo(() => {
    const nodes: { x: number; y: number }[] = [];
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: 80 + (i % 6) * 350 + (Math.random() - 0.5) * 60,
        y: 100 + Math.floor(i / 6) * 280 + (Math.random() - 0.5) * 60,
      });
    }
    return nodes;
  }, []);

  useEffect(() => {
    const canvas = routeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 1920;
    canvas.height = 1080;

    let frame = 0;
    let elapsed = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, 1920, 1080);

      // Draw routing lines
      routeNodes.forEach((a, i) => {
        routeNodes.forEach((b, j) => {
          if (i >= j) return;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 450) return;

          const alpha = 0.03 + 0.03 * Math.sin(elapsed * 1.5 + i * 0.7);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,255,204,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });

        // Node glow
        const pulse = 0.3 + 0.3 * Math.sin(elapsed * 2 + i * 0.5);
        ctx.beginPath();
        ctx.arc(a.x, a.y, 3 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,204,${0.15 + pulse * 0.2})`;
        ctx.fill();
      });

      // Moving data packets along routes
      routeNodes.forEach((a, i) => {
        const next = routeNodes[(i + 1) % routeNodes.length]!;
        const t = ((elapsed * 0.3 + i * 0.7) % 1);
        const px = a.x + (next.x - a.x) * t;
        const py = a.y + (next.y - a.y) * t;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,0,170,0.35)`;
        ctx.fill();
      });
    };
    const startTime = performance.now();
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [routeNodes]);

  return (
    <div className="re-scene">
      {/* Algorithmic route network canvas */}
      <canvas ref={routeCanvasRef} className="re-route-canvas" />

      {/* ── Central unified layout block ── */}
      <div className="re-step1-layout">
        {/* Platform UI frame — centered, balanced width */}
        <div className="re-platform">
          {/* Top bar — platform header */}
          <div className="re-platform-top">
            <div className="re-platform-logo">■ PLATFORM v3.7</div>
            <div className="re-platform-status">
              <span className="re-status-dot" />
              LIVE
            </div>
          </div>

          {/* Gig label grid */}
          <div className="re-gig-grid">
            {GIG_LABELS.map((g, i) => (
              <div
                key={i}
                className="re-gig-cell"
                style={{ animationDelay: `${0.6 + i * 0.25}s` }}
              >
                <div className="re-gig-label">{g.text}</div>
                <div className="re-gig-metric">
                  {["23.7s", "4.92★", "98.3%", "12.4ms", "8,472↑", "+0.3Δ"][i]}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom strip: algorithmic dispatch bar */}
          <div className="re-dispatch-bar">
            <div className="re-dispatch-line" />
            <div className="re-dispatch-text">ALGORITHMIC DISPATCH · 算法调度中</div>
            <div className="re-dispatch-dot-trail">
              <span className="re-dispatch-dot" />
              <span className="re-dispatch-dot" />
              <span className="re-dispatch-dot" />
            </div>
          </div>
        </div>

        {/* ── Sidebar ticker — now right-aligned with proper spacing ── */}
        <div className="re-ticker">
          <div className="re-ticker-row">
            <span className="re-ticker-key">接单</span>
            <span className="re-ticker-val">847,293</span>
          </div>
          <div className="re-ticker-row">
            <span className="re-ticker-key">在线</span>
            <span className="re-ticker-val">42,108</span>
          </div>
          <div className="re-ticker-row">
            <span className="re-ticker-key">超时率</span>
            <span className="re-ticker-val re-ticker-warn">6.8%</span>
          </div>
          <div className="re-ticker-row">
            <span className="re-ticker-key">今日收入</span>
            <span className="re-ticker-val">87.4</span>
          </div>
        </div>
      </div>

      {/* ── Unified header group ── */}
      <div className="re-step1-header">
        <div className="re-big-word re-big-word-sm">零工经济</div>
        <div className="re-big-sub">算法治理每一秒</div>
      </div>

      {/* Tagline */}
      <div className="re-tagline">监控、算法、零工经济</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * STEP 2 — Asian creators reclaiming subjectivity
 *
 * Five glowing placards spread across the screen, each
 * bearing a work title in Chinese and English. The layout
 * evokes a gallery wall — but the signs are neon, not
 * museum labels. Slowly they pulse with agency. A large
 * Chinese character "夺回" (reclaim) anchors the screen
 * as the central statement.
 * ═══════════════════════════════════════════════════════════ */

function Step2AsianReclaim() {
  return (
    <div className="re-scene">
      {/* Ambient cyberspace glow */}
      <div className="re-reclaim-bg" />

      {/* ── Central unified frame ── */}
      <div className="re-reclaim-frame">
        {/* Central anchor — "夺回" as the gravitational core */}
        <div className="re-reclaim-core">
          <div className="re-reclaim-anchor">夺回</div>
          <div className="re-reclaim-anchor-sub">RECLAIM</div>
          <div className="re-reclaim-rule" />
        </div>

        {/* ── Placid grid: 5 placards in balanced 3+2 layout ── */}
        <div className="re-reclaim-grid">
          {ASIAN_WORKS.map((w, i) => (
            <div key={i} className="re-reclaim-placard"
              style={{ animationDelay: `${0.5 + i * 0.3}s` } as React.CSSProperties}>
              {/* Glow aura */}
              <div className="re-reclaim-placard-glow" />
              {/* Card body */}
              <div className="re-reclaim-placard-body">
                <div className="re-reclaim-placard-cn">{w.cn}</div>
                <div className="re-reclaim-placard-en">{w.en}</div>
              </div>
              {/* Corner accent */}
              <span className="re-reclaim-placard-cnr re-reclaim-placard-cnr-tl" />
              <span className="re-reclaim-placard-cnr re-reclaim-placard-cnr-br" />
            </div>
          ))}
        </div>

        {/* ── Connecting thread — a dashed arc linking placards to the core ── */}
        <svg className="re-reclaim-links" viewBox="0 0 1920 1080">
          <defs>
            <radialGradient id="re-core-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Pulse ring around core */}
          <circle cx="960" cy="440" r="200" fill="none" stroke="var(--accent)" strokeWidth="0.8"
            strokeDasharray="4 16" opacity="0.15" className="re-reclaim-pulse" />
          <circle cx="960" cy="440" r="280" fill="url(#re-core-pulse)" opacity="0.12"
            className="re-reclaim-pulse" style={{ animationDelay: "0.6s" }} />
          {/* Thin rays from core to placard regions */}
          {[
            [960, 440, 320, 480],
            [960, 440, 1600, 400],
            [960, 440, 420, 700],
            [960, 440, 1480, 680],
            [960, 440, 960, 680],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="var(--accent)" strokeWidth="0.5" opacity="0.06"
              strokeDasharray="3 18"
              className="re-reclaim-ray" style={{ animationDelay: `${1.8 + i * 0.3}s` }} />
          ))}
        </svg>
      </div>

      {/* Subtle attribution */}
      <div className="re-reclaim-attr">
        在这场叙事中，亚裔创作者不再是被凝视的「异域奇观」
      </div>

      {/* Tagline */}
      <div className="re-tagline">赛博朋克正在成真</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * STEP 3 — AI aesthetic inflation / symbol devaluation
 *
 * A canvas-driven flood effect: cards bearing "CYBER" in
 * cyan multiply endlessly, initially crisp and bright, then
 * fading in opacity, shrinking, and losing color — the visual
 * equivalent of supply outstripping meaning. A large counter
 * ticks upward in the center, counting the number of AI-
 * generated copies, while a red warning label declares
 * "符号通胀".
 * ═══════════════════════════════════════════════════════════ */

function Step3Inflation() {
  const floodCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = floodCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 1920;
    canvas.height = 1080;

    interface Card {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
      text: string;
      phase: number;
    }

    const cards: Card[] = [];
    const cardTexts = ["CYBER", "PUNK", "NEON", "AI", "2077", "GHOST", "HACK", "GLITCH", "DATA", "VOID"];

    let frame = 0;
    let elapsed = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      elapsed = (now - startTime) / 1000;

      // Spawn new cards — rate increases over time
      const spawnRate = 3 + elapsed * 2.5;
      const spawnChance = Math.min(spawnRate / 60, 0.8);
      for (let i = 0; i < 4; i++) {
        if (Math.random() < spawnChance) {
          const lifePhase = Math.random();
          cards.push({
            x: Math.random() * 1920,
            y: Math.random() * 1080,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 0.8 - 0.3,
            size: 40 + Math.random() * 80,
            alpha: 0.4 + Math.random() * 0.4,
            life: 0,
            maxLife: 2 + Math.random() * 5,
            text: cardTexts[Math.floor(Math.random() * cardTexts.length)]!,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      ctx.clearRect(0, 0, 1920, 1080);

      // Draw cards
      for (let i = cards.length - 1; i >= 0; i--) {
        const c = cards[i]!;
        c.life += 1 / 60;
        c.x += c.vx;
        c.y += c.vy;

        const progress = c.life / c.maxLife;
        // Cards fade in, then fade out toward end of life
        const alphaFade = progress < 0.15
          ? progress / 0.15
          : progress > 0.75
            ? (1 - progress) / 0.25
            : 1;
        const alpha = c.alpha * alphaFade * 0.7;

        if (c.life > c.maxLife || alpha < 0.005) {
          cards.splice(i, 1);
          continue;
        }

        // Card background
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "rgba(10,15,28,0.85)";
        ctx.strokeStyle = `rgba(0,255,204,${alpha * 0.8})`;
        ctx.lineWidth = 0.5;

        const w = c.size * 1.4;
        const h = c.size * 0.6;
        ctx.fillRect(c.x - w / 2, c.y - h / 2, w, h);
        ctx.strokeRect(c.x - w / 2, c.y - h / 2, w, h);

        // Text
        ctx.fillStyle = `rgba(0,255,204,${alpha})`;
        ctx.font = `${c.size * 0.22}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(c.text, c.x, c.y);

        ctx.restore();
      }

      // Faint grid floor
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = "#00ffcc";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < 1920; gx += 80) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, 1080);
        ctx.stroke();
      }
      for (let gy = 0; gy < 1080; gy += 80) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(1920, gy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const startTime = performance.now();
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="re-scene">
      {/* Canvas flood */}
      <canvas ref={floodCanvasRef} className="re-flood-canvas" />

      {/* Center counter — the big number of copies */}
      <div className="re-inflation-counter">
        <div className="re-inflation-num">
          <span className="re-inflation-label">AI COPIES</span>
          <span className="re-inflation-value">∞</span>
        </div>
      </div>

      {/* Warning label */}
      <div className="re-inflation-warn">
        <span className="re-warn-tri">▲</span>
        <span>符号通胀</span>
      </div>

      {/* Sub explanation */}
      <div className="re-inflation-sub">
        AI 生成正在无限复制赛博朋克的所有视觉符号
      </div>

      {/* Tagline */}
      <div className="re-tagline re-tagline-warn">只是现在变了个样</div>
    </div>
  );
}
