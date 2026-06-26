import "./Paradox.css";

/* Deterministic seed data — no Math.random() in JSX render */

/* Pipe path data for slum overhead */
const PIPE_Y_OFFSETS = [
  20, 48, 76, 104, 132, 160, 188, 216, 244,
];

/* Crack lines for decay zone */
const CRACKS = [
  "M40,180 L160,60 L220,40",
  "M600,20 L580,120 L660,200 L640,320",
  "M1200,60 L1190,160 L1260,250",
  "M1500,10 L1520,100 L1490,200 L1560,300",
  "M80,260 L200,320",
  "M800,300 L820,200 L900,140 L880,60",
  "M1700,160 L1650,260 L1700,350",
  "M300,100 L340,180",
  "M1000,240 L1040,150 L1100,90",
  "M1400,180 L1380,280",
];

/* Lower city window positions — deterministic grid */
const LOWER_WINDOWS: { x: number; y: number; delay: number }[] = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 28; col++) {
    const x = 60 + col * 68 + ((row * 13) % 11) * 3;
    const y = 40 + row * 52 + ((col * 7) % 17);
    if ((row + col * 3) % 5 !== 0) {
      LOWER_WINDOWS.push({ x, y, delay: ((row * 7 + col * 13) % 20) * 0.2 });
    }
  }
}

/* Data stream bar heights */
const DATA_BAR_HEIGHTS = [
  200, 140, 260, 100, 180, 220, 160, 240, 120, 190,
  210, 150, 240, 130, 170, 200, 260, 140, 180, 230,
];

/* Upper city tower shapes */
const UPPER_TOWERS = [
  { x: 40, w: 100, h: 340 },
  { x: 160, w: 70, h: 260 },
  { x: 250, w: 120, h: 400 },
  { x: 390, w: 80, h: 300 },
  { x: 490, w: 160, h: 460 },
  { x: 670, w: 90, h: 350 },
  { x: 780, w: 130, h: 420 },
  { x: 930, w: 70, h: 280 },
  { x: 1020, w: 150, h: 480 },
  { x: 1190, w: 100, h: 380 },
  { x: 1310, w: 80, h: 310 },
  { x: 1410, w: 140, h: 440 },
  { x: 1570, w: 90, h: 330 },
  { x: 1680, w: 120, h: 390 },
  { x: 1820, w: 70, h: 270 },
];

/* Lower city organic shapes */
const LOWER_SHAPES: { x: number; w: number; h: number; skew: number }[] = [
  { x: 30, w: 60, h: 200, skew: -3 },
  { x: 120, w: 90, h: 160, skew: 4 },
  { x: 240, w: 50, h: 240, skew: 1 },
  { x: 320, w: 110, h: 180, skew: -5 },
  { x: 460, w: 70, h: 220, skew: 2 },
  { x: 560, w: 100, h: 150, skew: -2 },
  { x: 690, w: 60, h: 260, skew: 3 },
  { x: 780, w: 130, h: 170, skew: -4 },
  { x: 940, w: 80, h: 210, skew: 1 },
  { x: 1050, w: 55, h: 250, skew: 5 },
  { x: 1130, w: 120, h: 140, skew: -3 },
  { x: 1280, w: 70, h: 230, skew: 2 },
  { x: 1380, w: 100, h: 190, skew: -1 },
  { x: 1510, w: 60, h: 270, skew: 4 },
  { x: 1600, w: 90, h: 160, skew: -5 },
  { x: 1720, w: 110, h: 200, skew: 0 },
];

