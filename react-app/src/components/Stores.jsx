import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const STORES = [
  {
    id: 1,
    city: "Київ",
    district: "Центр",
    address: "вул. Хрещатик, 22",
    phone: "+38 (067) 123-45-67",
    hours: "Пн–Нд: 10:00–21:00",
    metro: "м. Хрещатик",
    emoji: "🏙️",
    color: "#00c3ff",
    features: ["Шоурум", "Сервіс-центр", "Тест-зона"],
    flagship: true,
  },
  {
    id: 2,
    city: "Харків",
    district: "Центральний ринок",
    address: "пр. Науки, 14",
    phone: "+38 (063) 234-56-78",
    hours: "Пн–Сб: 10:00–20:00, Нд: 11:00–18:00",
    metro: "м. Університет",
    emoji: "🌆",
    color: "#00ff88",
    features: ["Шоурум", "Тест-зона"],
  },
  {
    id: 3,
    city: "Дніпро",
    district: "Лівий берег",
    address: "вул. Гагаріна, 5",
    phone: "+38 (097) 345-67-89",
    hours: "Пн–Нд: 10:00–20:00",
    metro: "ТЦ Мост-Сіті",
    emoji: "🌉",
    color: "#ffc947",
    features: ["Сервіс-центр", "Тест-зона"],
  },
  {
    id: 4,
    city: "Одеса",
    district: "Приморський район",
    address: "вул. Дерибасівська, 8",
    phone: "+38 (050) 456-78-90",
    hours: "Пн–Нд: 11:00–21:00",
    metro: "Центр",
    emoji: "🌊",
    color: "#ff6b1a",
    features: ["Шоурум"],
  },
  {
    id: 5,
    city: "Львів",
    district: "Галицький",
    address: "пл. Ринок, 15",
    phone: "+38 (066) 567-89-01",
    hours: "Пн–Сб: 10:00–20:00",
    metro: "Центр",
    emoji: "🏰",
    color: "#c77dff",
    features: ["Шоурум", "Тест-зона"],
  },
  {
    id: 6,
    city: "Запоріжжя",
    district: "Центральний",
    address: "пр. Соборний, 47",
    phone: "+38 (096) 678-90-12",
    hours: "Пн–Сб: 10:00–19:00",
    metro: "ТЦ Апрель",
    emoji: "⚡",
    color: "#ff3b3b",
    features: ["Тест-зона"],
  },
  {
    id: 7,
    city: "Вінниця",
    district: "Центр",
    address: "вул. Соборна, 31",
    phone: "+38 (093) 789-01-23",
    hours: "Пн–Сб: 10:00–19:00",
    metro: "Центр міста",
    emoji: "🏡",
    color: "#00c3ff",
    features: ["Шоурум"],
  },
];

const FEATURE_ICONS = {
  "Шоурум": "🖥️",
  "Сервіс-центр": "🔧",
  "Тест-зона": "🎮",
};

const CITIES_FILTER = ["Всі міста", ...STORES.map(s => s.city)];

