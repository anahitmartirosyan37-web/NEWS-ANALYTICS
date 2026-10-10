import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Society.css";

const API_URL = "http://localhost:5000";

export const SocietyPage = () => {

    // =========================================================
    // НОВОСТИ ИЗ СЕРВЕРА / MONGODB
    // =========================================================

    const [societyNews, setSocietyNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================================
    // ПОЛУЧАЕМ СТАТЬИ С СЕРВЕРА
    // =========================================================

    useEffect(() => {

        const fetchArticles = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/api/articles`);

                if (!response.ok) {
                    throw new Error("Не удалось получить статьи");
                }

                const data = await response.json();

                // Сервер может вернуть:
                // 1. массив статей
                // 2. { articles: [...] }

                const articles = Array.isArray(data)
                    ? data
                    : data.articles || [];


                // Берём только статьи категории society

                const filteredArticles = articles.filter(
                    (article) =>
                        article.category?.toLowerCase() === "society"
                );


                setSocietyNews(filteredArticles);

            } catch (error) {

                console.error(
                    "Ошибка загрузки статей:",
                    error
                );

                setError(
                    "Не удалось загрузить новости. Попробуйте обновить страницу."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchArticles();

    }, []);


    // =========================================================
    // ГЛАВНАЯ НОВОСТЬ
    // =========================================================

    const heroArticle = societyNews[0];


    // =========================================================
    // СТАТЬИ
    // =========================================================

    const feedNews = societyNews;


    // =========================================================
    // ЗАГРУЗКА
    // =========================================================

    if (loading) {

        return (

            <div className="home-container">

                <div className="section-header-banner">

                    <span className="section-category-tag">
                        РАЗДЕЛ
                    </span>

                    <h1 className="section-main-title">
                        Общество
                    </h1>

                    <p className="section-main-desc">
                        Социальная политика, инфраструктура,
                        гражданские инициативы и повседневная
                        жизнь регионов.
                    </p>

                </div>


                <div
                    style={{
                        padding: "50px 20px",
                        textAlign: "center",
                        color: "#666"
                    }}
                >
                    Загрузка новостей...
                </div>

            </div>

        );

    }


    // =========================================================
    // ОШИБКА
    // =========================================================

    if (error) {

        return (

            <div className="home-container">

                <div className="section-header-banner">

                    <span className="section-category-tag">
                        РАЗДЕЛ
                    </span>

                    <h1 className="section-main-title">
                        Общество
                    </h1>

                    <p className="section-main-desc">
                        Социальная политика, инфраструктура,
                        гражданские инициативы и повседневная
                        жизнь регионов.
                    </p>

                </div>


                <div
                    style={{
                        padding: "40px 20px",
                        border: "1px solid #ddd",
                        background: "#fafafa",
                        textAlign: "center"
                    }}
                >

                    <h3
                        style={{
                            margin: "0 0 10px",
                            fontSize: "20px"
                        }}
                    >
                        Не удалось загрузить новости
                    </h3>


                    <p
                        style={{
                            margin: 0,
                            color: "#666",
                            fontSize: "14px"
                        }}
                    >
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="home-container">


            {/* =================================================
                ШАПКА РАЗДЕЛА
            ================================================= */}

            <div className="section-header-banner">

                <span className="section-category-tag">
                    РАЗДЕЛ
                </span>


                <h1 className="section-main-title">
                    Общество
                </h1>


                <p className="section-main-desc">
                    Социальная политика, инфраструктура,
                    гражданские инициативы и повседневная
                    жизнь регионов.
                </p>

            </div>


            {/* =================================================
                ГЛАВНЫЙ БАННЕР
            ================================================= */}

            {heroArticle && (

                <div className="bbc-hero-banner">

                    <div className="bbc-hero-content">

                        <span className="bbc-live-badge">
                            ГЛАВНАЯ ТЕМА ДНЯ
                        </span>


                        <h2 className="bbc-hero-title">
                            {heroArticle.title}
                        </h2>


                        <p className="bbc-hero-desc">
                            {heroArticle.content}
                        </p>


                        <Link
                            to={`/article/${heroArticle.id}`}
                            style={{
                                display: "inline-block",
                                marginTop: "18px",
                                color: "#ffffff",
                                fontSize: "13px",
                                fontWeight: "700",
                                textDecoration: "none",
                                textTransform: "uppercase"
                            }}
                        >
                            Читать материал →
                        </Link>

                    </div>


                    {/* =================================================
                        ФОТО / ВИДЕО ГЛАВНОЙ НОВОСТИ
                    ================================================= */}

                    <div
                        className="bbc-hero-media"
                        style={{
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >

                        {heroArticle.mediaUrl ? (

                            heroArticle.mediaType === "video" ? (

                                <video
                                    src={heroArticle.mediaUrl}
                                    controls
                                    preload="metadata"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        minHeight: "220px",
                                        objectFit: "cover",
                                        display: "block",
                                        background: "#000"
                                    }}
                                />

                            ) : (

                                <img
                                    src={heroArticle.mediaUrl}
                                    alt={heroArticle.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        minHeight: "220px",
                                        objectFit: "cover",
                                        display: "block"
                                    }}
                                />

                            )

                        ) : (

                            <div
                                style={{
                                    width: "100%",
                                    minHeight: "220px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "#222",
                                    color: "#777",
                                    fontSize: "12px",
                                    fontWeight: "700"
                                }}
                            >
                                НЕТ ФОТО
                            </div>

                        )}


                        {heroArticle.mediaUrl && (

                            <span
                                className="media-tag-label"
                                style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    left: "10px",
                                    background: "rgba(0,0,0,0.8)",
                                    color: "#fff",
                                    padding: "6px 10px",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    zIndex: 5,
                                    pointerEvents: "none"
                                }}
                            >

                                {heroArticle.mediaType === "video"
                                    ? "▶ ВИДЕО"
                                    : "ФОТО"}

                            </span>

                        )}

                    </div>

                </div>

            )}


            {/* =================================================
                ЛЕНТА НОВОСТЕЙ
            ================================================= */}

            <div className="bbc-feed-section">

                <div className="feed-header-line">

                    <h2 className="section-title">
                        Лента новостей: Общество
                    </h2>


                    <span className="live-indicator">
                        ● ОБНОВЛЯЕТСЯ
                    </span>

                </div>


                {/* =================================================
                    ЕСЛИ НЕТ НОВОСТЕЙ
                ================================================= */}

                {feedNews.length === 0 ? (

                    <div
                        style={{
                            padding: "40px 20px",
                            border: "1px solid #ddd",
                            background: "#fafafa",
                            textAlign: "center"
                        }}
                    >

                        <h3
                            style={{
                                margin: "0 0 10px",
                                fontSize: "20px"
                            }}
                        >
                            Новостей пока нет
                        </h3>


                        <p
                            style={{
                                margin: 0,
                                color: "#666",
                                fontSize: "14px"
                            }}
                        >
                            В разделе «Общество» пока нет
                            опубликованных материалов.
                        </p>

                    </div>

                ) : (

                    <div className="bbc-media-feed-list">

                        {feedNews.map((news) => (

                            <div
                                key={news._id || news.id}
                                className="bbc-media-feed-card-wrapper"
                            >

                                {/* =================================================
                                    КАРТОЧКА НОВОСТИ
                                ================================================= */}

                                <Link
                                    to={`/article/${news.id}`}
                                    className="bbc-media-feed-item"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit"
                                    }}
                                >

                                    {/* =================================================
                                        ФОТО / ВИДЕО
                                    ================================================= */}

                                    <div
                                        className="feed-thumbnail-mock"
                                        style={{
                                            position: "relative",
                                            overflow: "hidden",
                                            background: "#111",
                                            minHeight: "180px"
                                        }}
                                    >

                                        {news.mediaUrl ? (

                                            news.mediaType === "video" ? (

                                                <video
                                                    src={news.mediaUrl}
                                                    className="uploaded-thumbnail-media"
                                                    preload="metadata"
                                                    controls
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        minHeight: "180px",
                                                        objectFit: "cover",
                                                        display: "block",
                                                        background: "#000"
                                                    }}
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                />

                                            ) : (

                                                <img
                                                    src={news.mediaUrl}
                                                    alt={news.title}
                                                    className="uploaded-thumbnail-media"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        minHeight: "180px",
                                                        objectFit: "cover",
                                                        display: "block"
                                                    }}
                                                />

                                            )

                                        ) : (

                                            <div
                                                style={{
                                                    width: "100%",
                                                    minHeight: "180px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    background: "#eeeeee",
                                                    color: "#777",
                                                    fontSize: "12px",
                                                    fontWeight: "700"
                                                }}
                                            >
                                                НЕТ ФОТО
                                            </div>

                                        )}


                                        {/* =================================================
                                            МЕТКА МЕДИА
                                        ================================================= */}

                                        {news.mediaUrl && (

                                            <span
                                                style={{
                                                    position: "absolute",
                                                    left: "10px",
                                                    bottom: "10px",
                                                    background:
                                                        "rgba(0,0,0,0.85)",
                                                    color: "#fff",
                                                    padding: "5px 9px",
                                                    fontSize: "10px",
                                                    fontWeight: "700",
                                                    zIndex: 5,
                                                    pointerEvents: "none"
                                                }}
                                            >

                                                {news.mediaType === "video"
                                                    ? "▶ ВИДЕО"
                                                    : "📷 ФОТО"}

                                            </span>

                                        )}

                                    </div>


                                    {/* =================================================
                                        ТЕКСТ
                                    ================================================= */}

                                    <div className="feed-item-content">

                                        <div className="feed-meta-row">

                                            {news.time && (
                                                <span className="feed-time">
                                                    {news.time}
                                                </span>
                                            )}


                                            <span className="feed-cat">
                                                Общество
                                            </span>


                                            {news.mediaType === "video" &&
                                                news.mediaUrl && (

                                                    <span
                                                        style={{
                                                            fontSize: "11px",
                                                            fontWeight: "700",
                                                            color: "#b81d24"
                                                        }}
                                                    >
                                                        ▶ ВИДЕО
                                                    </span>

                                                )}

                                        </div>


                                        <h3 className="feed-news-title">
                                            {news.title}
                                        </h3>


                                        {news.content && (

                                            <p className="feed-news-snippet">
                                                {news.content}
                                            </p>

                                        )}


                                        <span
                                            className="read-more"
                                            style={{
                                                display: "inline-block",
                                                marginTop: "14px",
                                                color: "#b81d24",
                                                fontSize: "13px",
                                                fontWeight: "700",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            Читать дальше →
                                        </span>

                                    </div>

                                </Link>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
};