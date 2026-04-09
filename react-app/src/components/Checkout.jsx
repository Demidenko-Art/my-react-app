import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Дані Нової Пошти
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [cityRef, setCityRef] = useState("");      
  const [departments, setDepartments] = useState([]);
  const [isLoadingDeps, setIsLoadingDeps] = useState(false);
  
  // Оптимізація: Кеш для відділень
  const [depsCache, setDepsCache] = useState({});

  // ВСІ ТВОЇ ОРИГІНАЛЬНІ ПОЛЯ
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

  // Стиль для чорного фону полів
  const darkField = {
    backgroundColor: "#000",
    color: "#fff",
    border: "1px solid #444",
    outline: "none"
  };

  // 1. Завантаження міст
  useEffect(() => {
    fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      body: JSON.stringify({
        apiKey: "5543d3f63a80cde63ab5f229ba09dbda",
        modelName: "Address",
        calledMethod: "getCities"
      })
    })
      .then(res => res.json())
      .then(data => { if (data.success) setCities(data.data); });
  }, []);

  // 2. Пошук міста (фільтрація)
  const filteredCities = useMemo(() => {
    if (!searchTerm || cityRef) return [];
    return cities
      .filter(c => c.Description.toLowerCase().startsWith(searchTerm.toLowerCase()))
      .slice(0, 10);
  }, [searchTerm, cities, cityRef]);

  // 3. Завантаження відділень з кешуванням
  useEffect(() => {
    if (!cityRef) return;
    if (depsCache[cityRef]) {
      setDepartments(depsCache[cityRef]);
      return;
    }
    setIsLoadingDeps(true);
    fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      body: JSON.stringify({
        apiKey: "5543d3f63a80cde63ab5f229ba09dbda",
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: { CityRef: cityRef }
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDepartments(data.data);
          setDepsCache(prev => ({ ...prev, [cityRef]: data.data }));
        }
      })
      .finally(() => setIsLoadingDeps(false));
  }, [cityRef]);

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

  // ТВОЯ ОРИГІНАЛЬНА ВАЛІДАЦІЯ
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
    if (!formData.city || !formData.address) {
      toast.error("Будь ласка, оберіть місто та відділення");
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
    toast.loading("Обробляємо замовлення...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("✅ Замовлення успішно оформлено!");
      clearCart();
      setTimeout(() => navigate("/"), 2000);
    }, 2000);
  };

  if (cart.length === 0) return <div className="container">Кошик порожній</div>;

  return (
    <div className="container checkout-container">
      <Link to="/" className="back-link">← Назад до магазину</Link>

      <div className="checkout-wrapper">
        <div className="checkout-form">
          <h1 className="checkout-title">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h1>

          {/* ПРОГРЕС */}
          <div className="progress-bar">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}><div className="progress-num">1</div><div className="progress-label">Контакти</div></div>
            <div className={`progress-connector ${step > 1 ? 'active' : ''}`} />
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}><div className="progress-num">2</div><div className="progress-label">Адреса</div></div>
            <div className={`progress-connector ${step > 2 ? 'active' : ''}`} />
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}><div className="progress-num">3</div><div className="progress-label">Оплата</div></div>
          </div>

          {/* STEP 1: КОНТАКТИ */}
          {step === 1 && (
            <div className="checkout-step">
              <h2 className="step-title">👤 Ваші контакти</h2>
              <div className="form-group">
                <label>Ім'я *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-input" style={darkField} placeholder="Вкажіть ім'я" />
              </div>
              <div className="form-group">
                <label>Прізвище *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-input" style={darkField} placeholder="Вкажіть прізвище" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" style={darkField} placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Телефон *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" style={darkField} placeholder="+38 (0XX) XXX-XX-XX" />
              </div>
            </div>
          )}

          {/* STEP 2: АДРЕСА */}
          {step === 2 && (
            <div className="checkout-step">
              <h2 className="step-title">🏠 Адреса доставки</h2>
              <div className="form-group">
                <label>Пошук міста Нова Пошта *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  style={darkField} 
                  placeholder="Почніть вводити назву..." 
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCityRef(""); }}
                />
                {filteredCities.length > 0 && (
                  <div style={{ background: "#111", border: "1px solid #333", borderRadius: "4px", marginTop: "5px", maxHeight: "150px", overflowY: "auto" }}>
                    {filteredCities.map(c => (
                      <div 
                        key={c.Ref} 
                        style={{ padding: "10px", cursor: "pointer", color: "#fff", borderBottom: "1px solid #222" }}
                        onClick={() => {
                          setCityRef(c.Ref);
                          setSearchTerm(c.Description);
                          setFormData(prev => ({ ...prev, city: c.Description }));
                        }}
                      >
                        {c.Description}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cityRef && (
                <div className="form-group">
                  <label>Оберіть відділення *</label>
                  <select 
                    className="form-input" 
                    style={darkField} 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange}
                  >
                    <option value="">{isLoadingDeps ? "Завантаження..." : "Оберіть відділення"}</option>
                    {departments.map(d => <option key={d.Ref} value={d.Description}>{d.Description}</option>)}
                  </select>
                </div>
              )}

             
            </div>
          )}

          {/* STEP 3: ОПЛАТА */}
          {step === 3 && (
            <div className="checkout-step">
              <h2 className="step-title">💳 Метод оплати</h2>
              <div className="payment-methods">
                {['card', 'bank', 'cash'].map((m) => (
                  <label key={m} className={`payment-method-card ${formData.paymentMethod === m ? 'active' : ''}`}>
                    <input type="radio" checked={formData.paymentMethod === m} onChange={() => handlePaymentMethodChange(m)} />
                    <div className="payment-method-text">{m === 'card' ? 'Карта' : m === 'bank' ? 'Рахунок' : 'Готівка'}</div>
                  </label>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="card-form">
                  <div className="form-group">
                    <label>Номер карти *</label>
                    <input type="text" className="form-input" style={darkField} value={formData.cardNumber} onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
                      setFormData(p => ({...p, cardNumber: val}));
                    }} placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="form-row" style={{ display: "flex", gap: "10px" }}>
                    <input type="text" className="form-input" style={darkField} value={formData.cardExpiry} onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                      if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
                      setFormData(p => ({...p, cardExpiry: val}));
                    }} placeholder="MM/YY" />
                    <input type="text" className="form-input" style={darkField} value={formData.cardCVC} onChange={(e) => setFormData(p => ({...p, cardCVC: e.target.value.replace(/\D/g, '').slice(0, 3)}))} placeholder="CVC" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* КНОПКИ НАВІГАЦІЇ */}
          <div className="checkout-actions">
            {step > 1 && <button className="btn-secondary" onClick={() => setStep(step - 1)}>← НАЗАД</button>}
            {step < 3 ? (
              <button className="btn-primary" onClick={handleNextStep}>ДАЛІ →</button>
            ) : (
              <button className="btn-success" onClick={handleSubmitOrder}>✓ ПІДТВЕРДИТИ</button>
            )}
          </div>
        </div>

        {/* ПІДСУМОК */}
        <div className="checkout-summary">
          <h2 className="summary-title">📦 Ваше замовлення</h2>
          <div className="summary-total">
            <span>Всього:</span>
            <span className="total-price">{finalTotal.toLocaleString()} ₴</span>
          </div>
        </div>
      </div>
    </div>
  );
}