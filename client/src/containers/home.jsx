import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NewsCard } from "../components/NewsCard";
import "./home.css";

export const HomePage = () => {
    // =========================================================
    // ИЗОБРАЖЕНИЯ
    // Меняй ссылки здесь — картинки автоматически поменяются
    // =========================================================

    const siteImages = {
        hero: {
            image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
            alt: "Политические переговоры"
        },

        politics: {
            image: "https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=900&q=80",
            alt: "Политика Армении"
        },

        society: {
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
            alt: "Общество Армении"
        },

        economy: {
            image: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=900&q=80",
            alt: "Экономика Армении"
        },

        world: {
            image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80",
            alt: "Международные отношения"
        },

        parliament: {
            image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=700&q=80",
            alt: "Национальное собрание Армении"
        },

        podcastPolitics: {
            image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80",
            alt: "Политический видеоподкаст"
        },

        podcastEconomy: {
            image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=900&q=80",
            alt: "Экономический видеоподкаст"
        }
    };

    // =========================================================
    // БЕГУЩАЯ СТРОКА
    // =========================================================

    const tickerNews = [
        "🔴 Срочно: Никол Пашинян провёл рабочее совещание по вопросам внутренней и внешней политики.",
        "⚡ Парламент Армении: депутаты обсудили новый пакет законодательных инициатив.",
        "📊 Экономика: правительство представило новые данные о развитии экономики и инвестициях.",
        "🌐 Международные отношения: Армения продолжает дипломатические переговоры с международными партнёрами."
    ];

    const [currentTickerIndex, setCurrentTickerIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTickerIndex(
                (prevIndex) => (prevIndex + 1) % tickerNews.length
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [tickerNews.length]);

    // =========================================================
    // КЛЮЧЕВЫЕ РАЗДЕЛЫ
    // =========================================================

    const categoriesData = [
        {
            category: "Политика",
            title: "Пашинян: правительство обсудило дальнейшие шаги во внешней политике",
            description:
                "В центре внимания правительства Армении — региональная безопасность, дипломатические переговоры и дальнейшее развитие международных отношений.",
            date: "8 сентября 2026",
            to: "/politics",
            image: siteImages.politics.image
        },
        {
            category: "Общество",
            title: "Общество Армении: новые социальные инициативы и развитие регионов",
            description:
                "Власти представили новые проекты, направленные на развитие социальной инфраструктуры и поддержку регионов страны.",
            date: "8 сентября 2026",
            to: "/society",
            image: siteImages.society.image
        },
        {
            category: "Экономика",
            title: "Экономика Армении: инвестиции, бизнес и перспективы роста",
            description:
                "Эксперты анализируют инвестиционный климат, развитие малого и среднего бизнеса и основные экономические показатели.",
            date: "7 сентября 2026",
            to: "/economy",
            image: siteImages.economy.image
        },
        {
            category: "В мире",
            title: "Армения и мир: дипломатия и новые международные контакты",
            description:
                "Последние международные события и их значение для Армении, Южного Кавказа и внешней политики страны.",
            date: "7 сентября 2026",
            to: "/world",
            image: siteImages.world.image
        }
    ];

    // =========================================================
    // ЛЕНТА НОВОСТЕЙ
    // =========================================================

    const [latestNewsFeed, setLatestNewsFeed] = useState(() => {
        const saved = localStorage.getItem("armenia_live_news_v2");

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Ошибка загрузки новостей:", e);
            }
        }

        return [
            {
                id: 1,
                time: "15:40",
                category: "Политика",
                title:
                    "Никол Пашинян провёл рабочее совещание по вопросам государственной политики",
                content:
                    "Премьер-министр Армении Никол Пашинян обсудил актуальные вопросы внутренней политики, экономики и международных отношений.",
                to: "/politics",
                mediaType: "photo",
                mediaUrl: siteImages.parliament.image
            },
            {
                id: 2,
                time: "14:55",
                category: "Политика",
                title:
                    "Парламент Армении обсудил новые законодательные инициативы",
                content:
                    "Депутаты Национального собрания обсудили ряд законодательных инициатив и дальнейшую работу парламента.",
                to: "/politics",
                mediaType: "photo",
                mediaUrl: siteImages.politics.image
            },
            {
                id: 3,
                time: "13:30",
                category: "Экономика",
                title:
                    "Правительство Армении представило новые экономические показатели",
                content:
                    "В центре внимания — инвестиции, развитие предпринимательства и экономическая активность.",
                to: "/economy",
                mediaType: "photo",
                mediaUrl: siteImages.economy.image
            }
        ];
    });

    // =========================================================
    // РЕДАКТОР
    // =========================================================

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newCategory, setNewCategory] = useState("Политика");
    const [newMediaType, setNewMediaType] = useState("photo");
    const [mediaFileUrl, setMediaFileUrl] = useState("");

    // =========================================================
    // СОХРАНЕНИЕ НОВОСТЕЙ
    // =========================================================

    useEffect(() => {
        localStorage.setItem(
            "armenia_live_news_v2",
            JSON.stringify(latestNewsFeed)
        );
    }, [latestNewsFeed]);

    // =========================================================
    // ЗАГРУЗКА ФОТО / ВИДЕО
    // =========================================================

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const fileUrl = URL.createObjectURL(file);

        setMediaFileUrl(fileUrl);

        if (file.type.startsWith("video")) {
            setNewMediaType("video");
        } else {
            setNewMediaType("photo");
        }
    };

    // =========================================================
    // ДОБАВЛЕНИЕ НОВОСТИ
    // =========================================================

    const handleAddNews = (e) => {
        e.preventDefault();

        if (!newTitle.trim()) return;

        let targetPath = "/politics";

        if (newCategory === "Общество") {
            targetPath = "/society";
        }

        if (newCategory === "Экономика") {
            targetPath = "/economy";
        }

        if (newCategory === "В мире") {
            targetPath = "/world";
        }

        const now = new Date();

        const timeString = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

        const newItem = {
            id: Date.now(),
            time: timeString,
            category: newCategory,
            title: newTitle.trim(),
            content:
                newContent.trim() || "Подробности события уточняются.",
            to: targetPath,
            mediaType: newMediaType,
            mediaUrl: mediaFileUrl
        };

        setLatestNewsFeed((prev) => [newItem, ...prev]);

        setNewTitle("");
        setNewContent("");
        setMediaFileUrl("");
        setNewMediaType("photo");
        setIsFormOpen(false);
    };



    // =========================================================
    // ВИДЕОПОДКАСТЫ
    // =========================================================
