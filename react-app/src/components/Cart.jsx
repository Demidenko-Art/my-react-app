import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, removeFromCart, updateQty, onClose }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = cart.length > 0 ? Math.round(total * 0.05) : 0; // 5% знижка при замовленні
  const finalTotal = total - discount;

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">🛒 Ваш кошик</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🎮</div>
            <p>Кошик порожній</p>
            <span>Додайте товари з каталогу</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, i) => (
                <div className="cart-item" key={i}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">{(item.price * item.qty).toLocaleString()} ₴</div>
                    <div className="qty-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >−</button>
                      <span className="qty-value">{item.qty}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >+</button>
                    </div>
                  </div>
                  <button className="cart-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              {discount > 0 && (
                <div className="cart-discount">
                  <span>💰 Знижка (5%):</span>
                  <span className="discount-value">-{discount.toLocaleString()} ₴</span>
                </div>
              )}
              <div className="cart-total">
                <span>Разом:</span>
                <span className="cart-total-price">{finalTotal.toLocaleString()} ₴</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                ОФОРМИТИ ЗАМОВЛЕННЯ →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
