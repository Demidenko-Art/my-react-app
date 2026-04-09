import { useState } from "react";
import Card from "./Card";
import products from "./data";

const CATEGORIES = ["Всі", "PC", "Mouse", "Keyboard", "Headset", "Monitor", "Mousepad"];
const CATEGORY_LABELS = { PC: "Комп'ютери", Mouse: "Мишки", Keyboard: "Клавіатури", Headset: "Навушники", Monitor: "Монітори", Mousepad: "Килимки", "Всі": "Всі" };

export default function Home({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState("Всі");

  const pcProducts = products.filter(p => p.category === "PC");
  const deviceProducts = products.filter(p => p.category !== "PC");
  const filteredDevices = activeCategory === "Всі"
    ? deviceProducts
    : deviceProducts.filter(p => p.category === activeCategory);

  return (
    <div className="container">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">⚡ НОВІ НАДХОДЖЕННЯ 2026</div>
          <h1 className="hero-title">МАКСИМАЛЬНА<br /><span className="hero-accent">ПРОДУКТИВНІСТЬ</span></h1>
          <p className="hero-sub">Ігрові ПК та периферія для переможців</p>
          <div className="hero-stats">
            <div className="stat"><strong>500+</strong><span>Товарів</span></div>
            <div className="stat-sep" />
            <div className="stat"><strong>24/7</strong><span>Підтримка</span></div>
            <div className="stat-sep" />
            <div className="stat"><strong>1–3 дні</strong><span>Доставка</span></div>
          </div>
        </div>
        <div className="hero-glow" />
      </section>

      {/* ПК СЕКЦІЯ */}
      <section>
        <h2 className="section-title">⚡ ІГРОВІ КОМП'ЮТЕРИ</h2>
        <div className="product-grid">
          {pcProducts.map(p => <Card key={p.id} product={p} addToCart={addToCart} />)}
        </div>
      </section>

      {/* ДЕВАЙСИ */}
      <section style={{ marginTop: "60px" }}>
        <h2 className="section-title">🎮 ПЕРИФЕРІЯ ТА АКСЕСУАРИ</h2>

        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredDevices.map(p => <Card key={p.id} product={p} addToCart={addToCart} />)}
        </div>
      </section>

      <footer>
        <div className="footer-logo">GAME<span>STORE</span></div>
        <p>© 2025 GAME STORE — Ігрові комп'ютери та девайси. Усі права захищено.</p>
      </footer>
    </div>
  );
}