const videoPodcasts = [
    {
        id: 1,
        title:
            "Никол Пашинян и Владимир Путин обсудили отношения Армении и России",
        duration: "22:10",
        date: "1 сентября",
        to: "/politics",

        imageUrl:
            "https://golosarmenii.am/wp-content/uploads/2026/06/2-19.webp",

        videoUrl:
            "https://www.youtube.com/embed/VIDEO_ID"
    },

    {
        id: 2,
        title:
            "Никол Пашинян и Эммануэль Макрон обсудили отношения Армении и Франции",
        duration: "16:45",
        date: "9 сентября",
        to: "/politics",

        imageUrl:
            "https://newsarmenia.am/upload/iblock/cf3/99fi22lkfjy2xkjrn8vh1tt13gc7vqdi.jpgи",

        videoUrl:
            "https://www.youtube.com/embed/VIDEO_ID"
    }
];

    return (
        <div className="home-container">

            {/* =================================================
                БЕГУЩАЯ СТРОКА
            ================================================= */}

            <div
                className="breaking-news-ticker"
                style={{
                    backgroundColor: "#b81d24",
                    color: "#ffffff",
                    padding: "10px 15px",
                    borderRadius: "4px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                    fontWeight: "700"
                }}
            >
                <span
                    style={{
                        background: "#000",
                        padding: "2px 6px",
                        fontSize: "11px",
                        letterSpacing: "1px",
                        flexShrink: 0
                    }}
                >
                    МОЛНИЯ
                </span>

                <div
                    style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    }}
                >
                    {tickerNews[currentTickerIndex]}
                </div>
            </div>

            {/* =================================================
                ГЛАВНЫЙ БАННЕР
            ================================================= */}

            <div
                className="bbc-hero-banner"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    gap: "20px",
                    marginBottom: "40px",
                    borderBottom: "2px solid #121212",
                    paddingBottom: "20px"
                }}
            >

                <div className="bbc-hero-content">

                    <span
                        className="bbc-live-badge"
                        style={{
                            background: "#b81d24",
                            color: "#fff",
                            padding: "3px 7px",
                            fontSize: "11px",
                            fontWeight: "bold"
                        }}
                    >
                        ● LIVE
                    </span>

                    <h1
                        className="bbc-hero-title"
                        style={{
                            fontSize: "30px",
                            fontWeight: "800",
                            margin: "10px 0"
                        }}
                    >
                        Политика Армении: главные события и заявления дня
                    </h1>

                    <p
                        className="bbc-hero-desc"
                        style={{
                            fontSize: "15px",
                            color: "#333",
                            lineHeight: "1.5"
                        }}
                    >
                        Последние заявления Николая Пашиняна,
                        работа Национального собрания и главные
                        события политической жизни Армении.
                    </p>

                    <Link
                        to="/politics"
                        style={{
                            display: "inline-block",
                            marginTop: "15px",
                            color: "#b81d24",
                            fontWeight: "700",
                            textDecoration: "none"
                        }}
                    >
                        Читать последние новости →
                    </Link>

                </div>

                {/* =================================================
                    КАРТИНКА ГЛАВНОГО БАННЕРА
                ================================================= */}

                <div
                    className="bbc-hero-media"
                    style={{
                        position: "relative",
                        height: "280px",
                        background: "#333",
                        overflow: "hidden",
                        borderRadius: "4px"
                    }}
                >
                    <img
                        src={siteImages.hero.image}
                        alt={siteImages.hero.alt}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block"
                        }}
                    />

                    <span
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "10px",
                            color: "#fff",
                            fontSize: "11px",
                            background: "rgba(0,0,0,0.75)",
                            padding: "5px 12px"
                        }}
                    >
                        ФОТОРЕПОРТАЖ
                    </span>
                </div>

            </div>

            {/* =================================================
                ВИДЕОПОДКАСТЫ
            ================================================= */}

            <section
                className="bbc-media-hub"
                style={{
                    margin: "30px 0"
                }}
            >

                <h2 className="section-title">
                    📺 ВИДЕОПОДКАСТЫ
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px",
                        marginTop: "15px"
                    }}
                >

                    {videoPodcasts.map((pod) => (

                        <div
                            key={pod.id}
                            style={{
                                background: "#fdfdfd",
                                border: "1px solid #e0e0e0",
                                borderRadius: "6px",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >

                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "190px",
                                    background: "#000"
                                }}
                            >

                                <video
                                    controls
                                    poster={pod.videoCover}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                >
                                    <source
                                        src={pod.videoUrl}
                                        type="video/mp4"
                                    />
                                </video>

                                <span
                                    style={{
                                        position: "absolute",
                                        top: "8px",
                                        right: "8px",
                                        background:
                                            "rgba(0,0,0,0.7)",
                                        color: "#fff",
                                        padding: "3px 6px",
                                        fontSize: "11px"
                                    }}
                                >
                                    {pod.duration}
                                </span>

                            </div>

                            <div
                                style={{
                                    padding: "15px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    flexGrow: 1
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color: "#666",
                                            marginBottom: "5px"
                                        }}
                                    >
                                        {pod.date}
                                    </div>

                                    <h4
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: "700",
                                            marginBottom: "12px",
                                            lineHeight: "1.3"
                                        }}
                                    >
                                        {pod.title}
                                    </h4>

                                </div>

                                <Link
                                    to={pod.to}
                                    style={{
                                        fontSize: "13px",
                                        color: "#b81d24",
                                        fontWeight: "bold",
                                        textDecoration: "none"
                                    }}
                                >
                                    Читать статью к подкасту →
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* =================================================
                КЛЮЧЕВЫЕ РАЗДЕЛЫ
            ================================================= */}

            <h2 className="section-title">
                Ключевые разделы
            </h2>

            <div className="news-grid">

                {categoriesData.map((item, index) => (

                    <div
                        key={index}
                        className="news-card-with-image"
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >

                        <div
                            style={{
                                width: "100%",
                                height: "180px",
                                overflow: "hidden",
                                marginBottom: "12px"
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.category}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block"
                                }}
                            />
                        </div>

                        <NewsCard
                            title={item.title}
                            category={item.category}
                            description={item.description}
                            date={item.date}
                            to={item.to}
                        />

                    </div>

                ))}

            </div>

            {/* =================================================
                ГЛАВНЫЕ НОВОСТИ ЧАСА
            ================================================= */}

            <div className="bbc-feed-section">

                <div className="feed-header-line">

                    <h2 className="section-title">
                        Главные новости часа
                    </h2>

                    <span className="live-indicator">
                        ● В РЕАЛЬНОМ ВРЕМЕНИ
                    </span>

                </div>

                <div className="bbc-media-feed-list">

                    {latestNewsFeed.map((news) => (

                        <div
                            key={news.id}
                            className="bbc-media-feed-card-wrapper"
                        >

                            <Link
                                to={news.to}
                                className="bbc-media-feed-item"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit"
                                }}
                            >

                                <div className="feed-thumbnail-mock">

                                    {news.mediaUrl ? (

                                        news.mediaType === "video" ? (

                                            <video
                                                src={news.mediaUrl}
                                                className="uploaded-thumbnail-media"
                                            />

                                        ) : (

                                            <img
                                                src={news.mediaUrl}
                                                alt={news.title}
                                                className="uploaded-thumbnail-media"
                                            />

                                        )

                                    ) : (

                                        <span
                                            className={`mini-badge ${
                                                news.mediaType === "video"
                                                    ? "video"
                                                    : "photo"
                                            }`}
                                        >
                                            {news.mediaType === "video"
                                                ? "▶ ВИДЕО"
                                                : "📷 ФОТО"}
                                        </span>

                                    )}

                                </div>

                                <div className="feed-item-content">

                                    <div className="feed-meta-row">

                                        <span className="feed-time">
                                            {news.time}
                                        </span>

                                        <span className="feed-cat">
                                            {news.category}
                                        </span>

                                    </div>

                                    <h3
                                        className="feed-news-title"
                                        style={{
                                            transition: "color 0.2s"
                                        }}
                                    >
                                        {news.title}
                                    </h3>

                                    <p className="feed-news-snippet">
                                        {news.content}
                                    </p>

                                </div>

                            </Link>

                            <button
                                className="delete-news-btn"
                                onClick={(e) =>
                                    handleDeleteNews(news.id, e)
                                }
                            >
                                ✕ Удалить
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};