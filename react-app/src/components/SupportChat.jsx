import { useState, useEffect, useRef } from "react";

const BOT_NAME = "GBOT";
const BOT_AVATAR = "🤖";

const AUTO_RESPONSES = {
  default: [
    "Дякую за звернення! Наш менеджер відповість вам протягом 5 хвилин.",
    "Розумію ваше питання. Можу допомогти з вибором товару або оформленням замовлення.",
    "Якщо у вас є питання по доставці — ми працюємо через Нову Пошту та Укрпошту.",
  ],
  доставка: [
    "📦 Доставка здійснюється через Нову Пошту та Укрпошту.\n⏱ Строк: 1–3 робочих дні.\n💰 Безкоштовно при замовленні від 5000 ₴.",
  ],
  оплата: [
    "💳 Ми приймаємо:\n• Банківська картка\n• Оплата на рахунок\n• Накладений платіж\n• Monobank / Privat24",
  ],
  гарантія: [
    "🛡️ На всю техніку діє офіційна гарантія:\n• Комп'ютери — 24 місяці\n• Периферія — 12 місяців\nСервісні центри є у кожному місті.",
  ],
  ціна: [
    "💰 Ми надаємо знижку 5% на кожне замовлення автоматично. Також є акції кожного тижня!",
  ],
  повернення: [
    "🔄 Повернення товару можливе протягом 14 днів відповідно до Закону про захист прав споживачів.",
  ],
  привіт: [
    "👋 Привіт! Я GBOT — асистент магазину GAMESTORE. Чим можу допомогти? Запитайте про доставку, оплату, гарантію або товари.",
  ],
  контакт: [
    "📞 Телефон: +38 (067) 123-45-67\n📧 Email: support@gamestore.ua\n🕐 Пн–Нд: 9:00–21:00",
  ],
};

function getBotReply(text) {
  const lower = text.toLowerCase();
  for (const key of Object.keys(AUTO_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) {
      const arr = AUTO_RESPONSES[key];
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
  const def = AUTO_RESPONSES.default;
  return def[Math.floor(Math.random() * def.length)];
}

const QUICK_REPLIES = ["Доставка", "Оплата", "Гарантія", "Повернення", "Контакти"];

export default function SupportChat({ onClose }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Привіт! Я **GBOT** — ваш розумний асистент.\n\nЗапитайте мене про доставку, оплату, гарантію або будь-що інше!",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    setMessages(prev => [...prev, { from: "user", text: msg, time: new Date() }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply = getBotReply(msg);
      setMessages(prev => [...prev, { from: "bot", text: reply, time: new Date() }]);
    }, 900 + Math.random() * 600);
  };

  const formatTime = (d) =>
    d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

  const renderText = (text) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));

  return (
    <div className="support-chat">
      {/* Header */}
      <div className="support-header">
        <div className="support-bot-info">
          <div className="support-bot-avatar">{BOT_AVATAR}</div>
          <div>
            <div className="support-bot-name">{BOT_NAME}</div>
            <div className="support-bot-status"><span className="online-dot" />Онлайн</div>
          </div>
        </div>
        <button className="support-close" onClick={onClose}>✕</button>
      </div>

      {/* Messages */}
      <div className="support-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`support-msg ${msg.from === "user" ? "support-msg-user" : "support-msg-bot"}`}>
            {msg.from === "bot" && <div className="support-msg-avatar">{BOT_AVATAR}</div>}
            <div className="support-msg-bubble">
              <div className="support-msg-text">{renderText(msg.text)}</div>
              <div className="support-msg-time">{formatTime(msg.time)}</div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="support-msg support-msg-bot">
            <div className="support-msg-avatar">{BOT_AVATAR}</div>
            <div className="support-msg-bubble">
              <div className="support-typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="support-quick">
        {QUICK_REPLIES.map(q => (
          <button key={q} className="support-quick-btn" onClick={() => sendMessage(q.toLowerCase())}>
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="support-input-row">
        <input
          className="support-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Напишіть повідомлення..."
        />
        <button className="support-send" onClick={() => sendMessage()}>➤</button>
      </div>
    </div>
  );
}
