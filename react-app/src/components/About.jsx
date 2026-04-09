import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const STATS = [
  { value: 12000, suffix: "+", label: "Задоволених клієнтів" },
  { value: 500, suffix: "+", label: "Товарів у каталозі" },
  { value: 7, suffix: "", label: "Міст присутності" },
  { value: 99, suffix: "%", label: "Позитивних відгуків" },
];

const TEAM = [
  { name: "Олексій Стрілець", role: "Засновник & CEO", emoji: "👨‍💼", desc: "12 років в ігровій індустрії. Пасіонат кіберспорту та технологій." },
  { name: "Марина Коваль", role: "Head of Sales", emoji: "👩‍💻", desc: "Експерт з підбору обладнання. Допоможе знайти ідеальний сетап." },
  { name: "Дмитро Павленко", role: "Tech Lead", emoji: "🧑‍🔧", desc: "Збирає ПК з 2015 року. Знає кожен компонент зсередини." },
  { name: "Аліна Сорока", role: "Customer Care", emoji: "👩‍🎤", desc: "Гарантує 100% задоволення кожного клієнта." },
];

const VALUES = [
  { icon: "⚡", title: "Швидкість", text: "Доставляємо за 1–3 дні по всій Україні. Ваш сетап не чекатиме." },
  { icon: "🛡️", title: "Гарантія", text: "Офіційна гарантія на весь товар. Сервісні центри у кожному місті." },
  { icon: "💎", title: "Якість", text: "Тільки перевірені бренди та оригінальні комплектуючі. Ніяких підробок." },
  { icon: "🎮", title: "Експертиза", text: "Команда геймерів зі стажем. Знаємо, що потрібно для перемоги." },
  { icon: "💰", title: "Ціна", text: "Найкращі ціни ринку. Знижки для постійних клієнтів та партнерів." },
  { icon: "🤝", title: "Підтримка", text: "Онлайн-підтримка 24/7. Завжди поруч, коли потрібна допомога." },
];

