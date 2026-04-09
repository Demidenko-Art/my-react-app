import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import About from "./components/About";
import Stores from "./components/Stores";
import LoadingScreen from "./components/LoadingScreen";
import SupportChat from "./components/SupportChat";
import "./index.css";

const CART_STORAGE_KEY = "gamestore_cart";

function NavBar({ cart, setCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <Link to="/" className="nav-logo">GAME<span>STORE</span></Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === "/" ? "nav-link-active" : ""}`}>Каталог</Link>
        <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "nav-link-active" : ""}`}>Про нас</Link>
        <Link to="/stores" className={`nav-link ${location.pathname === "/stores" ? "nav-link-active" : ""}`}>Магазини</Link>
        <a href="/" className="nav-link">Акції</a>
      </div>
      <button className="cart-btn" onClick={() => setCartOpen(true)}>
        <span className="cart-btn-icon">🛒</span>
        <span className="cart-btn-text">Кошик</span>
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </button>
    </nav>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        toast.info(`Кількість ${product.name} збільшена`, { icon: "➕" });
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      toast.success(`${product.name} додано в кошик`, { icon: "🛒" });
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.warn("Товар видалено з кошика");
  };

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Кошик очищено", { icon: "🗑️" });
  };

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <NavBar cart={cart} setCartOpen={setCartOpen} />

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/stores" element={<Stores />} />
      </Routes>

      {cartOpen && (
        <Cart cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} onClose={() => setCartOpen(false)} />
      )}

      {/* SUPPORT BUTTON */}
      <button className={`support-fab ${supportOpen ? "support-fab-active" : ""}`} onClick={() => setSupportOpen(!supportOpen)}>
        {supportOpen ? "✕" : "💬"}
        {!supportOpen && <span className="support-fab-label">Підтримка</span>}
      </button>

      {supportOpen && <SupportChat onClose={() => setSupportOpen(false)} />}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </BrowserRouter>
  );
}
