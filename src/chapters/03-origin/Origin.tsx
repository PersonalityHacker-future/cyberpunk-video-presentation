import { useEffect, useRef } from "react";
import "./Origin.css";

/* ── Fixed signboard positions (no Math.random in render) ── */
const SIGNS = [
  { text: "全息广告", top: "8%",  left: "12%" },
  { text: "居酒屋",   top: "14%", left: "55%" },
  { text: "面摊",     top: "62%", left: "8%" },
  { text: "AI 算命",  top: "20%", left: "78%" },
  { text: "博彩",     top: "70%", left: "48%" },
  { text: "义体维修", top: "52%", left: "28%" },
  { text: "快充站",   top: "78%", left: "75%" },
  { text: "药局",     top: "42%", left: "68%" },
  { text: "龙纹堂",   top: "33%", left: "18%" },
  { text: "佛龛",     top: "85%", left: "14%" },
  { text: "拉面",     top: "55%", left: "82%" },
  { text: "赛博诊所", top: "18%", left: "38%" },
];

export default function Origin({ step }: { step: number }) {
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Rain animation (staggered, angled — distinct from Coldopen) ── */
  useEffect(() => {
    const canvas = rainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const drops: { x: number; y: number; speed: number; len: number; drift: number }[] = [];
    for (let i = 0; i < 300; i++) {
      drops.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        speed: 9 + Math.random() * 18,
        len: 28 + Math.random() * 60,
        drift: 1.2 + Math.random() * 2.8, // slight angle
      });
    }

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, 1920, 1080);

      drops.forEach((d) => {
        d.y += d.speed;
        d.x += d.drift;
        if (d.y > 1100) {
          d.y = -d.len;
          d.x = Math.random() * 1920;
        }
        if (d.x > 1940) d.x = -20;

        const alpha = 0.08 + (d.speed / 30) * 0.25;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.drift * 2, d.y + d.len);
        ctx.strokeStyle = `rgba(0,255,204,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    };
    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  /* ══════════════════════════════════════════════════════════════
   * Step 0 — Blade Runner 1982 homage
   * ══════════════════════════════════════════════════════════════ */
  if (step === 0) {
    return (
      <div className="or-scene">
        {/* Rain */}
        <canvas ref={rainCanvasRef} className="or-rain" />

        {/* Smoke plumes from industrial stacks */}
        <div className="or-smoke-wrap">
          <div className="or-smoke or-smoke-1" />
          <div className="or-smoke or-smoke-2" />
          <div className="or-smoke or-smoke-3" />
          <div className="or-smoke or-smoke-4" />
          <div className="or-smoke or-smoke-5" />
        </div>

        {/* Industrial skyline + Tyrell pyramid */}
        <svg className="or-skyline" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <defs>
            <linearGradient id="or-flame-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="50%" stopColor="var(--accent-glow)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--accent-glow)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Refinery stacks */}
          <rect x="140" y="520" width="18" height="200" className="or-stack" />
          <rect x="200" y="480" width="14" height="240" className="or-stack" />
          <rect x="172" y="500" width="12" height="220" className="or-stack" />
          {/* flame tops */}
          <ellipse cx="149" cy="510" rx="16" ry="28" fill="url(#or-flame-grad)" className="or-flame" />
          <ellipse cx="207" cy="468" rx="14" ry="32" fill="url(#or-flame-grad)" className="or-flame or-flame-delay" />
          <ellipse cx="178" cy="488" rx="13" ry="26" fill="url(#or-flame-grad)" className="or-flame or-flame-delay2" />

          {/* More stacks right side */}
          <rect x="1620" y="540" width="16" height="180" className="or-stack" />
          <rect x="1670" y="500" width="12" height="220" className="or-stack" />
          <ellipse cx="1628" cy="530" rx="15" ry="26" fill="url(#or-flame-grad)" className="or-flame or-flame-delay" />

          {/* Tyrell pyramid */}
          <polygon points="960,240 780,680 1140,680" className="or-pyramid" />

          {/* Spinner vehicle silhouette */}
          <g className="or-spinner">
            <rect x="-40" y="-8" width="80" height="14" rx="7" />
            <rect x="-60" y="-14" width="20" height="28" rx="4" />
            <rect x="40" y="-14" width="20" height="28" rx="4" />
            <circle cx="0" cy="0" r="4" />
            {/* light bar */}
            <rect x="-35" y="-14" width="70" height="3" rx="1" opacity="0.8" />
          </g>

          {/* City silhouette — layered buildings */}
          {[0, 1, 2].map((layer) => (
            <g key={layer} className={`or-city-layer or-city-layer-${layer}`}>
              {Array.from({ length: 18 }).map((_, i) => (
                <rect
                  key={i}
                  x={20 + i * 108 + (layer * 12)}
                  y={620 - layer * 40 - (i % 3) * 70 - (i % 5) * 40}
                  width={60 + (i % 3) * 40}
                  height={80 + (i % 3) * 120 + (i % 5) * 60}
                />
              ))}
            </g>
          ))}
        </svg>

        {/* Giant year background */}
        <div className="or-year-bg">1982</div>

        {/* Title + subtitle */}
        <div className="or-hero-group">
          <div className="or-hero-title">《银翼杀手》</div>
          <div className="or-hero-sub">1982  ·  一切从这里开始</div>
          <div className="or-hero-en">Blade Runner</div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════
   * Step 1 — Neon + rain + eastern symbols
   * ══════════════════════════════════════════════════════════════ */
  if (step === 1) {
    return (
      <div className="or-scene">
        <canvas ref={rainCanvasRef} className="or-rain" />

        {/* Wet street reflection glow */}
        <div className="or-street" />

        {/* Three neon signs */}
        <div className="or-neon-trio">
          <div className="or-neon-block or-neon-cyan">
            <span className="or-neon-str">霓 虹</span>
            <div className="or-neon-glow-line" />
          </div>
          <div className="or-neon-block or-neon-white">
            <span className="or-neon-str or-neon-str-text">雨 幕</span>
            <div className="or-neon-glow-line or-neon-glow-line-text" />
          </div>
          <div className="or-neon-block or-neon-magenta">
            <span className="or-neon-str or-neon-str-mag">东方符号</span>
            <div className="or-neon-glow-line or-neon-glow-line-mag" />
          </div>
        </div>

        {/* Hologram ring accents behind the signs */}
        <svg className="or-holo-rings" viewBox="0 0 1920 1080">
          <ellipse cx="480" cy="540" rx="300" ry="200" className="or-ring or-ring-1" />
          <ellipse cx="960" cy="500" rx="360" ry="240" className="or-ring or-ring-2" />
          <ellipse cx="1440" cy="540" rx="280" ry="190" className="or-ring or-ring-3" />
        </svg>

        {/* Permanent night tagline */}
        <div className="or-perma-night">永 久 黑 夜</div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════
   * Step 2 — East-West visual hybrid / 高科技 vs 破败街巷
   * ══════════════════════════════════════════════════════════════ */
  if (step === 2) {
    return (
      <div className="or-scene">
        {/* Split canvas — left: clean geometric towers, right: organic chaos */}
        <svg className="or-split-viz" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <defs>
            <clipPath id="or-left-clip">
              <rect x="0" y="0" width="960" height="1080" />
            </clipPath>
            <clipPath id="or-right-clip">
              <rect x="960" y="0" width="960" height="1080" />
            </clipPath>
          </defs>

          {/* Left zone — clean geometric towers (high-tech / Western modernist) */}
          <g clipPath="url(#or-left-clip)">
            <rect x="0" y="0" width="960" height="1080" className="or-left-bg" />

            {/* Tall clean towers */}
            <rect x="40" y="200" width="90" height="500" className="or-tower or-tower-1" />
            <rect x="160" y="140" width="70" height="560" className="or-tower or-tower-2" />
            <rect x="260" y="250" width="110" height="450" className="or-tower or-tower-3" />
            <rect x="400" y="100" width="80" height="600" className="or-tower or-tower-4" />
            <rect x="510" y="220" width="100" height="480" className="or-tower or-tower-5" />
            <rect x="640" y="170" width="85" height="530" className="or-tower or-tower-6" />
            <rect x="760" y="260" width="120" height="440" className="or-tower or-tower-7" />

            {/* Grid windows on towers */}
            {Array.from({ length: 60 }).map((_, i) => (
              <rect
                key={i}
                x={30 + (i % 8) * 100 + Math.floor(i / 8) * 15}
                y={180 + Math.floor(i / 8) * 50 + (i % 5) * 14}
                width={7}
                height={7}
                className="or-grid-win"
              />
            ))}

            {/* Label */}
            <text x="480" y="850" textAnchor="middle" className="or-zone-label or-zone-label-left">高科技</text>
          </g>

          {/* Right zone — organic mess (low-life / Eastern chaotic urbanism) */}
          <g clipPath="url(#or-right-clip)">
            <rect x="960" y="0" width="960" height="1080" className="or-right-bg" />

            {/* Irregular clustered buildings */}
            <rect x="1000" y="400" width="60" height="300" className="or-shack or-shack-1" rx="2" />
            <rect x="1070" y="350" width="45" height="350" className="or-shack or-shack-2" rx="2" />
            <rect x="1030" y="420" width="70" height="280" className="or-shack or-shack-3" rx="2" />
            <rect x="1140" y="380" width="55" height="320" className="or-shack or-shack-4" rx="2" />
            <rect x="1210" y="440" width="80" height="260" className="or-shack or-shack-5" rx="2" />
            <rect x="1310" y="360" width="50" height="340" className="or-shack or-shack-6" rx="2" />
            <rect x="1380" y="410" width="65" height="290" className="or-shack or-shack-7" rx="2" />
            <rect x="1460" y="450" width="75" height="250" className="or-shack or-shack-8" rx="2" />
            <rect x="1560" y="390" width="55" height="310" className="or-shack or-shack-9" rx="2" />
            <rect x="1640" y="430" width="70" height="270" className="or-shack or-shack-10" rx="2" />

            {/* Wires / cables hanging between shacks */}
            <path d="M1060,370 Q1080,340 1100,360" className="or-cable" />
            <path d="M1140,390 Q1170,330 1210,380" className="or-cable or-cable-2" />
            <path d="M1310,370 Q1340,310 1380,360" className="or-cable or-cable-3" />
            <path d="M1460,420 Q1500,380 1560,400" className="or-cable or-cable-4" />

            {/* Neon sign fragments */}
            <rect x="1110" y="340" width="60" height="18" className="or-mini-sign or-mini-sign-1" />
            <rect x="1360" y="330" width="48" height="16" className="or-mini-sign or-mini-sign-2" />
            <rect x="1600" y="370" width="55" height="14" className="or-mini-sign or-mini-sign-3" />

            {/* Label */}
            <text x="1440" y="850" textAnchor="middle" className="or-zone-label or-zone-label-right">低生活</text>
          </g>

          {/* Dividing line */}
          <line x1="960" y1="0" x2="960" y2="1080" className="or-split-line" />
        </svg>

        {/* Cross-hybrid mark */}
        <div className="or-cross-mark">
          <svg viewBox="0 0 100 100" className="or-cross-svg">
            <line x1="20" y1="50" x2="80" y2="50" className="or-cross-bar" />
            <line x1="50" y1="20" x2="50" y2="80" className="or-cross-bar" />
          </svg>
        </div>

        {/* Mashup tagline */}
        <div className="or-mash">疯狂杂交</div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════
   * Step 3 — Signage collage + vertical city class metaphor
   * ══════════════════════════════════════════════════════════════ */
  if (step === 3) {
    return (
      <div className="or-scene">
        {/* Vertical city background — upper bright, lower dark */}
        <svg className="or-vertical-city" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          {/* Upper zone — bright, clean geometric */}
          <rect x="0" y="0" width="1920" height="400" className="or-upper-zone" />
          {/* Upper zone buildings */}
          {[0, 1, 2].map((layer) => (
            <g key={layer}>
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x={30 + i * 160 + layer * 8}
                  y={80 - (i % 3) * 40 + layer * 60}
                  width={50 + (i % 3) * 40}
                  height={200 + (i % 4) * 60}
                  className="or-upper-build"
                />
              ))}
            </g>
          ))}

          {/* Dividing horizon line */}
          <line x1="0" y1="410" x2="1920" y2="410" className="or-horizon" />

          {/* Lower zone — dark, chaotic */}
          <rect x="0" y="410" width="1920" height="670" className="or-lower-zone" />
          {/* Lower zone organic shapes */}
          {Array.from({ length: 30 }).map((_, i) => (
            <rect
              key={i}
              x={10 + i * 65 + (i % 5) * 10}
              y={450 + (i % 3) * 80 + (i % 7) * 50}
              width={30 + (i % 4) * 25}
              height={100 + (i % 5) * 80}
              className="or-lower-build"
              rx="1"
            />
          ))}
        </svg>

        {/* Signboards crowding the frame */}
        <div className="or-signage">
          {SIGNS.map((s, i) => (
            <div
              key={i}
              className="or-sign"
              style={{
                top: s.top,
                left: s.left,
                animationDelay: `${i * 0.14}s`,
              }}
            >
              <span className="or-sign-cn">{s.text}</span>
              <div className="or-sign-glow" />
            </div>
          ))}
        </div>

        {/* Overload tagline */}
        <div className="or-overload">视觉过载</div>
      </div>
    );
  }

  return null;
}