export default function Paradox({ step }: { step: number }) {
  /* ── STEP 0: Corporate neon sign — cold tech dominance ── */
  if (step === 0) {
    return (
      <div className="pa-scene">
        {/* Corporate grid backdrop */}
        <div className="pa-corp-grid" />

        {/* Tower mass silhouette */}
        <div className="pa-tower-mass" />

        {/* Neon sign centerpiece */}
        <div className="pa-neon-sign">
          <div className="pa-neon-name">MEGA</div>
          <div className="pa-neon-line" />
          <div className="pa-neon-tag">corporate headquarters</div>
        </div>

        {/* Wet ground reflection at bottom */}
        <div className="pa-wet-ground" />
      </div>
    );
  }

  /* ── STEP 1: Slum street — dirty, cramped, organic ── */
  if (step === 1) {
    return (
      <div className="pa-scene">
        {/* Slum SVG backdrop */}
        <svg className="pa-slum-svg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          {/* Dark alley walls */}
          <rect x="0" y="300" width="380" height="780" fill="var(--surface-2)" opacity="0.9" />
          <rect x="1540" y="320" width="380" height="760" fill="var(--surface-2)" opacity="0.85" />

          {/* Ground plane */}
          <rect x="0" y="700" width="1920" height="380" fill="var(--shell)" opacity="0.8" />

          {/* Scattered debris on ground */}
          {[
            [120, 740, 30, 12],
            [420, 760, 18, 8],
            [680, 780, 45, 14],
            [940, 750, 22, 10],
            [1150, 790, 35, 11],
            [1380, 760, 28, 13],
            [1620, 770, 20, 9],
            [220, 810, 50, 15],
            [560, 830, 25, 11],
            [880, 820, 40, 14],
            [1060, 840, 32, 12],
            [1300, 810, 44, 16],
            [1500, 850, 26, 10],
            [1740, 830, 36, 13],
          ].map(([cx, cy, w, h], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={w} ry={h}
              fill="var(--surface-3)" opacity="0.4" />
          ))}

          {/* Drainage grates */}
          <rect x="300" y="760" width="120" height="6" rx="3" fill="var(--surface-3)" opacity="0.35" />
          <rect x="900" y="780" width="140" height="6" rx="3" fill="var(--surface-3)" opacity="0.3" />
          <rect x="1500" y="770" width="100" height="6" rx="3" fill="var(--surface-3)" opacity="0.35" />

          {/* Puddle reflections */}
          <ellipse cx="500" cy="830" rx="180" ry="30" fill="var(--accent)" opacity="0.04" />
          <ellipse cx="1200" cy="850" rx="220" ry="35" fill="var(--accent-glow)" opacity="0.03" />
        </svg>

        {/* Wall grime texture */}
        <div className="pa-wall-grime" />

        {/* Dim overhead lamp */}
        <div className="pa-dim-lamp" />

        {/* Overhead pipe knot */}
        <svg className="pa-pipe-knot" viewBox="0 0 1920 280" preserveAspectRatio="none">
          {/* Main horizontal pipe */}
          <rect x="0" y="120" width="1920" height="12" rx="6" fill="var(--surface-3)" opacity="0.6" />
          <rect x="0" y="180" width="1920" height="8" rx="4" fill="var(--surface-3)" opacity="0.4" />
          <rect x="0" y="60" width="1920" height="10" rx="5" fill="var(--surface-3)" opacity="0.35" />

          {/* Vertical drops from pipe */}
          {PIPE_Y_OFFSETS.map((y, i) => (
            <g key={i}>
              <line x1={80 + i * 200} y1={y} x2={80 + i * 200} y2={y + 50 + (i % 5) * 20}
                stroke="var(--surface-3)" strokeWidth={4 + (i % 3) * 2} opacity="0.35" />
              <line x1={130 + i * 200} y1={y + 20} x2={130 + i * 200} y2={y + 80 + (i % 4) * 15}
                stroke="var(--surface-3)" strokeWidth={3 + (i % 2) * 2} opacity="0.25" />
            </g>
          ))}

          {/* Cable bundles */}
          <path d="M0,90 Q400,70 800,100 Q1200,130 1600,95 Q1800,80 1920,110"
            stroke="var(--text-faint)" strokeWidth="3" fill="none" opacity="0.2" />
          <path d="M0,150 Q300,170 600,140 Q1000,110 1400,150 Q1700,170 1920,140"
            stroke="var(--text-faint)" strokeWidth="2" fill="none" opacity="0.15" />
        </svg>

        {/* Broken neon signs — half-lit */}
        <div className="pa-broken-neon">BAR</div>
        <div className="pa-broken-neon-right">OPEN</div>

        {/* Steam / mist */}
        <div className="pa-steam" />

        {/* Tagline */}
        <div className="pa-slum-tag">上层明亮，下层黑暗。</div>
      </div>
    );
  }

  /* ── STEP 2: High tech + decay juxtaposition ── */
  if (step === 2) {
    return (
      <div className="pa-scene">
        <div className="pa-split-stage">
          {/* Upper: High tech zone */}
          <div className="pa-tech-zone">
            <div className="pa-tech-grid-bg" />

            {/* Hologram rings */}
            <div className="pa-holo-ring" />
            <div className="pa-holo-ring" style={{ animationDelay: '0.6s, 1.6s' }} />

            {/* Data stream bars */}
            <div className="pa-data-streams">
              {DATA_BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="pa-data-bar"
                  style={{
                    height: `${h}px`,
                    animationDelay: `${(i * 0.12).toFixed(2)}s`,
                  }}
                />
              ))}
            </div>

            {/* Label */}
            <div className="pa-tech-label">HIGH TECH</div>
          </div>

          {/* Dividing line */}
          <div className="pa-split-line" />

          {/* Lower: Decay zone */}
          <div className="pa-decay-zone">
            {/* Crack lines */}
            <svg className="pa-cracks" viewBox="0 0 1920 540" preserveAspectRatio="none">
              {CRACKS.map((d, i) => (
                <path key={i} d={d}
                  stroke="var(--text-faint)" strokeWidth="1.5"
                  fill="none" opacity="0.25" />
              ))}
              {/* Dark organic patches */}
              <ellipse cx="300" cy="340" rx="120" ry="50" fill="var(--shell)" opacity="0.3" />
              <ellipse cx="900" cy="400" rx="160" ry="60" fill="var(--shell)" opacity="0.25" />
              <ellipse cx="1500" cy="320" rx="100" ry="40" fill="var(--shell)" opacity="0.35" />
              <ellipse cx="600" cy="480" rx="200" ry="70" fill="var(--shell)" opacity="0.2" />
            </svg>

            {/* Label */}
            <div className="pa-decay-label">LOW LIFE</div>
          </div>
        </div>

        {/* Tagline overlay */}
        <div className="pa-split-tag">这就是"高科技低生活"</div>
      </div>
    );
  }

  /* ── STEP 3: Vertical city split — upper bright, lower dark ── */
  if (step === 3) {
    return (
      <div className="pa-scene">
        <div className="pa-vert-stage">
          {/* Upper city — bright, clean, geometric */}
          <div className="pa-upper-city">
            <svg className="pa-upper-towers" viewBox="0 0 1920 540" preserveAspectRatio="none">
              {UPPER_TOWERS.map((t, i) => (
                <rect
                  key={i}
                  x={t.x}
                  y={540 - t.h}
                  width={t.w}
                  height={t.h}
                  fill="var(--accent-soft)"
                  rx="2"
                />
              ))}
              {/* Accent tower — brightest */}
              <rect x="580" y="80" width="90" height="460" fill="var(--accent)" opacity="0.35" rx="3" />
              <rect x="1080" y="60" width="80" height="480" fill="var(--accent)" opacity="0.25" rx="3" />
            </svg>
            <div className="pa-ut-label">上层</div>
          </div>

          {/* Glowing horizon line */}
          <div className="pa-horizon" />

          {/* Lower city — dark, organic, chaotic */}
          <div className="pa-lower-city">
            <svg className="pa-lower-mess" viewBox="0 0 1920 540" preserveAspectRatio="none">
              {/* Organic irregular shapes */}
              {LOWER_SHAPES.map((s, i) => (
                <polygon
                  key={i}
                  points={`${s.x},540 ${s.x + s.w},540 ${s.x + s.w + s.skew},${540 - s.h} ${s.x + s.skew},${540 - s.h}`}
                  fill="var(--surface-3)"
                  opacity="0.6"
                />
              ))}
              {/* Denser cluster patches */}
              <ellipse cx="400" cy="300" rx="200" ry="120" fill="var(--shell)" opacity="0.25" />
              <ellipse cx="1100" cy="280" rx="180" ry="100" fill="var(--shell)" opacity="0.2" />
            </svg>

            {/* Flickering windows */}
            <div className="pa-lower-windows">
              {LOWER_WINDOWS.map((w, i) => (
                <div
                  key={i}
                  className="pa-lwin"
                  style={{
                    left: `${w.x}px`,
                    top: `${w.y}px`,
                    animationDelay: `${w.delay.toFixed(1)}s`,
                  }}
                />
              ))}
            </div>

            <div className="pa-ll-label">下层</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
