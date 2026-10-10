
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Economy.css";

const API_URL = (
    import.meta.env.VITE_API_URL || "https://news-analytics-5or6.vercel.app"
).replace(/\/$/, "");

export const EconomyPage = () => {
    const [economyNews, setEconomyNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchEconomyNews = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/articles`,
                    {
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Ошибка загрузки новостей: ${response.status}`
                    );
                }

                const result = await response.json();

                // Поддерживаем ответы в виде массива
                // или объекта с массивом articles.
                const articles = Array.isArray(result)
                    ? result
                    : Array.isArray(result.articles)
                    ? result.articles
                    : Array.isArray(result.data)
                    ? result.data
                    : [];

                const filteredNews = articles.filter(
                    (article) =>
                        String(article.category || "")
                            .toLowerCase()
                            .trim() === "economy"
                );

                setEconomyNews(filteredNews);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(
                        "Ошибка загрузки новостей экономики:",
                        err
                    );

                    setError(
                        "Не удалось загрузить новости. Попробуйте обновить страницу."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchEconomyNews();

        return () => controller.abort();
    }, []);

    return (
        <main className="economy-page">
            {/* HERO */}
            <section className="economy-hero">
                <div className="economy-container">
                    <div className="economy-hero-content">
                        <div className="economy-section-label">
                            ЭКОНОМИКА
                        </div>

                        <h1>Экономика</h1>

                        <p>
                            Последние новости экономики,
                            бизнеса, финансов и инвестиций.
                        </p>
                    </div>
                </div>
            </section>

            {/* NEWS */}
            <section className="economy-news-section">
                <div className="economy-container">
                    <div className="economy-section-header">
                        <h2>Последние новости</h2>

                        <span>
                            {loading
                                ? "Загрузка..."
                                : `${economyNews.length} публикаций`}
                        </span>
                    </div>

                    {/* Загрузка */}
                    {loading ? (
                        <div className="economy-empty">
                            <h3>Загружаем новости...</h3>
                            <p>
                                Получаем последние публикации с сервера.
                            </p>
                        </div>
                    ) : error ? (
                        /* Ошибка API */
                        <div className="economy-empty">
                            <h3>Не удалось загрузить новости</h3>
                            <p>{error}</p>
                        </div>
                    ) : economyNews.length === 0 ? (
                        /* Нет публикаций */
                        <div className="economy-empty">
                            <h3>Пока нет новостей</h3>
                            <p>
                                Новости в разделе «Экономика»
                                появятся здесь.
                            </p>
                        </div>
                    ) : (
                        /* Карточки */
                        <div className="economy-news-grid">
                            {economyNews.map((news) => {
                                const id = news._id || news.id;

                                const image =
                                    news.mediaUrl ||
                                    news.photo ||
                                    news.image ||
                                    news.imageUrl;

                                return (
                                    <Link
                                        key={id}
                                        to={`/article/${id}`}
                                        className="economy-news-card"
                                    >
                                        {image && (
                                            <div className="economy-news-image-wrapper">
                                                <img
                                                    src={image}
                                                    alt={news.title || "Новость"}
                                                    className="economy-news-image"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}

                                        <div className="economy-news-content">
                                            <div className="economy-news-meta">
                                                {news.time && (
                                                    <span className="economy-news-time">
                                                        {news.time}
                                                    </span>
                                                )}

                                                <span className="economy-news-category">
                                                    Экономика
                                                </span>
                                            </div>

                                            <h3 className="economy-news-title">
                                                {news.title}
                                            </h3>

                                            {news.content && (
                                                <p className="economy-news-description">
                                                    {news.content}
                                                </p>
                                            )}

                                            <span className="economy-news-more">
                                                Читать далее →
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* BOTTOM */}
            <section className="economy-bottom">
                <div className="economy-container">
                    <Link
                        to="/"
                        className="economy-back-home"
                    >
                        ← Вернуться на главную
                    </Link>
                </div>
            </section>
        </main>
    );
};