export default function Stores() {
  const [filter, setFilter] = useState("Всі міста");
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setVisible(true), 100);
  }, []);

  const filtered = filter === "Всі міста" ? STORES : STORES.filter(s => s.city === filter);

  return (
    <div className="stores-page">
      {/* HERO */}
      <section className="stores-hero">
        <div className="stores-hero-bg" />
        <div className="container">
          <div className="hero-badge">📍 НАШІ МАГАЗИНИ</div>
          <h1 className="hero-title">
            7 МІСТ.<br />
            <span className="hero-accent">ОДНА ЯКІСТЬ.</span>
          </h1>
          <p className="hero-sub">Відвідай наш магазин та протестуй обладнання перед покупкою</p>
          <div className="stores-hero-stats">
            <div className="stores-hero-stat"><strong>7</strong><span>Міст</span></div>
            <div className="stores-hero-divider" />
            <div className="stores-hero-stat"><strong>3</strong><span>Сервіс-центри</span></div>
            <div className="stores-hero-divider" />
            <div className="stores-hero-stat"><strong>5</strong><span>Тест-зони</span></div>
            <div className="stores-hero-divider" />
            <div className="stores-hero-stat"><strong>7/7</strong><span>Дні роботи</span></div>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <div className="container">
        <div className="stores-filter">
          {CITIES_FILTER.map(c => (
            <button key={c} className={`cat-tab ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="stores-grid">
          {filtered.map((store, i) => (
            <div
              key={store.id}
              className={`store-card ${selected === store.id ? "store-card-selected" : ""}`}
              style={{
                "--store-color": store.color,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ease ${i * 0.07}s`,
              }}
              onClick={() => setSelected(selected === store.id ? null : store.id)}
            >
              {store.flagship && <div className="store-flagship">⭐ ФЛАГМАН</div>}

              <div className="store-card-header">
                <div className="store-emoji">{store.emoji}</div>
                <div className="store-city-info">
                  <div className="store-city">{store.city}</div>
                  <div className="store-district">{store.district}</div>
                </div>
                <div className="store-expand">{selected === store.id ? "▲" : "▼"}</div>
              </div>

              <div className="store-address">📍 {store.address}</div>

              <div className="store-features">
                {store.features.map(f => (
                  <span key={f} className="store-feature-tag" style={{ borderColor: store.color, color: store.color }}>
                    {FEATURE_ICONS[f]} {f}
                  </span>
                ))}
              </div>

              {selected === store.id && (
                <div className="store-details">
                  <div className="store-detail-row">
                    <span>📞</span>
                    <a href={`tel:${store.phone}`} className="store-phone">{store.phone}</a>
                  </div>
                  <div className="store-detail-row">
                    <span>🕐</span>
                    <span>{store.hours}</span>
                  </div>
                  <div className="store-detail-row">
                    <span>🚇</span>
                    <span>{store.metro}</span>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${store.city}+${store.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-map-btn"
                    style={{ background: store.color }}
                    onClick={e => e.stopPropagation()}
                  >
                    🗺️ Відкрити на карті
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* INFO БЛОК */}
        <div className="stores-info-section">
          <div className="stores-info-card">
            <div className="stores-info-icon">🎮</div>
            <h3>Тест-зона</h3>
            <p>Спробуй будь-який товар до покупки. У нас є повністю оснащені ігрові стенди з топовими моніторами та периферією.</p>
          </div>
          <div className="stores-info-card">
            <div className="stores-info-icon">🔧</div>
            <h3>Сервіс-центр</h3>
            <p>Власний сервіс-центр у Києві, Харкові та Дніпрі. Ремонт та гарантійне обслуговування без черги.</p>
          </div>
          <div className="stores-info-card">
            <div className="stores-info-icon">📦</div>
            <h3>Самовивіз</h3>
            <p>Замов онлайн та забери в магазині вже сьогодні. Резервуємо товар на 24 години безкоштовно.</p>
          </div>
          <div className="stores-info-card">
            <div className="stores-info-icon">💳</div>
            <h3>Розстрочка</h3>
            <p>Купуй зараз — плати пізніше. Розстрочка 0% на 6 та 12 місяців від ПриватБанку та Монобанку.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="stores-bottom-cta">
          <h2>Немає магазину в твоєму місті? 😔</h2>
          <p>Не проблема! Ми доставляємо замовлення по всій Україні через Нову Пошту та Укрпошту за 1–3 дні.</p>
          <Link to="/" className="btn-about-primary">🛒 Замовити онлайн</Link>
        </div>
      </div>

      <footer>
        <div className="footer-logo">GAME<span>STORE</span></div>
        <p>© 2025 GAME STORE — Ігрові комп'ютери та девайси. Усі права захищено.</p>
      </footer>
    </div>
  );
}