const TIMELINE = [
  { year: "2019", event: "Заснування GAMESTORE у Києві. Перший офіс 20м²." },
  { year: "2020", event: "Запуск інтернет-магазину. 500 перших замовлень за місяць." },
  { year: "2021", event: "Відкриття 3 нових магазинів. Партнерство з ASUS та Logitech." },
  { year: "2022", event: "10 000+ клієнтів. Запуск власного сервісного центру." },
  { year: "2023", event: "Розширення в 7 міст України. Оновлений каталог 500+ товарів." },
  { year: "2024", event: "Офіційний дистриб'ютор MSI, Gigabyte, Razer в Україні." },
  { year: "2025", event: "Переможець Ukrainian E-Commerce Awards. 12 000+ клієнтів." },
];

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const [visible, setVisible] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }));
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-id]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-grid" />
        <div className="about-hero-glow" />
        <div className="container">
          <div className="about-hero-content">
            <div className="hero-badge">🎮 ПРО НАС</div>
            <h1 className="about-hero-title">
              МИ — КОМАНДА<br />
              <span className="hero-accent">ГЕЙМЕРІВ</span><br />
              ДЛЯ ГЕЙМЕРІВ
            </h1>
            <p className="about-hero-desc">
              З 2019 року GAMESTORE — це не просто магазин. Це спільнота
              людей, які живуть грою. Ми знаємо, що таке FPS drop о третій
              ночі, і саме тому підбираємо тільки найкраще обладнання.
            </p>
            <div className="about-hero-cta">
              <Link to="/stores" className="btn-about-primary">📍 Наші магазини</Link>
              <Link to="/" className="btn-about-secondary">🛒 До каталогу</Link>
            </div>
          </div>
        </div>
        {/* Floating elements */}
        <div className="about-float-1">⚡</div>
        <div className="about-float-2">🎮</div>
        <div className="about-float-3">🖥️</div>
      </section>

      {/* STATS */}
      <section className="about-stats-section">
        <div className="container">
          <div className="about-stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="about-stat-card" data-id={`stat-${i}`}
                style={{ animationDelay: `${i * 0.1}s`, opacity: visible[`stat-${i}`] ? 1 : 0, transform: visible[`stat-${i}`] ? "translateY(0)" : "translateY(30px)", transition: `all 0.6s ease ${i * 0.1}s` }}>
                <div className="about-stat-value"><CountUp target={s.value} suffix={s.suffix} /></div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div className="container">
          <div className="about-mission-grid">
            <div className="about-mission-text" data-id="mission"
              style={{ opacity: visible["mission"] ? 1 : 0, transform: visible["mission"] ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s ease" }}>
              <div className="section-label">🎯 НАША МІСІЯ</div>
              <h2 className="about-section-title">Зробити топовий<br />ігровий сетап<br /><span className="hero-accent">доступним кожному</span></h2>
              <p className="about-mission-desc">
                Ми вважаємо, що якісне ігрове обладнання — це не розкіш, а
                інструмент. Саме тому ми постійно шукаємо кращі ціни, тестуємо
                кожен товар і пишаємося тим, що наші клієнти повертаються знову.
              </p>
              <p className="about-mission-desc">
                Наша цільова аудиторія — це кіберспортсмени, стримери, хардкорні
                геймери та всі, хто хоче отримати максимум від своєї гри.
              </p>
              <div className="about-mission-tags">
                <span className="mission-tag">🏆 Кіберспорт</span>
                <span className="mission-tag">📹 Стримінг</span>
                <span className="mission-tag">🎯 FPS Гравці</span>
                <span className="mission-tag">🖥️ ПК Ентузіасти</span>
              </div>
            </div>
            <div className="about-mission-visual" data-id="visual"
              style={{ opacity: visible["visual"] ? 1 : 0, transform: visible["visual"] ? "translateX(0)" : "translateX(40px)", transition: "all 0.7s ease 0.2s" }}>
              <div className="mission-card-big">
                <div className="mission-card-icon">🎮</div>
                <div className="mission-card-title">GAMESTORE</div>
                <div className="mission-card-sub">Gaming Equipment Store</div>
                <div className="mission-card-divider" />
                <div className="mission-specs">
                  <div className="mspec"><span>📦</span> 500+ товарів</div>
                  <div className="mspec"><span>🚀</span> Доставка 1–3 дні</div>
                  <div className="mspec"><span>🛡️</span> Гарантія 24 місяці</div>
                  <div className="mspec"><span>💬</span> Підтримка 24/7</div>
                  <div className="mspec"><span>🌍</span> 7 міст України</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЦІННОСТІ */}
      <section className="about-values">
        <div className="container">
          <div className="section-header-center">
            <div className="section-label">💡 НАШІ ЦІННОСТІ</div>
            <h2 className="about-section-title-center">Чому обирають <span className="hero-accent">GAMESTORE</span></h2>
          </div>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card" data-id={`val-${i}`}
                style={{ opacity: visible[`val-${i}`] ? 1 : 0, transform: visible[`val-${i}`] ? "translateY(0)" : "translateY(30px)", transition: `all 0.6s ease ${i * 0.08}s` }}>
                <div className="value-icon">{v.icon}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-text">{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="about-timeline">
        <div className="container">
          <div className="section-header-center">
            <div className="section-label">📅 НАША ІСТОРІЯ</div>
            <h2 className="about-section-title-center">Шлях від гаражу<br />до <span className="hero-accent">топ-магазину</span></h2>
          </div>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? "tl-left" : "tl-right"}`}
                data-id={`tl-${i}`}
                style={{ opacity: visible[`tl-${i}`] ? 1 : 0, transform: visible[`tl-${i}`] ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${i * 0.1}s` }}>
                <div className="tl-year">{t.year}</div>
                <div className="tl-dot" />
                <div className="tl-card">
                  <p>{t.event}</p>
                </div>
              </div>
            ))}
            <div className="tl-line" />
          </div>
        </div>
      </section>

      {/* КОМАНДА */}
      <section className="about-team">
        <div className="container">
          <div className="section-header-center">
            <div className="section-label">👥 КОМАНДА</div>
            <h2 className="about-section-title-center">Люди за <span className="hero-accent">GAMESTORE</span></h2>
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={i} className="team-card" data-id={`tm-${i}`}
                style={{ opacity: visible[`tm-${i}`] ? 1 : 0, transform: visible[`tm-${i}`] ? "scale(1)" : "scale(0.95)", transition: `all 0.5s ease ${i * 0.1}s` }}>
                <div className="team-avatar">{m.emoji}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-inner">
            <div className="about-cta-glow" />
            <h2 className="about-cta-title">Готовий до нового рівня? 🚀</h2>
            <p className="about-cta-sub">Відвідай каталог та підбери свій ідеальний ігровий сетап</p>
            <div className="about-cta-btns">
              <Link to="/" className="btn-about-primary">🛒 Перейти до каталогу</Link>
              <Link to="/stores" className="btn-about-secondary">📍 Знайти магазин</Link>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">GAME<span>STORE</span></div>
        <p>© 2025 GAME STORE — Ігрові комп'ютери та девайси. Усі права захищено.</p>
      </footer>
    </div>
  );
}
