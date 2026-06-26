import { useEffect, useRef, useMemo } from "react";
import "./Body.css";

/* ──────────────────────────────────────────────────────────
 * Chapter 05 · body — 身体改造
 *
 * Step 0 — Prosthetic connection: SVG with sliding mechanical
 *          arm, concentric port rings, floating particles.
 * Step 1 — Subdermal circuits: Canvas‑drawn circuit trees
 *          under a warm skin‑gradient overlay.
 * Step 2 — Fusion: Split‑screen SVG, metal vs flesh, center
 *          dissolve band with crossing particles.
 * ────────────────────────────────────────────────────────── */

export default function Body({ step }: { step: number }) {
  /* ─── Step 0: SVG prosthetic closeup ─── */
  if (step === 0) {
    return (
      <div className="bo-scene">
        <div className="bo-step0-wrap">
          <svg className="bo-step0-svg" viewBox="0 0 1920 1080">

            <defs>
              {/* Metal gradient — cool cyan-tinted dark alloy */}
              <linearGradient id="bo-mg" x1="0" y1="0" x2="1" y2="0.2">
                <stop offset="0%" stopColor="var(--surface-2)" />
                <stop offset="45%" stopColor="var(--surface-3)" />
                <stop offset="100%" stopColor="var(--surface-2)" />
              </linearGradient>

              {/* Flesh gradient — warm organic, hints at living tissue */}
              <linearGradient id="bo-fl" x1="1" y1="0" x2="0" y2="0.15">
                <stop offset="0%" stopColor="#1a1118" />
                <stop offset="40%" stopColor="#23161e" />
                <stop offset="100%" stopColor="#2d1d24" />
              </linearGradient>

              {/* Inner connection ring gradient */}
              <radialGradient id="bo-ring-grad" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="transparent" />
                <stop offset="85%" stopColor="var(--accent)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
              </radialGradient>

              {/* Fusion glow blur */}
              <filter id="bo-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" />
              </filter>
              <filter id="bo-glow-lg" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="12" />
              </filter>

              {/* Metal texture pattern — machined panel lines */}
              <pattern id="bo-panels" width="40" height="28" patternUnits="userSpaceOnUse">
                <line x1="0" y1="28" x2="40" y2="28" stroke="var(--surface-3)" strokeWidth="0.8" opacity="0.5" />
                <line x1="20" y1="0" x2="20" y2="28" stroke="var(--surface-3)" strokeWidth="0.4" opacity="0.25" />
              </pattern>
            </defs>

            {/* ── Background dark field ── */}
            <rect x="0" y="0" width="1920" height="1080" fill="var(--shell)" />

            {/* ── Faint grid for orientation ── */}
            <circle cx="960" cy="540" r="1.5" fill="var(--text-faint)" opacity="0.15" />

            {/* ── Mechanical arm (left side) — slides in ── */}
            <g className="bo-arm-outer">
              {/* Main arm body — large curved mechanical form */}
              <path
                d="M-60,300 Q200,280 520,480 Q560,500 560,540 Q560,580 520,600 Q200,800 -60,780 Z"
                fill="url(#bo-mg)"
              />
              {/* Arm overlays — angled mechanical facets */}
              <path
                d="M-60,350 Q180,330 500,500 L500,580 Q180,750 -60,730 Z"
                fill="var(--surface-2)"
                opacity="0.5"
              />
              {/* Panel lines on the arm */}
              <path
                d="M80,380 L460,520"
                stroke="var(--surface-3)"
                strokeWidth="1.5"
                opacity="0.45"
              />
              <path
                d="M60,440 L480,545"
                stroke="var(--surface-3)"
                strokeWidth="1"
                opacity="0.3"
              />
              <path
                d="M40,500 L460,570"
                stroke="var(--surface-3)"
                strokeWidth="1.2"
                opacity="0.35"
              />
              {/* Machined hex pattern — three hex bolts near the seam */}
              {[
                [460, 510],
                [470, 540],
                [455, 570],
              ].map(([cx, cy], i) => (
                <g key={`bolt-${i}`}>
                  <circle cx={cx} cy={cy} r="6" fill="none" stroke="var(--text-faint)" strokeWidth="0.8" opacity="0.4" />
                  <circle cx={cx} cy={cy} r="2.5" fill="var(--text-faint)" opacity="0.3" />
                </g>
              ))}
            </g>

            {/* ── Inner arm layer — metallic core visible at the port ── */}
            <g className="bo-arm-inner">
              <ellipse cx="560" cy="540" rx="70" ry="160" fill="var(--surface-3)" opacity="0.5" />
            </g>

            {/* ── Flesh side (right) — organic curves, no sharp corners ── */}
            <g className="bo-flesh-profile">
              <path
                d="M1920,300 Q1280,400 1040,460 Q600,500 560,540 Q600,580 1040,620 Q1280,680 1920,780 L1920,300 Z"
                fill="url(#bo-fl)"
              />
              {/* Subtle organic ridges */}
              <path
                d="M1920,380 Q1300,460 1040,490"
                stroke="rgba(180,130,150,0.12)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M1920,460 Q1320,530 1060,545"
                stroke="rgba(180,130,150,0.08)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M1920,540 Q1300,590 1040,590"
                stroke="rgba(180,130,150,0.1)"
                strokeWidth="2"
                fill="none"
              />
              {/* Small skin pores / texture dots */}
              {Array.from({ length: 30 }).map((_, i) => {
                const px = 1100 + Math.random() * 750;
                const py = 400 + Math.random() * 280;
                return (
                  <ellipse
                    key={`pore-${i}`}
                    cx={px}
                    cy={py}
                    rx={1 + Math.random() * 2}
                    ry={1}
                    fill="rgba(255,200,220,0.04)"
                  />
                );
              })}
            </g>

            {/* ── Connection port — concentric rings at the seam ── */}
            <g className="bo-conn-ring">
              {/* Outer mounting ring */}
              <ellipse
                cx="560"
                cy="540"
                rx="68"
                ry="148"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                opacity="0.3"
                filter="url(#bo-glow)"
              />
            </g>

            <g className="bo-conn-ring-outer">
              {/* Second ring — wider */}
              <ellipse
                cx="560"
                cy="540"
                rx="82"
                ry="168"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.18"
                strokeDasharray="6 8"
                filter="url(#bo-glow)"
              />
              {/* Third ring — widest, faint */}
              <ellipse
                cx="560"
                cy="540"
                rx="98"
                ry="190"
                fill="none"
                stroke="rgba(255,0,170,0.25)"
                strokeWidth="0.8"
                opacity="0.12"
                filter="url(#bo-glow-lg)"
              />
            </g>

            {/* ── Connection port interior — glowing hollow ── */}
            <g className="bo-port-hole">
              <ellipse
                cx="560"
                cy="540"
                rx="52"
                ry="130"
                fill="url(#bo-ring-grad)"
              />
              {/* Inner contact pins */}
              {Array.from({ length: 7 }).map((_, i) => {
                const angle = -Math.PI / 2 + (i / 6) * Math.PI;
                const py = 540 + Math.sin(angle) * 90;
                const px = 560 + Math.cos(angle) * 36;
                return (
                  <circle
                    key={`pin-${i}`}
                    cx={px}
                    cy={py}
                    r="2.5"
                    fill="var(--accent)"
                    opacity="0.5"
                    filter="url(#bo-glow)"
                  />
                );
              })}
            </g>

            {/* ── Seam line — the metal-flesh boundary, alive with pulse ── */}
            <g className="bo-seam-line">
              <ellipse
                cx="560"
                cy="540"
                rx="64"
                ry="144"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                opacity="0.65"
                filter="url(#bo-glow)"
              />
              {/* Seam highlight — brighter inner stroke */}
              <ellipse
                cx="560"
                cy="540"
                rx="62"
                ry="142"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.8"
                opacity="0.9"
              />
            </g>

            {/* ── Floating particles near the seam ── */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const dist = 100 + Math.random() * 80;
              const px = 560 + Math.cos(angle) * dist;
              const py = 540 + Math.sin(angle) * dist * 1.4;
              return (
                <circle
                  key={`p-${i}`}
                  cx={px}
                  cy={py}
                  r={1 + Math.random() * 2.5}
                  fill={i % 3 === 0 ? "rgba(255,0,170,0.5)" : "var(--accent)"}
                  opacity="0.25"
                  filter="url(#bo-glow)"
                  className="bo-particle"
                  style={{ animationDelay: `${i * 0.2}s` } as React.CSSProperties}
                />
              );
            })}

            {/* ── Ambient light bleed at the connection ── */}
            <ellipse
              cx="560"
              cy="540"
              rx="140"
              ry="220"
              fill="none"
            >
              <animate attributeName="rx" values="140;155;140" dur="4s" repeatCount="indefinite" />
              <animate attributeName="ry" values="220;240;220" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.06;0.12;0.06" dur="4s" repeatCount="indefinite" />
            </ellipse>

          </svg>
        </div>

        {/* Tagline */}
        <div className="bo-tagline">金属与肉体的交界</div>
      </div>
    );
  }

  /* ─── Step 1: Canvas subdermal circuits ─── */
  if (step === 1) {
    return <Step1Circuits />;
  }

  /* ─── Step 2: Human-machine fusion ─── */
  if (step === 2) {
    return <Step2Fusion />;
  }

  return null;
}

