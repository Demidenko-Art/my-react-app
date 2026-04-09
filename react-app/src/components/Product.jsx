import { useParams, Link } from "react-router-dom";
import products from "./data";

export default function Product({ addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) return (
    <div className="container" style={{ textAlign: "center", paddingTop: "80px" }}>
      <h2 style={{ color: "white", fontSize: "32px" }}>❌ Товар не знайдено</h2>
      <Link to="/" className="back-link">← Повернутися на головну</Link>
    </div>
  );

  const discount = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : null;

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="container">
      <Link to="/" className="back-link">← Назад до каталогу</Link>

      <div className="product-page">
        {/* Ліва — зображення */}
        <div className="product-image-large">
          {discount && <div className="discount-badge-lg">-{discount}%</div>}
          <img src={product.image} alt={product.name} />
        </div>

        {/* Права — деталі */}
        <div className="product-details">
          <div className="product-category-tag">
            {{ PC: "Ігровий ПК", Mouse: "Миша", Keyboard: "Клавіатура", Headset: "Гарнітура", Monitor: "Монітор", Mousepad: "Килимок" }[product.category]}
          </div>
          <h1>{product.name}</h1>

          <div className="product-rating">
            <span className="stars-big">★★★★★</span>
            <span className="rating-count">128 відгуків</span>
          </div>

          <div className="price-block-lg">
            {product.oldPrice && (
              <span className="old-price-lg">{product.oldPrice.toLocaleString()} ₴</span>
            )}
            <span className="current-price-lg">{product.price.toLocaleString()} ₴</span>
          </div>

          {product.fps && (
            <div className="fps-highlight">
              <span className="fps-icon">⚡</span>
              <span><strong>{product.fps} FPS</strong> на ультра налаштуваннях</span>
            </div>
          )}

          <div className="product-specs">
            <h3>Характеристики</h3>
            {product.specs ? (
              <ul>
                {product.specs.map((spec, i) => <li key={i}>{spec}</li>)}
              </ul>
            ) : (
              <p className="product-desc-text">{product.description}</p>
            )}
          </div>

          <div className="avail-row">
            <span className="availability"><span className="avail-dot" />В наявності</span>
            <span className="delivery-note">🚚 Доставка 1–3 дні</span>
          </div>

          <div className="product-actions">
            <button onClick={() => addToCart(product)} className="add-to-cart-lg">
              🛒 ДОДАТИ В КОШИК
            </button>
            <button className="buy-now-btn">⚡ КУПИТИ ЗАРАЗ</button>
          </div>
        </div>
      </div>

      {/* Схожі товари */}
      {related.length > 0 && (
        <section style={{ marginTop: "60px" }}>
          <h2 className="section-title">🔥 СХОЖІ ТОВАРИ</h2>
          <div className="product-grid">
            {related.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} className="related-card">
                <img src={p.image} alt={p.name} />
                <div className="related-info">
                  <div className="related-name">{p.name}</div>
                  <div className="related-price">{p.price.toLocaleString()} ₴</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer>
        <div className="footer-logo">GAME<span>STORE</span></div>
        <p>© 2025 GAME STORE — Ігрові комп'ютери та девайси.</p>
      </footer>
    </div>
  );
}
