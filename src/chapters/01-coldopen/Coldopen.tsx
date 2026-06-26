import { useEffect, useRef } from "react";
import "./Coldopen.css";

export default function Coldopen({ step }: { step: number }) {
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);

  // Rain animation on canvas
  useEffect(() => {
    const canvas = rainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const drops: { x: number; y: number; speed: number; len: number }[] = [];
    for (let i = 0; i < 200; i++) {
      drops.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        speed: 6 + Math.random() * 14,
        len: 20 + Math.random() * 50,
      });
    }

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, 1920, 1080);

      drops.forEach((d) => {
        // Rain color uses theme token via CSS var — we read computed style once
        d.y += d.speed;
        if (d.y > 1080) {
          d.y = -d.len;
          d.x = Math.random() * 1920;
        }

        const alpha = 0.15 + (d.speed / 20) * 0.3;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.len);
        ctx.strokeStyle = `rgba(0,255,204,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };
    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  if (step === 0) {
    return (
      <div className="co-scene">
        {/* Rain canvas */}
        <canvas ref={rainCanvasRef} className="co-rain" />

        {/* Central question */}
        <div className="co-hero">
          <span className="co-hero-text" data-text="未来的样子……">未来的样子……</span>
        </div>

        {/* Bottom hint — subtle */}
        <div className="co-hint">点击屏幕或按 → 继续</div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="co-scene">
        {/* Rain canvas */}
        <canvas ref={rainCanvasRef} className="co-rain" />

        {/* Neon signs flickering in */}
        <div className="co-neon-row">
          <div className="co-neon-sign co-neon-left">
            <span className="co-neon-text">CYBER</span>
            <div className="co-neon-glow" />
          </div>
          <div className="co-neon-sign co-neon-right">
            <span className="co-neon-text co-neon-magenta">PUNK</span>
            <div className="co-neon-glow co-neon-glow-magenta" />
          </div>
        </div>

        {/* Wet street reflection */}
        <div className="co-street" />

        {/* Tagline */}
        <div className="co-tagline">雨夜的城市，霓虹灯闪烁</div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="co-scene">
        {/* Rain canvas — reduced opacity */}
        <canvas ref={rainCanvasRef} className="co-rain co-rain-faint" />

        {/* City silhouette upward */}
        <div className="co-city-wrap">
          <svg className="co-city-svg" viewBox="0 0 1920 600" preserveAspectRatio="none">
            {/* Foreground buildings — dark */}
            <rect x="0" y="300" width="180" height="300" className="co-build co-build-dark" />
            <rect x="160" y="220" width="120" height="380" className="co-build co-build-dark" />
            <rect x="260" y="350" width="80" height="250" className="co-build co-build-dark" />
            <rect x="320" y="180" width="200" height="420" className="co-build co-build-dark" />
            <rect x="500" y="280" width="150" height="320" className="co-build co-build-dark" />
            <rect x="630" y="150" width="160" height="450" className="co-build co-build-dark" />
            <rect x="770" y="320" width="100" height="280" className="co-build co-build-dark" />
            <rect x="850" y="200" width="220" height="400" className="co-build co-build-dark" />
            <rect x="1050" y="260" width="140" height="340" className="co-build co-build-dark" />
            <rect x="1170" y="170" width="180" height="430" className="co-build co-build-dark" />
            <rect x="1330" y="300" width="120" height="300" className="co-build co-build-dark" />
            <rect x="1430" y="230" width="160" height="370" className="co-build co-build-dark" />
            <rect x="1570" y="340" width="130" height="260" className="co-build co-build-dark" />
            <rect x="1680" y="190" width="240" height="410" className="co-build co-build-dark" />

            {/* Accent building — tallest, neon-lit */}
            <rect x="570" y="80" width="100" height="520" className="co-build co-build-accent" />

            {/* Hologram ads */}
            <rect x="340" y="220" rx="2" width="100" height="40" className="co-holo" />
            <rect x="870" y="270" rx="2" width="140" height="50" className="co-holo" />
            <rect x="1190" y="210" rx="2" width="90" height="35" className="co-holo" />

            {/* Windows — tiny glowing dots */}
            {Array.from({ length: 60 }).map((_, i) => (
              <rect
                key={i}
                x={80 + (i % 30) * 55 + Math.random() * 10}
                y={290 + Math.floor(i / 30) * 45 + Math.random() * 8}
                width={6 + Math.random() * 8}
                height={8 + Math.random() * 6}
                className="co-window"
              />
            ))}
          </svg>
        </div>

        {/* Skyline glow */}
        <div className="co-sky-glow" />

        {/* Tagline */}
        <div className="co-tagline co-tagline-bottom">高耸的建筑直插云霄</div>
      </div>
    );
  }

  return null;
}
