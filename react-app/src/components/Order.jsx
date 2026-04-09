import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    paymentMethod: "card"
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = Math.round(total * 0.05);
  const finalTotal = total - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("Будь ласка, введіть ім'я та прізвище");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Введіть коректну email адресу");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Введіть номер телефону");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.address.trim() || !formData.city.trim()) {
      toast.error("Будь ласка, заповніть адресу доставки");
      return false;
    }
    if (!formData.zipCode.trim()) {
      toast.error("Введіть поштовий код");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (formData.paymentMethod === "card") {
      if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Номер карти повинен мати 16 цифр");
        return false;
      }
      if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        toast.error("Введіть строк дії карти у форматі MM/YY");
        return false;
      }
      if (formData.cardCVC.length !== 3) {
        toast.error("CVC повинен мати 3 цифри");
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  const handleSubmitOrder = async () => {
    if (!validateStep3()) return;

    // Імітуємо обробку платежу
    toast.loading("Обробляємо замовлення...");
    
    setTimeout(() => {
      toast.dismiss();
      toast.success("✅ Замовлення успішно оформлено!");
      
      // Очищуємо кошик
      clearCart();
      
      // Переходимо на сторінку успіху
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: "center", paddingTop: "80px", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ color: "white", fontSize: "32px", marginBottom: "20px" }}>❌ Кошик порожній</h2>
        <p style={{ color: "#5a7a9a", marginBottom: "30px" }}>Додайте товари перед оформленням замовлення</p>
        <Link to="/" className="back-link" style={{ padding: "12px 24px", background: "#00c3ff", color: "#000", textDecoration: "none", borderRadius: "6px", fontWeight: "700" }}>← Повернутися до магазину</Link>
      </div>
    );
  }

  return (
    <div className="container checkout-container">
      <Link to="/" className="back-link">← Назад до магазину</Link>

      <div className="checkout-wrapper">
        {/* Ліва сторона - Форма */}
        <div className="checkout-form">
          <h1 className="checkout-title">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h1>

          {/* Прогрес */}
          <div className="progress-bar">
            <div className="progress-step active">
              <div className="progress-num">1</div>
              <div className="progress-label">Контакти</div>
            </div>
            <div className={`progress-connector ${step > 1 ? 'active' : ''}`} />
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              <div className="progress-num">2</div>
              <div className="progress-label">Адреса</div>
            </div>
            <div className={`progress-connector ${step > 2 ? 'active' : ''}`} />
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <div className="progress-num">3</div>
              <div className="progress-label">Оплата</div>
            </div>
          </div>

          {/* Step 1: Контакти */}
          {step === 1 && (
            <div className="checkout-step">
              <h2 className="step-title">👤 Ваші контакти</h2>
              <div className="form-group">
                <label>Ім'я *</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Вкажіть ім'я"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Прізвище *</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Вкажіть прізвище"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Телефон *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+38 (0XX) XXX-XX-XX"
                  className="form-input"
                />
              </div>
            </div>
          )}

          {/* Step 2: Адреса */}
          {step === 2 && (
            <div className="checkout-step">
              <h2 className="step-title">🏠 Адреса доставки</h2>
              <div className="form-group">
                <label>Місто *</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Наприклад, Київ"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Адреса *</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Вулиця, дім, квартира"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Поштовий код *</label>
                <input 
                  type="text" 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="02000"
                  className="form-input"
                />
              </div>
              <div className="delivery-info">
                <span className="delivery-icon">🚚</span>
                <div>
                  <p className="delivery-method">Укрпошта / Meest Express</p>
                  <p className="delivery-time">Доставка 1-3 робочих дні</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Оплата */}
          {step === 3 && (
            <div className="checkout-step">
              <h2 className="step-title">💳 Метод оплати</h2>
              
              <div className="payment-methods">
                <label className={`payment-method-card ${formData.paymentMethod === 'card' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => handlePaymentMethodChange('card')}
                  />
                  <div className="payment-method-icon">💳</div>
                  <div className="payment-method-text">
                    <div className="payment-method-title">Карта (Visa/Mastercard)</div>
                    <div className="payment-method-desc">Безпечна оплата карткою</div>
                  </div>
                </label>

                <label className={`payment-method-card ${formData.paymentMethod === 'bank' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={() => handlePaymentMethodChange('bank')}
                  />
                  <div className="payment-method-icon">🏦</div>
                  <div className="payment-method-text">
                    <div className="payment-method-title">Переклад на рахунок</div>
                    <div className="payment-method-desc">Банківський переклад</div>
                  </div>
                </label>

                <label className={`payment-method-card ${formData.paymentMethod === 'cash' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={() => handlePaymentMethodChange('cash')}
                  />
                  <div className="payment-method-icon">💵</div>
                  <div className="payment-method-text">
                    <div className="payment-method-title">Готівкою при отриманні</div>
                    <div className="payment-method-desc">Оплата посилкою</div>
                  </div>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="card-form">
                  <div className="form-group">
                    <label>Номер карти *</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '').slice(0, 16);
                        val = val.replace(/(\d{4})/g, '$1 ').trim();
                        handleInputChange({ target: { name: 'cardNumber', value: val } });
                      }}
                      placeholder="1234 5678 9012 3456"
                      className="form-input"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Дата (MM/YY) *</label>
                      <input 
                        type="text" 
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (val.length >= 2) {
                            val = val.slice(0, 2) + '/' + val.slice(2);
                          }
                          handleInputChange({ target: { name: 'cardExpiry', value: val } });
                        }}
                        placeholder="MM/YY"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVC *</label>
                      <input 
                        type="text" 
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '').slice(0, 3);
                          handleInputChange({ target: { name: 'cardCVC', value: val } });
                        }}
                        placeholder="123"
                        className="form-input"
                        maxLength="3"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Кнопки навігації */}
          <div className="checkout-actions">
            {step > 1 && (
              <button 
                className="btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                ← НАЗАД
              </button>
            )}
            {step < 3 && (
              <button 
                className="btn-primary"
                onClick={handleNextStep}
              >
                ДАЛІ →
              </button>
            )}
            {step === 3 && (
              <button 
                className="btn-success"
                onClick={handleSubmitOrder}
              >
                ✓ ПІДТВЕРДИТИ ЗАМОВЛЕННЯ
              </button>
            )}
          </div>
        </div>

        {/* Права сторона - Сумарна інформація */}
        <div className="checkout-summary">
          <h2 className="summary-title">📦 Ваше замовлення</h2>
          
          <div className="summary-items">
            {cart.map((item, i) => (
              <div className="summary-item" key={i}>
                <div className="summary-item-info">
                  <div className="summary-item-name">{item.name}</div>
                  <div className="summary-item-qty">x{item.qty}</div>
                </div>
                <div className="summary-item-price">
                  {(item.price * item.qty).toLocaleString()} ₴
                </div>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          <div className="summary-row">
            <span>Сума товарів:</span>
            <span>{total.toLocaleString()} ₴</span>
          </div>

          {discount > 0 && (
            <div className="summary-row discount-row">
              <span>💰 Знижка (5%):</span>
              <span>-{discount.toLocaleString()} ₴</span>
            </div>
          )}

          <div className="summary-row delivery-row">
            <span>🚚 Доставка:</span>
            <span>Безплатна</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Всього до оплати:</span>
            <span className="total-price">{finalTotal.toLocaleString()} ₴</span>
          </div>

          <div className="summary-guarantee">
            <div className="guarantee-item">
              <span className="guarantee-icon">✅</span>
              <span>Безпечна оплата</span>
            </div>
            <div className="guarantee-item">
              <span className="guarantee-icon">🔒</span>
              <span>Захист даних</span>
            </div>
            <div className="guarantee-item">
              <span className="guarantee-icon">📱</span>
              <span>Смс-сповіщення</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
