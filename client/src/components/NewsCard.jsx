import { useNavigate } from "react-router-dom";
import "./NewsCard.css";

export const NewsCard = ({ title, category, date, description , to }) => {
    const nav = useNavigate()
    return (
        <div className="news-card">
            <span className="news-category">{category}</span>
            <h3 className="news-title">{title}</h3>
            <p className="news-desc">{description}</p>
            <div className="news-footer">
                <span className="news-date">{date}</span>
                <button className="read-more" onClick={() => nav(to)}>Читать →</button>
            </div>
        </div>
    );
};