import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
    return (
        <footer className="bbc-footer">
            <div className="bbc-footer-content">
                <div className="footer-brand-title">NEWS | ANALYTICS</div>
                
               <ul className="footer-links-list">
    <li><Link to="/trust">Почему NEWS | ANALYTICS заслуживает доверия</Link></li>
    <li><Link to="/terms">Правила использования</Link></li>
    <li><Link to="/contact">Личные данные</Link></li>
    <li><Link to="/cookies">Куки</Link></li>
    <li><Link to="/contact-editorial">Связаться с редакцией</Link></li>
</ul>

                <div className="footer-copyright">
                    <p>© 2026 NEWS | ANALYTICS. Портал не несет ответственности за содержание внешних сайтов.</p>
                </div>
            </div>
        </footer>
    );
};