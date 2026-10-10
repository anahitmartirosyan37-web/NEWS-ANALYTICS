import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css"; // Используем те же стили, что и для главной

export const CategoryPage = ({ categoryName, categoryDescription }) => {
    // Ключ для хранения новостей этого конкретного раздела в localStorage
    const storageKey = `bbc_news_${categoryName.toLowerCase()}_v1`;

    const [newsList, setNewsList] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { /* ignore */ }
        }
        // Дефолтные новости для примера
        return [
            {
                id: 1,
                time: "14:15",
                title: `Главные события и аналитика в разделе «${categoryName}»`,
                content: "Здесь публикуются ключевые материалы, экспертные мнения и оперативные сводки.",
                mediaType: "photo",
                mediaUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"
            }
        ];
    });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newMediaType, setNewMediaType] = useState("photo");
    const [mediaFileUrl, setMediaFileUrl] = useState("");

    // Сохранение в память браузера
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(newsList));
    }, [newsList, storageKey]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setMediaFileUrl(fileUrl);
            if (file.type.startsWith("video")) {
                setNewMediaType("video");
            } else {
                setNewMediaType("photo");
            }
        }
    };

    const handleAddNews = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newItem = {
            id: Date.now(),
            time: timeString,
            title: newTitle.trim(),
            content: newContent.trim() || "Текст публикации...",
            mediaType: newMediaType,
            mediaUrl: mediaFileUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80"
        };

        setNewsList([newItem, ...newsList]);
        setNewTitle("");
        setNewContent("");
        setMediaFileUrl("");
        setIsFormOpen(false);
    };

    const handleDeleteNews = (id, e) => {
        e.preventDefault();
        if (window.confirm("Удалить эту публикацию?")) {
            setNewsList(newsList.filter(item => item.id !== id));
        }
    };

    return (
        <div className="home-container" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Шапка раздела */}
            <div style={{ borderBottom: "2px solid #b81d24", paddingBottom: "15px", marginBottom: "30px" }}>
                <Link to="/" style={{ fontSize: "13px", color: "#666", textDecoration: "none" }}>← На главную</Link>
                <h1 style={{ fontSize: "32px", fontWeight: "800", margin: "10px 0 5px 0" }}>{categoryName}</h1>
                <p style={{ color: "#555", fontSize: "16px" }}>{categoryDescription}</p>
            </div>

            {/* Панель редактора для конкретного раздела */}
            <div className="admin-control-panel" style={{ marginBottom: "30px" }}>
                <button 
                    className="admin-toggle-btn"
                    onClick={() => setIsFormOpen(!isFormOpen)}
                >
                    {isFormOpen ? "✕ Закрыть редактор" : `+ Добавить материал в раздел «${categoryName}»`}
                </button>

                {isFormOpen && (
                    <form className="admin-news-form" onSubmit={handleAddNews} style={{ marginTop: "15px", background: "#f9f9f9", padding: "20px", border: "1px solid #ddd", borderRadius: "6px" }}>
                        <h3>Новая публикация: {categoryName}</h3>
                        
                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Заголовок:</label>
                            <input 
                                type="text" 
                                value={newTitle} 
                                onChange={(e) => setNewTitle(e.target.value)} 
                                placeholder="Введите заголовок..."
                                required 
                                style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Текст статьи:</label>
                            <textarea 
                                rows="4"
                                value={newContent} 
                                onChange={(e) => setNewContent(e.target.value)} 
                                placeholder="Напишите текст..."
                                style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Загрузить фото/видео:</label>
                            <input 
                                type="file" 
                                accept="image/*,video/*" 
                                onChange={handleFileChange} 
                            />
                        </div>

                        <button type="submit" className="submit-news-btn" style={{ background: "#b81d24", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Опубликовать</button>
                    </form>
                )}
            </div>

            {/* Лента материалов раздела */}
            <div className="bbc-feed-section">
                <div className="bbc-media-feed-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {newsList.map((news) => (
                        <div key={news.id} className="bbc-media-feed-card-wrapper" style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "6px", display: "flex", overflow: "hidden", position: "relative" }}>
                            <div style={{ width: "240px", minHeight: "150px", background: "#000", flexShrink: 0 }}>
                                {news.mediaType === "video" ? (
                                    <video src={news.mediaUrl} controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                    <img src={news.mediaUrl} alt="Иллюстрация" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                )}
                            </div>
                            <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
                                <div>
                                    <span style={{ fontSize: "12px", color: "#b81d24", fontWeight: "bold" }}>{news.time} • {categoryName}</span>
                                    <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "8px 0" }}>{news.title}</h3>
                                    <p style={{ fontSize: "14px", color: "#446" }}>{news.content}</p>
                                </div>
                                <button 
                                    onClick={(e) => handleDeleteNews(news.id, e)}
                                    style={{ alignSelf: "flex-start", background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: "12px", marginTop: "10px" }}
                                >
                                    ✕ Удалить публикацию
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};