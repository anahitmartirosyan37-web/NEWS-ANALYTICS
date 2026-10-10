import { useState } from "react";
import { Link } from "react-router-dom";
import { getArticlesByCategory } from "../../data/article";
import "./Economy.css";

export const EconomyPage = () => {
    const [economyNews] = useState(() =>
        getArticlesByCategory("economy")
    );

    return (
        <main className="economy-page">

            {/* =========================
                HERO
            ========================= */}
            <section className="economy-hero">

                <div className="economy-container">

                    <div className="economy-hero-content">

                        <div className="economy-section-label">
                            ЭКОНОМИКА
                        </div>

                        <h1>
                            Экономика
                        </h1>

                        <p>
                            Последние новости экономики,
                            бизнеса, финансов и инвестиций.
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================
                NEWS
            ========================= */}
            <section className="economy-news-section">

                <div className="economy-container">

                    <div className="economy-section-header">

                        <h2>
                            Последние новости
                        </h2>

                        <span>
                            {economyNews.length} публикаций
                        </span>

                    </div>


                    {/* Если статей нет */}
                    {economyNews.length === 0 ? (

                        <div className="economy-empty">

                            <h3>
                                Пока нет новостей
                            </h3>

                            <p>
                                Новости в разделе «Экономика»
                                появятся здесь.
                            </p>

                        </div>

                    ) : (

                        <div className="economy-news-grid">

                            {economyNews.map((news) => {

                                const image =
                                    news.mediaUrl ||
                                    news.photo ||
                                    news.image ||
                                    news.imageUrl;

                                return (
                                    <Link
                                        key={news.id}
                                        to={`/article/${news.id}`}
                                        className="economy-news-card"
                                    >

                                        {/* Фото */}
                                        {image && (
                                            <div className="economy-news-image-wrapper">

                                                <img
                                                    src={image}
                                                    alt={news.title}
                                                    className="economy-news-image"
                                                />

                                            </div>
                                        )}


                                        {/* Контент */}
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


            {/* =========================
                BOTTOM
            ========================= */}
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