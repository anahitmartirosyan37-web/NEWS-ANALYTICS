import { Link } from "react-router-dom";
import "./header.css";
import { useState, useEffect } from "react";

export const MyHeader = () => {
    // Храним язык прямо в шапке и сохраняем в localStorage
    const [lang, setLang] = useState(() => localStorage.getItem("app_lang") || "ru");

    useEffect(() => {
        localStorage.setItem("app_lang", lang);
    }, [lang]);

    // Простой словарь текстов для меню
    const menuTexts = {
        ru: { home: "Главная", politics: "Политика", society: "Общество", economy: "Экономика", world: "В мире", contact: "Контакты" },
        en: { home: "Home", politics: "Politics", society: "Society", economy: "Economy", world: "World", contact: "Contact" },
        hy: { home: "Գլխավոր", politics: "Քաղաքականություն", society: "Հասարակություն", economy: "Տնտեսություն", world: "Աշխարհ", contact: "Կապ" }
    };

    const t = menuTexts[lang] || menuTexts.ru;

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <div className="logo-text-group">
                        <span className="logo-sub-eng">NEWS | ANALYTICS</span> <br />
                        <span className="logo-sub-arm">ՀԱՅԱՍՏԱՆԻ ՔԱՂԱՔԱԿԱՆ ԵՎ ՏՆՏԵՍԱԿԱՆ ՎԵՐԼՈՒԾՈՒԹՅՈՒՆ</span>
                    </div>
                </Link>
            </div>
            
            <nav className="nav-links">
                <Link to="/">{t.home}</Link>
                <Link to="/politics">{t.politics}</Link>
                <Link to="/society">{t.society}</Link>
                <Link to="/economy">{t.economy}</Link>
                <Link to="/world">{t.world}</Link>
                <Link to="/contact">{t.contact}</Link>
            </nav>
            

            <div className="header-lang-wrapper" style={{ marginLeft: "15px" }}>
                <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value)}
                    style={{
                        backgroundColor: "#222",
                        color: "#fff",
                        border: "1px solid #444",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        outline: "none"
                    }}
                >
                    <option value="ru">🇷🇺 RU</option>
                    <option value="en">🇬🇧 EN</option>
                    <option value="hy">🇦🇲 HY</option>
                </select>
            </div>
        </header>
    );
};