/* ═══════════════════════════════════════════════════════════
 * Step 1 — Canvas subdermal circuit network
 * ───────────────────────────────────────────────────────────
 * Animated circuit traces grow and pulse under a translucent
 * skin overlay, creating the illusion of electronic veins
 * spreading through living tissue.
 * ═══════════════════════════════════════════════════════════ */

function Step1Circuits() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Pre-generate circuit trees once — they don't change across frames
  const trees = useMemo(() => {
    const result: {
      rootX: number;
      rootY: number;
      branches: { x1: number; y1: number; x2: number; y2: number; thickness: number; level: number }[];
      nodes: { x: number; y: number; r: number }[];
      speed: number;
      hueShift: number;
    }[] = [];

    for (let t = 0; t < 8; t++) {
      const branches: typeof result[number]["branches"] = [];
      const nodes: typeof result[number]["nodes"] = [];

      // Root near center of screen, spread outward
      const rootX = 960;
      const rootY = 540;

      // Build fractal-like tree structure
      function growBranch(
        x1: number,
        y1: number,
        angle: number,
        length: number,
        level: number,
        maxLevel: number,
      ) {
        if (level > maxLevel) return;

        const x2 = x1 + Math.cos(angle) * length;
        const y2 = y1 + Math.sin(angle) * length;

        branches.push({
          x1,
          y1,
          x2,
          y2,
          thickness: Math.max(0.3, 3.5 - level * 0.7),
          level,
        });

        // Node at branch point
        if (level > 0 && Math.random() > 0.2) {
          nodes.push({ x: x2, y: y2, r: 1.5 + Math.random() * 2 });
        }

        // Fork: 1-3 children
        const childCount = level < 2 ? 2 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2);
        for (let c = 0; c < childCount; c++) {
          const spreadAngle = (Math.random() - 0.5) * 1.3;
          const childLen = length * (0.55 + Math.random() * 0.35);
          if (childLen > 20) {
            growBranch(x2, y2, angle + spreadAngle, childLen, level + 1, maxLevel);
          }
        }
      }

      // Start with 3-5 main arteries from root
      const mainBranches = 3 + Math.floor(Math.random() * 3);
      for (let m = 0; m < mainBranches; m++) {
        const angle = (m / mainBranches) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        growBranch(rootX, rootY, angle, 160 + Math.random() * 200, 0, 3 + Math.floor(Math.random() * 2));
      }

      result.push({
        rootX,
        rootY,
        branches,
        nodes,
        speed: 0.2 + Math.random() * 0.5,
        hueShift: Math.random() * 0.3,
      });
    }

    return result;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    let frame = 0;
    let startTime = performance.now();

    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      const elapsed = (now - startTime) / 1000;

      ctx.clearRect(0, 0, 1920, 1080);

      // Draw circuit trees
      trees.forEach((tree) => {
        const phase = elapsed * tree.speed;

        // Draw branches
        tree.branches.forEach((br, idx) => {
          // Animate branch drawing: only show branches up to a certain progress
          const branchProgress = Math.min(1, (phase * 0.6 - br.level * 0.15));
          if (branchProgress <= 0) return;
          if (branchProgress < 1) {
            // Clip branch to current draw progress
            const cx = br.x1 + (br.x2 - br.x1) * branchProgress;
            const cy = br.y1 + (br.y2 - br.y1) * branchProgress;

            ctx.beginPath();
            ctx.moveTo(br.x1, br.y1);
            ctx.lineTo(cx, cy);
            ctx.strokeStyle = `rgba(0,255,204,${0.12 + br.level * 0.04})`;
            ctx.lineWidth = br.thickness;
            ctx.shadowColor = "rgba(0,255,204,0.25)";
            ctx.shadowBlur = 4;
            ctx.stroke();
            ctx.shadowBlur = 0;
          } else {
            // Full branch — pulse brightness based on phase
            const pulse = 0.5 + 0.5 * Math.sin(phase * 2 + idx * 0.3);
            const alpha = 0.15 + pulse * 0.15 + br.level * 0.04;

            ctx.beginPath();
            ctx.moveTo(br.x1, br.y1);
            ctx.lineTo(br.x2, br.y2);
            ctx.strokeStyle = `rgba(0,255,204,${alpha})`;
            ctx.lineWidth = br.thickness;
            ctx.shadowColor = "rgba(0,255,204,0.3)";
            ctx.shadowBlur = 3 + pulse * 5;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });

        // Draw nodes (circuit junction points)
        tree.nodes.forEach((node, idx) => {
          const nodeProgress = Math.min(1, (phase * 0.6 - 0.2));
          if (nodeProgress <= 0) return;
          const pulse = 0.4 + 0.6 * Math.abs(Math.sin(phase * 2.5 + idx * 0.7));
          const alpha = nodeProgress * pulse * 0.5;
          const isMagenta = idx % 7 === 0;

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r * pulse, 0, Math.PI * 2);
          ctx.fillStyle = isMagenta
            ? `rgba(255,0,170,${alpha * 0.8})`
            : `rgba(0,255,204,${alpha})`;
          ctx.shadowColor = isMagenta
            ? "rgba(255,0,170,0.5)"
            : "rgba(0,255,204,0.4)";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      // Central core pulse — the heart of the circuit network
      const corePulse = 0.5 + 0.5 * Math.sin(elapsed * 1.8);
      ctx.beginPath();
      ctx.arc(960, 540, 30 + corePulse * 20, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,204,${0.04 + corePulse * 0.06})`;
      ctx.shadowColor = "rgba(0,255,204,0.5)";
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Core ring
      ctx.beginPath();
      ctx.arc(960, 540, 35 + corePulse * 28, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,255,204,${0.15 + corePulse * 0.12})`;
      ctx.lineWidth = 1;
      ctx.shadowColor = "rgba(0,255,204,0.35)";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Core ring outer (magenta tint)
      ctx.beginPath();
      ctx.arc(960, 540, 55 + corePulse * 35, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,0,170,${0.06 + corePulse * 0.05})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [trees]);

  return (
    <div className="bo-scene">
      <canvas ref={canvasRef} className="bo-step1-canvas" />
      <div className="bo-step1-skin" />
      {/* No tagline on step 1 — silent visual beat, circuits are the message */}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * Step 2 — Human-machine boundary fusion
 * ───────────────────────────────────────────────────────────
 * Split-screen composition: left side = angular metallic
 * geometry, right side = organic flesh curves. The center
 * dissolves them together with a luminous fusion band.
 * ═══════════════════════════════════════════════════════════ */

function Step2Fusion() {
  return (
    <div className="bo-scene">
      <div className="bo-step2-wrap">
        <svg className="bo-step2-svg" viewBox="0 0 1920 1080">

          <defs>
            {/* Metal gradient — cool, geometric, cyan-tinted */}
            <linearGradient id="bf-mg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--surface)" />
              <stop offset="50%" stopColor="var(--surface-2)" />
              <stop offset="100%" stopColor="var(--surface-3)" />
            </linearGradient>

            {/* Flesh gradient — warm, organic, biological */}
            <linearGradient id="bf-fg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1016" />
              <stop offset="50%" stopColor="#2a1a22" />
              <stop offset="100%" stopColor="#1d1218" />
            </linearGradient>

            {/* Fusion band gradient — where metal and flesh interpenetrate */}
            <linearGradient id="bf-fusion" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--surface-2)" stopOpacity="0" />
              <stop offset="25%" stopColor="var(--accent)" stopOpacity="0.08" />
              <stop offset="50%" stopColor="rgba(255,0,170,0.12)" />
              <stop offset="75%" stopColor="var(--accent)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="rgba(180,130,150,0.06)" stopOpacity="0" />
            </linearGradient>

            <filter id="bf-glow">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <filter id="bf-glow-lg">
              <feGaussianBlur stdDeviation="16" />
            </filter>

            {/* Circuit pattern for metal side */}
            <pattern id="bf-circuit" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M0,30 h20 v15 h-10 M30,10 v25 h15"
                stroke="var(--accent)"
                strokeWidth="0.6"
                fill="none"
                opacity="0.1"
              />
              <circle cx="20" cy="45" r="1.2" fill="var(--accent)" opacity="0.2" />
              <circle cx="45" cy="35" r="1" fill="var(--accent)" opacity="0.15" />
            </pattern>

            {/* Vein pattern for flesh side */}
            <pattern id="bf-vein" width="70" height="70" patternUnits="userSpaceOnUse">
              <path
                d="M35,0 Q40,20 30,40 Q25,55 35,70"
                stroke="rgba(180,120,140,0.12)"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M10,20 Q25,25 30,30"
                stroke="rgba(180,120,140,0.08)"
                strokeWidth="0.7"
                fill="none"
              />
            </pattern>
          </defs>

          {/* ── Left half: Metal / Machine ── */}
          <g>
            {/* Background fill to the midpoint with metal gradient */}
            <rect x="0" y="0" width="960" height="1080" fill="url(#bf-mg)" />

            {/* Circuit texture overlay */}
            <rect x="0" y="0" width="960" height="1080" fill="url(#bf-circuit)" />

            {/* Geometric angular shapes — machine architecture */}
            {/* Large angled panels */}
            <polygon points="0,0 400,0 340,300 0,400" fill="var(--surface-3)" opacity="0.3" />
            <polygon points="600,0 960,0 960,250 700,200" fill="var(--surface-3)" opacity="0.2" />
            <polygon points="0,700 300,600 400,800 0,900" fill="var(--surface-3)" opacity="0.25" />
            <polygon points="700,600 960,550 960,750 800,700" fill="var(--surface-3)" opacity="0.15" />
            <polygon points="0,400 200,380 150,600 0,700" fill="var(--surface-3)" opacity="0.18" />

            {/* Hard panel lines */}
            <line x1="0" y1="400" x2="400" y2="400" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
            <line x1="600" y1="250" x2="960" y2="250" stroke="var(--accent)" strokeWidth="0.5" opacity="0.12" />
            <line x1="0" y1="700" x2="300" y2="700" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
            <line x1="700" y1="550" x2="960" y2="550" stroke="var(--accent)" strokeWidth="0.5" opacity="0.1" />

            {/* Machine designation glyphs — abstract, not readable */}
            <text x="120" y="460" fontFamily="var(--font-mono)" fontSize="28" fill="var(--accent)" opacity="0.12" fontWeight="700">
              01001101
            </text>
            <text x="720" y="320" fontFamily="var(--font-mono)" fontSize="20" fill="var(--accent)" opacity="0.09">
              &lt;SYS&gt;
            </text>

            {/* Glowing tech nodes */}
            {[
              [180, 320],
              [300, 180],
              [750, 420],
              [850, 650],
              [420, 720],
            ].map(([cx, cy], i) => (
              <circle key={`mn-${i}`} cx={cx} cy={cy} r="3" fill="var(--accent)" opacity="0.25" filter="url(#bf-glow)">
                <animate attributeName="opacity" values="0.15;0.4;0.15" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Side label */}
            <text
              x="480"
              y="100"
              textAnchor="middle"
              fontFamily="var(--font-display-en)"
              fontSize="100"
              fontWeight="700"
              letterSpacing="0.25em"
              fill="var(--accent)"
              opacity="0.08"
            >
              MACHINE
            </text>
          </g>

          {/* ── Right half: Flesh / Human ── */}
          <g>
            {/* Background fill from midpoint */}
            <rect x="960" y="0" width="960" height="1080" fill="url(#bf-fg)" />

            {/* Vein texture overlay */}
            <rect x="960" y="0" width="960" height="1080" fill="url(#bf-vein)" />

            {/* Organic curved shapes — biological architecture */}
            <ellipse cx="1300" cy="300" rx="200" ry="160" fill="rgba(180,120,140,0.04)" />
            <ellipse cx="1600" cy="600" rx="250" ry="220" fill="rgba(180,120,140,0.03)" />
            <ellipse cx="1200" cy="750" rx="180" ry="140" fill="rgba(180,120,140,0.04)" />

            {/* Curved organic lines */}
            <path d="M960,180 Q1200,200 1440,160" stroke="rgba(180,120,140,0.1)" strokeWidth="1.5" fill="none" />
            <path d="M960,360 Q1300,380 1500,320" stroke="rgba(180,120,140,0.08)" strokeWidth="1" fill="none" />
            <path d="M960,540 Q1250,560 1580,520" stroke="rgba(180,120,140,0.12)" strokeWidth="1.8" fill="none" />
            <path d="M960,720 Q1280,740 1520,690" stroke="rgba(180,120,140,0.08)" strokeWidth="1" fill="none" />
            <path d="M960,880 Q1300,900 1480,860" stroke="rgba(180,120,140,0.07)" strokeWidth="1.2" fill="none" />

            {/* Cellular / biological nodes */}
            {[
              [1100, 250],
              [1350, 180],
              [1500, 380],
              [1280, 520],
              [1650, 450],
              [1150, 680],
              [1400, 800],
              [1600, 720],
            ].map(([cx, cy], i) => (
              <ellipse key={`bn-${i}`} cx={cx} cy={cy} rx="4" ry="3" fill="rgba(255,180,200,0.06)" />
            ))}

            {/* Side label */}
            <text
              x="1440"
              y="100"
              textAnchor="middle"
              fontFamily="var(--font-display-en)"
              fontSize="100"
              fontWeight="700"
              letterSpacing="0.25em"
              fill="rgba(255,200,220,0.06)"
            >
              HUMAN
            </text>
          </g>

          {/* ── Center fusion band — where the boundary dissolves ── */}
          <g className="bo-fusion-band">
            <rect x="740" y="0" width="440" height="1080" fill="url(#bf-fusion)" />

            {/* Crossing particles — migrate from metal to flesh and back */}
            {Array.from({ length: 30 }).map((_, i) => {
              const baseY = 40 + i * 36;
              const isCyan = i % 2 === 0;
              return (
                <circle
                  key={`fp-${i}`}
                  cy={baseY}
                  r={1.2 + Math.random() * 2.5}
                  fill={isCyan ? "var(--accent)" : "rgba(255,0,170,0.5)"}
                  opacity="0.3"
                  filter="url(#bf-glow)"
                >
                  <animate
                    attributeName="cx"
                    values={`${820 + Math.random() * 40};${1060 + Math.random() * 40};${820 + Math.random() * 40}`}
                    dur={`${3 + Math.random() * 4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.1;0.45;0.1"
                    dur={`${3 + Math.random() * 4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}

            {/* Fusion dots — micro-scale boundary crossings */}
            <g className="bo-fusion-dots">
              {Array.from({ length: 18 }).map((_, i) => {
                const y = 80 + i * 55;
                return (
                  <circle cx="960" cy={y} r="2" fill="var(--accent)" opacity="0.3" filter="url(#bf-glow)">
                    <animate
                      attributeName="cx"
                      values="910;1010;910"
                      dur={`${2.5 + (i % 3) * 1.2}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="fill"
                      values="#00ffcc;rgba(255,0,170,0.6);#00ffcc"
                      dur={`${2.5 + (i % 3) * 1.2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </g>
          </g>

          {/* ── Dividing line — the ambiguous boundary, alive ── */}
          <g className="bo-divide-line">
            <line
              x1="960"
              y1="0"
              x2="960"
              y2="1080"
              stroke="url(#bf-fusion)"
              strokeWidth="3"
              filter="url(#bf-glow)"
            />
            {/* Brighter inner line */}
            <line
              x1="960"
              y1="0"
              x2="960"
              y2="1080"
              stroke="var(--accent)"
              strokeWidth="1"
              opacity="0.4"
            />
          </g>

          {/* ── Ambient glow at the fusion zone ── */}
          <ellipse cx="960" cy="540" rx="120" ry="400" fill="none">
            <animate
              attributeName="opacity"
              values="0.04;0.1;0.04"
              dur="3s"
              repeatCount="indefinite"
            />
          </ellipse>

        </svg>
      </div>

      {/* Tagline */}
      <div className="bo-tagline" style={{ animationDelay: "1.5s" } as React.CSSProperties}>
        人与机器的边界完全消失
      </div>
    </div>
  );
}
