import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./world.css";

const API_URL = "https://news-analytics-5or6.vercel.app";

export const WorldPage = () => {

    // =========================================================
    // НОВОСТИ ИЗ СЕРВЕРА / MONGODB
    // =========================================================

    const [worldNews, setWorldNews] = useState([]);
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

                const response = await fetch(
                    `${API_URL}/api/articles`
                );

                if (!response.ok) {
                    throw new Error("Не удалось получить статьи");
                }

                const data = await response.json();

                // Сервер может вернуть:
                // массив:
                // [...]
                //
                // или:
                // { articles: [...] }

                const articles = Array.isArray(data)
                    ? data
                    : data.articles || [];


                // =================================================
                // БЕРЁМ ТОЛЬКО WORLD
                // =================================================

                const filteredArticles = articles.filter(
                    (article) =>
                        article.category?.toLowerCase() === "world"
                );


                setWorldNews(filteredArticles);

            } catch (error) {

                console.error(
                    "Ошибка загрузки новостей:",
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

    const heroArticle = worldNews[0];


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
                        В мире
                    </h1>

                    <p className="section-main-desc">
                        Международный контекст: политика,
                        экономика и события, влияющие на регион.
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
                        В мире
                    </h1>

                    <p className="section-main-desc">
                        Международный контекст: политика,
                        экономика и события, влияющие на регион.
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
                ШАПКА
            ================================================= */}

            <div className="section-header-banner">

                <span className="section-category-tag">
                    РАЗДЕЛ
                </span>


                <h1 className="section-main-title">
                    В мире
                </h1>


                <p className="section-main-desc">
                    Международный контекст: политика,
                    экономика и события, влияющие на регион.
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


                        {heroArticle.content && (

                            <p className="bbc-hero-desc">
                                {heroArticle.content}
                            </p>

                        )}


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
                        ФОТО / ВИДЕО
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
                                НЕТ МЕДИА
                            </div>

                        )}


                        {/* =================================================
                            МЕТКА MEDIA
                        ================================================= */}

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
                                    : "МЕЖДУНАРОДНЫЙ ОБЗОР"}

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
                        Лента новостей: В мире
                    </h2>


                    <span className="live-indicator">
                        ● ОБНОВЛЯЕТСЯ В РЕАЛЬНОМ ВРЕМЕНИ
                    </span>

                </div>


                {/* =================================================
                    НЕТ НОВОСТЕЙ
                ================================================= */}

                {worldNews.length === 0 ? (

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
                            В разделе «В мире» пока нет
                            опубликованных материалов.
                        </p>

                    </div>

                ) : (

                    <div className="bbc-media-feed-list">

                        {worldNews.map((news) => (

                            <div
                                key={news._id || news.id}
                                className="bbc-media-feed-card-wrapper"
                            >

                                <Link
                                    to={`/article/${news.id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        display: "block"
                                    }}
                                >

                                    <div
                                        className="bbc-media-feed-item"
                                        style={{
                                            cursor: "pointer"
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
                                                        controls
                                                        preload="metadata"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            minHeight: "180px",
                                                            objectFit: "cover",
                                                            display: "block",
                                                            background: "#000"
                                                        }}
                                                        onClick={(e) =>
                                                            e.preventDefault()
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
                                                    НЕТ МЕДИА
                                                </div>

                                            )}


                                            {/* =================================================
                                                МЕТКА ФОТО / ВИДЕО
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
                                            ТЕКСТ НОВОСТИ
                                        ================================================= */}

                                        <div className="feed-item-content">

                                            <div className="feed-meta-row">

                                                {news.time && (

                                                    <span className="feed-time">
                                                        {news.time}
                                                    </span>

                                                )}


                                                <span className="feed-cat">
                                                    {news.category || "В мире"}
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
                                                style={{
                                                    display: "inline-block",
                                                    marginTop: "10px",
                                                    fontSize: "11px",
                                                    fontWeight: "700",
                                                    color: "#b81d24"
                                                }}
                                            >
                                                ЧИТАТЬ ПОЛНОСТЬЮ →
                                            </span>

                                        </div>

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