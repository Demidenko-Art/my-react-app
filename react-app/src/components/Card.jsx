import { Link } from "react-router-dom";

export default function Card({ product,addToCart }) {
  // Визначаємо тип товару для відображення (категорія)
  const getCategoryLabel = (cat) => {
    const map = {
      PC: "Ігровий комп'ютер",
      Mouse: "Миша",
      Keyboard: "Клавіатура",
      Headset: "Гарнітура"
    };
    return map[cat] || "Аксесуар";
  };

  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={product.image} alt={product.name} className="card-image" />
        {product.fps && (
          <div className="fps-badge">
            <span className="fps-value">{product.fps}</span>
            <span className="fps-label">FPS</span>
          </div>
        )}
      </div>

      <div className="card-content">
        <div className="product-type">{getCategoryLabel(product.category)}</div>
        <h3 className="product-name">{product.name}</h3>
        
        {product.specs ? (
          <ul className="spec-list">
            {product.specs.map((spec, i) => (
              <li key={i} className="spec-item">{spec}</li>
            ))}
          </ul>
        ) : (
          <p className="description">{product.description}</p>
        )}
        
        <div className="stars">★★★★★</div>
        <span className="availability">В наявності</span>
      </div>

      <div className="price-section">
        <div>
          {product.oldPrice && (
            <span className="old-price">{product.oldPrice} ₴</span>
          )}
          <span className="current-price">{product.price} ₴</span>
        </div>
        <Link to={`/product/${product.id}`} className="buy-btn">
          КУПИТИ
        </Link>
 
      </div>
    </div>
  );
}