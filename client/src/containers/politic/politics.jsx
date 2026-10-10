import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./politics.css";

export const PoliticsPage = () => {
    const [politicsNews, setPoliticsNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadArticles = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "https://news-analytics-5or6.vercel.app/api/articles"
                );

                if (!response.ok) {
                    throw new Error(
                        "Не удалось получить статьи с сервера"
                    );
                }

                const data = await response.json();

                const politics = data.filter(
                    (article) => article.category === "politics"
                );

                setPoliticsNews(politics);
            } catch (error) {
                console.error(
                    "Ошибка загрузки статей:",
                    error
                );

                setError(
                    "Не удалось загрузить новости. Проверьте, запущен ли сервер."
                );
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    // =========================================================
    // ЗАГРУЗКА
    // =========================================================

    if (loading) {
        return (
            <div className="home-container">
                <div
                    style={{
                        padding: "60px 20px",
                        textAlign: "center",
                    }}
                >
                    <h2
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        Загрузка новостей...
                    </h2>

                    <p
                        style={{
                            color: "#666",
                        }}
                    >
                        Получаем статьи из базы данных.
                    </p>
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
                <div
                    style={{
                        padding: "60px 20px",
                        textAlign: "center",
                    }}
                >
                    <h2
                        style={{
                            marginBottom: "10px",
                            color: "#b81d24",
                        }}
                    >
                        Ошибка
                    </h2>

                    <p
                        style={{
                            color: "#666",
                        }}
                    >
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    // =========================================================
    // ГЛАВНАЯ СТАТЬЯ
    // =========================================================

    const heroArticle = politicsNews[0];

    const mainStory =
        politicsNews.find(
            (news) => String(news.id) === "politics-1"
        ) || heroArticle;

    return (
        <div className="home-container">

            {/* =================================================
                ШАПКА
            ================================================= */}

            <div className="section-header-banner">

                <span className="section-category-tag">
                    АРМЕНИЯ
                </span>

                <h1 className="section-main-title">
                    Политика
                </h1>

                <p className="section-main-desc">
                    Политическая жизнь Армении, деятельность
                    правительства и Национального собрания,
                    дипломатия и международные отношения.
                </p>

            </div>


            {/* =================================================
                ГЛАВНЫЙ БАННЕР
            ================================================= */}

            {heroArticle && (
                <div className="bbc-hero-banner politics-hero">

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
                                textTransform: "uppercase",
                            }}
                        >
                            Читать материал →
                        </Link>

                    </div>


                    <div
                        className="bbc-hero-media"
                        style={{
                            position: "relative",
                            overflow: "hidden",
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
                                        background: "#000",
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
                                        display: "block",
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
                                    fontWeight: "700",
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
                                    background:
                                        "rgba(0,0,0,0.8)",
                                    color: "#fff",
                                    padding: "6px 10px",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    zIndex: 5,
                                    pointerEvents: "none",
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
                ГЛАВНЫЙ МАТЕРИАЛ
            ================================================= */}

            {mainStory && (
                <section
                    style={{
                        marginTop: "35px",
                        marginBottom: "40px",
                    }}
                >

                    <Link
                        to={`/article/${mainStory.id}`}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "minmax(0, 1.3fr) minmax(300px, 1fr)",
                                gap: "25px",
                                borderBottom:
                                    "1px solid #222",
                                paddingBottom: "25px",
                                cursor: "pointer",
                            }}
                        >

                            <div>

                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#b81d24",
                                        fontWeight: "700",
                                    }}
                                >
                                    ПОЛИТИКА АРМЕНИИ
                                </span>


                                <h2
                                    style={{
                                        fontSize: "28px",
                                        lineHeight: "1.15",
                                        margin: "10px 0 15px",
                                    }}
                                >
                                    {mainStory.title}
                                </h2>


                                {mainStory.content && (
                                    <p
                                        style={{
                                            fontSize: "15px",
                                            lineHeight: "1.6",
                                            color: "#444",
                                        }}
                                    >
                                        {mainStory.content}
                                    </p>
                                )}


                                <span
                                    style={{
                                        display: "inline-block",
                                        marginTop: "12px",
                                        color: "#b81d24",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                    }}
                                >
                                    ЧИТАТЬ ПОЛНОСТЬЮ →
                                </span>

                            </div>


                            <div
                                style={{
                                    height: "250px",
                                    overflow: "hidden",
                                    position: "relative",
                                    background: "#111",
                                }}
                            >

                                {mainStory.mediaUrl ? (

                                    mainStory.mediaType === "video" ? (

                                        <video
                                            src={
                                                mainStory.mediaUrl
                                            }
                                            controls
                                            preload="metadata"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                                background: "#000",
                                            }}
                                            onClick={(e) =>
                                                e.preventDefault()
                                            }
                                        />

                                    ) : (

                                        <img
                                            src={
                                                mainStory.mediaUrl
                                            }
                                            alt={
                                                mainStory.title
                                            }
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />

                                    )

                                ) : (

                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent:
                                                "center",
                                            background: "#eee",
                                            color: "#777",
                                            fontSize: "12px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        НЕТ ФОТО
                                    </div>

                                )}

                            </div>

                        </div>

                    </Link>

                </section>
            )}


            {/* =================================================
                ЛЕНТА НОВОСТЕЙ
            ================================================= */}

            <div className="bbc-feed-section">

                <div className="feed-header-line">

                    <h2 className="section-title">
                        Последние новости
                    </h2>

                    <span className="live-indicator">
                        ● В РЕАЛЬНОМ ВРЕМЕНИ
                    </span>

                </div>


                {politicsNews.length === 0 ? (

                    <div
                        style={{
                            padding: "40px 20px",
                            border: "1px solid #ddd",
                            background: "#fafafa",
                            textAlign: "center",
                        }}
                    >

                        <h3
                            style={{
                                margin: "0 0 10px",
                                fontSize: "20px",
                            }}
                        >
                            Новостей пока нет
                        </h3>

                        <p
                            style={{
                                margin: 0,
                                color: "#666",
                                fontSize: "14px",
                            }}
                        >
                            В разделе «Политика» пока нет
                            опубликованных материалов.
                        </p>

                    </div>

                ) : (

                    <div className="bbc-media-feed-list">

                        {politicsNews.map((news) => (

                            <div
                                key={news.id}
                                className="bbc-media-feed-card-wrapper"
                            >

                                <Link
                                    to={`/article/${news.id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        display: "block",
                                    }}
                                >

                                    <div
                                        className="bbc-media-feed-item"
                                        style={{
                                            cursor: "pointer",
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
                                                minHeight: "180px",
                                            }}
                                        >

                                            {news.mediaUrl ? (

                                                news.mediaType === "video" ? (

                                                    <video
                                                        src={
                                                            news.mediaUrl
                                                        }
                                                        className="uploaded-thumbnail-media"
                                                        controls
                                                        preload="metadata"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            minHeight:
                                                                "180px",
                                                            objectFit:
                                                                "cover",
                                                            display:
                                                                "block",
                                                            background:
                                                                "#000",
                                                        }}
                                                        onClick={(e) =>
                                                            e.preventDefault()
                                                        }
                                                    />

                                                ) : (

                                                    <img
                                                        src={
                                                            news.mediaUrl
                                                        }
                                                        alt={
                                                            news.title
                                                        }
                                                        className="uploaded-thumbnail-media"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            minHeight:
                                                                "180px",
                                                            objectFit:
                                                                "cover",
                                                            display:
                                                                "block",
                                                        }}
                                                    />

                                                )

                                            ) : (

                                                <div
                                                    style={{
                                                        width: "100%",
                                                        minHeight:
                                                            "180px",
                                                        display: "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        background:
                                                            "#eeeeee",
                                                        color: "#777",
                                                        fontSize:
                                                            "12px",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    НЕТ ФОТО
                                                </div>

                                            )}


                                            {news.mediaUrl && (

                                                <span
                                                    style={{
                                                        position:
                                                            "absolute",
                                                        left: "10px",
                                                        bottom: "10px",
                                                        background:
                                                            "rgba(0,0,0,0.85)",
                                                        color: "#fff",
                                                        padding:
                                                            "5px 9px",
                                                        fontSize:
                                                            "10px",
                                                        fontWeight:
                                                            "700",
                                                        zIndex: 2,
                                                        pointerEvents:
                                                            "none",
                                                    }}
                                                >
                                                    {news.mediaType ===
                                                    "video"
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
                                                    {news.category ||
                                                        "Политика"}
                                                </span>

                                                {news.mediaType ===
                                                    "video" &&
                                                    news.mediaUrl && (

                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "11px",
                                                                fontWeight:
                                                                    "700",
                                                                color:
                                                                    "#b81d24",
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
                                                    display:
                                                        "inline-block",
                                                    marginTop: "10px",
                                                    fontSize:
                                                        "11px",
                                                    fontWeight:
                                                        "700",
                                                    color:
                                                        "#b81d24",
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