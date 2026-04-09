import { useState, useEffect } from "react";

const LOADING_STEPS = [
  { label: "Ініціалізація системи...", pct: 15 },
  { label: "Завантаження каталогу...", pct: 40 },
  { label: "Підключення до бази даних...", pct: 65 },
  { label: "Завантаження зображень...", pct: 85 },
  { label: "Готово!", pct: 100 },
];

export default function LoadingScreen() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const intervals = LOADING_STEPS.map((_, i) =>
      setTimeout(() => setStep(i), i * 480)
    );
    return () => intervals.forEach(clearTimeout);
  }, []);

  const current = LOADING_STEPS[step];

  return (
    <div className="loading-screen">
      {/* Animated background grid */}
      <div className="loading-grid" />
      <div className="loading-glow-1" />
      <div className="loading-glow-2" />

      <div className="loading-content">
        {/* Logo */}
        <div className="loading-logo">
          <span className="loading-logo-game">GAME</span>
          <span className="loading-logo-store">STORE</span>
        </div>
        <div className="loading-tagline">GAMING EQUIPMENT SINCE 2026</div>

        {/* Progress bar */}
        <div className="loading-bar-wrap">
          <div className="loading-bar-track">
            <div
              className="loading-bar-fill"
              style={{ width: `${current.pct}%` }}
            />
            <div className="loading-bar-glow" style={{ left: `${current.pct}%` }} />
          </div>
          <div className="loading-pct">{current.pct}%</div>
        </div>

        <div className="loading-step-label">{current.label}</div>

        {/* Decorative dots */}
        <div className="loading-dots">
          {LOADING_STEPS.map((_, i) => (
            <div key={i} className={`loading-dot ${i <= step ? "loading-dot-active" : ""}`} />
          ))}
        </div>
      </div>

      {/* Corner decoration */}
      <div className="loading-corner tl" />
      <div className="loading-corner tr" />
      <div className="loading-corner bl" />
      <div className="loading-corner br" />
    </div>
  );
}
