import { useEffect, useState } from "react";
import "./AdminPage.css";

const API_URL = "http://localhost:5000";

const initialArticle = {
    id: "",
    time: "",
    category: "society",
    title: "",
    content: "",
    fullContent: "",
    mediaType: "image",
    mediaUrl: "",
};

export const AdminPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem("adminToken"))
    );

    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState(initialArticle);
    const [editingId, setEditingId] = useState(null);

    // COMMENTS
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState("");
    const [deletingCommentId, setDeletingCommentId] = useState(null);
    const [sendNotification, setSendNotification] = useState(false);

    // NEWSLETTER
    const [newsletterSubject, setNewsletterSubject] =
        useState("");

    const [newsletterTitle, setNewsletterTitle] =
        useState("");

    const [newsletterContent, setNewsletterContent] =
        useState("");

    const [newsletterLoading, setNewsletterLoading] =
        useState(false);

    const [newsletterMessage, setNewsletterMessage] =
        useState("");

    const [newsletterError, setNewsletterError] =
        useState("");

    const [subscriberCount, setSubscriberCount] =
        useState(0);
    /*
    =========================================================
    AUTH
    =========================================================
    */

    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        login,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Ошибка авторизации"
                );
            }

            localStorage.setItem(
                "adminToken",
                data.token
            );

            setIsAuthenticated(true);

            setLogin("");
            setPassword("");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");

        setIsAuthenticated(false);

        setLogin("");
        setPassword("");

        setArticles([]);
        setComments([]);

        setArticle(initialArticle);
        setEditingId(null);

        setError("");
        setSuccess("");
        setCommentsError("");
    };

    /*
    =========================================================
    AUTH HELPER
    =========================================================
    */

    const handleUnauthorized = () => {
        localStorage.removeItem("adminToken");

        setIsAuthenticated(false);
        setArticles([]);
        setComments([]);

        setArticle(initialArticle);
        setEditingId(null);

        throw new Error(
            "Сессия закончилась. Войдите снова."
        );
    };

    /*
    =========================================================
    GET ALL ARTICLES
    =========================================================
    */

    const fetchArticles = async () => {
        try {
            setError("");

            const token =
                localStorage.getItem("adminToken");

            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            const response = await fetch(
                `${API_URL}/api/articles`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    handleUnauthorized();
                }

                throw new Error(
                    data.message ||
                    "Не удалось загрузить статьи"
                );
            }

            const loadedArticles = Array.isArray(data)
                ? data
                : data.articles || [];

            setArticles(loadedArticles);
        } catch (error) {
            setError(error.message);
        }
    };

    /*
    =========================================================
    GET ALL COMMENTS
    =========================================================
    */

    const fetchComments = async () => {
        try {
            setCommentsLoading(true);
            setCommentsError("");

            const response = await fetch(
                `${API_URL}/api/comments`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Не удалось загрузить комментарии"
                );
            }

            const loadedComments = Array.isArray(data)
                ? data
                : data.comments || [];

            setComments(loadedComments);
        } catch (error) {
            console.error(
                "Ошибка загрузки комментариев:",
                error
            );

            setCommentsError(error.message);
        } finally {
            setCommentsLoading(false);
        }
    };

    /*
    =========================================================
    LOAD DATA AFTER LOGIN
    =========================================================
    */

    useEffect(() => {
        if (isAuthenticated) {
            fetchArticles();
            fetchComments();
        }
    }, [isAuthenticated]);
    const handleSendNewsletter = async (event) => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Вы действительно хотите отправить это письмо всем подписчикам?"
        );

        if (!confirmed) {
            return;
        }

        setNewsletterLoading(true);
        setNewsletterMessage("");
        setNewsletterError("");

        try {
            const token =
                localStorage.getItem("adminToken");

            if (!token) {
                setIsAuthenticated(false);

                throw new Error(
                    "Сессия закончилась. Войдите снова."
                );
            }

            const response = await fetch(
                `${API_URL}/api/subscribers/newsletter`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        subject: newsletterSubject,
                        title: newsletterTitle,
                        content: newsletterContent,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    handleUnauthorized();
                }

                throw new Error(
                    data.message ||
                    "Не удалось выполнить рассылку"
                );
            }

            setNewsletterMessage(
                data.message
            );

            setNewsletterSubject("");
            setNewsletterTitle("");
            setNewsletterContent("");
        } catch (error) {
            setNewsletterError(
                error.message
            );
        } finally {
            setNewsletterLoading(false);
        }
    };
    /*
    =========================================================
    FORM CHANGE
    =========================================================
    */

    const handleArticleChange = (event) => {
        const { name, value } = event.target;

        setArticle((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /*
    =========================================================
    CREATE / UPDATE ARTICLE
    =========================================================
    */
    const generateArticleId = () => {
        const prefix = article.category;

        const categoryArticles = articles.filter(
            (item) => item.category === prefix
        );

        let number = categoryArticles.length + 1;

        let newId = `${prefix}-${number}`;

        while (
            articles.some(
                (item) => item.id === newId
            )
        ) {
            number++;
            newId = `${prefix}-${number}`;
        }

        return newId;
    };
    const handleSubmitArticle = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const token =
                localStorage.getItem("adminToken");

            if (!token) {
                setIsAuthenticated(false);

                throw new Error(
                    "Сессия закончилась. Войдите снова."
                );
            }

            const fullContent = article.fullContent
                .split("\n")
                .map((paragraph) => paragraph.trim())
                .filter(Boolean);

            const articleData = {
                id: editingId
                    ? article.id.trim()
                    : generateArticleId(),
                time: article.time.trim(),
                category: article.category,
                title: article.title.trim(),
                content: article.content.trim(),
                fullContent,
                mediaType: article.mediaType,
                mediaUrl: article.mediaUrl.trim(),
                sendNotification: editingId
                    ? false
                    : sendNotification,
            };

            let response;

            /*
            =========================
            UPDATE
            =========================
            */

            if (editingId) {
                response = await fetch(
                    `${API_URL}/api/articles/${editingId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json",
                            Authorization:
                                `Bearer ${token}`,
                        },
                        body: JSON.stringify(
                            articleData
                        ),
                    }
                );
            }

            /*
            =========================
            CREATE
            =========================
            */

            else {
                response = await fetch(
                    `${API_URL}/api/articles`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                            Authorization:
                                `Bearer ${token}`,
                        },
                        body: JSON.stringify(
                            articleData
                        ),
                    }
                );
            }

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    handleUnauthorized();
                }

                throw new Error(
                    data.message ||
                    (
                        editingId
                            ? "Ошибка при изменении статьи"
                            : "Ошибка при создании статьи"
                    )
                );
            }

            if (editingId) {
                setSuccess(
                    "Статья успешно изменена."
                );
            } else {
                setSuccess(
                    "Статья успешно создана."
                );
            }

            setArticle(initialArticle);
            setEditingId(null);

            await fetchArticles();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /*
    =========================================================
    EDIT ARTICLE
    =========================================================
    */

    const handleEditArticle = (selectedArticle) => {
        setError("");
        setSuccess("");

        /*
         * ВАЖНО:
         * backend ищет статью по полю id,
         * поэтому здесь используем selectedArticle.id,
         * а не selectedArticle._id.
         */

        setEditingId(selectedArticle.id);

        setArticle({
            id: selectedArticle.id || "",
            time: selectedArticle.time || "",
            category:
                selectedArticle.category || "society",
            title: selectedArticle.title || "",
            content: selectedArticle.content || "",

            fullContent: Array.isArray(
                selectedArticle.fullContent
            )
                ? selectedArticle.fullContent.join("\n")
                : selectedArticle.fullContent || "",

            mediaType:
                selectedArticle.mediaType || "image",

            mediaUrl:
                selectedArticle.mediaUrl || "",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /*
    =========================================================
    CANCEL EDIT
    =========================================================
    */

    const handleCancelEdit = () => {
        setArticle(initialArticle);
        setEditingId(null);

        setError("");
        setSuccess("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /*
    =========================================================
    DELETE ARTICLE
    =========================================================
    */

    const handleDeleteArticle = async (
        selectedArticle
    ) => {
        const confirmed = window.confirm(
            `Вы действительно хотите удалить статью:\n\n"${selectedArticle.title}"?`
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const token =
                localStorage.getItem("adminToken");

            if (!token) {
                setIsAuthenticated(false);

                throw new Error(
                    "Сессия закончилась. Войдите снова."
                );
            }

            /*
             * Backend удаляет статью по id,
             * поэтому используем selectedArticle.id.
             */

            const response = await fetch(
                `${API_URL}/api/articles/${selectedArticle.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    handleUnauthorized();
                }

                throw new Error(
                    data.message ||
                    "Ошибка при удалении статьи"
                );
            }

            setSuccess(
                "Статья успешно удалена."
            );

            if (
                editingId === selectedArticle.id
            ) {
                setArticle(initialArticle);
                setEditingId(null);
            }

            await fetchArticles();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /*
    =========================================================
    DELETE COMMENT
    =========================================================
    */

    const handleDeleteComment = async (comment) => {
        const confirmed = window.confirm(
            `Удалить комментарий пользователя "${comment.name}"?\n\n"${comment.text}"`
        );

        if (!confirmed) {
            return;
        }

        setCommentsError("");
        setDeletingCommentId(comment._id);

        try {
            const response = await fetch(
                `${API_URL}/api/comments/${comment._id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Ошибка при удалении комментария"
                );
            }

            /*
             * Убираем удалённый комментарий
             * сразу из списка.
             */

            setComments((prevComments) =>
                prevComments.filter(
                    (item) =>
                        item._id !== comment._id
                )
            );

            setSuccess(
                "Комментарий успешно удалён."
            );
        } catch (error) {
            console.error(
                "Ошибка удаления комментария:",
                error
            );

            setCommentsError(error.message);
        } finally {
            setDeletingCommentId(null);
        }
    };

    /*
    =========================================================
    CATEGORY NAME
    =========================================================
    */

    const getCategoryName = (category) => {
        const categories = {
            politics: "Политика",
            society: "Общество",
            economy: "Экономика",
            world: "В мире",
            podcast: "Подкасты",
        };

        return (
            categories[category] ||
            category
        );
    };

    /*
    =========================================================
    GET ARTICLE TITLE FOR COMMENT
    =========================================================
    */

    const getArticleTitle = (articleId) => {
        const foundArticle = articles.find(
            (currentArticle) =>
                String(currentArticle.id) ===
                String(articleId)
        );

        if (foundArticle) {
            return foundArticle.title;
        }

        return articleId || "Статья не найдена";
    };

    /*
    =========================================================
    FORMAT COMMENT DATE
    =========================================================
    */

    const formatCommentDate = (date) => {
        if (!date) {
            return "";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    /*
    =========================================================
    LOGIN PAGE
    =========================================================
    */

    if (!isAuthenticated) {
        return (
            <main className="admin-page">

                <div className="admin-login-wrapper">

                    <div className="admin-login">

                        <div className="admin-logo">
                            NEWS
                        </div>

                        <div className="admin-label">
                            ADMIN PANEL
                        </div>

                        <h1>
                            Вход в панель
                        </h1>

                        <p className="admin-description">
                            Авторизуйтесь для управления
                            публикациями.
                        </p>

                        <form
                            className="admin-form"
                            onSubmit={handleLogin}
                        >

                            <div className="admin-field">

                                <label htmlFor="admin-login">
                                    Логин
                                </label>

                                <input
                                    id="admin-login"
                                    type="text"
                                    value={login}
                                    onChange={(event) =>
                                        setLogin(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Введите логин"
                                    autoComplete="username"
                                    required
                                />

                            </div>

                            <div className="admin-field">

                                <label htmlFor="admin-password">
                                    Пароль
                                </label>

                                <input
                                    id="admin-password"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Введите пароль"
                                    autoComplete="current-password"
                                    required
                                />

                            </div>

                            {error && (
                                <div className="admin-error">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="admin-login-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Вход..."
                                    : "Войти"}
                            </button>

                        </form>

                    </div>

                </div>

            </main>
        );
    }

    /*
    =========================================================
    ADMIN DASHBOARD
    =========================================================
    */

    return (
        <main className="admin-page">

            <div className="admin-dashboard">

                {/* HEADER */}

                <header className="admin-header">

                    <div>

                        <div className="admin-label">
                            ADMIN PANEL
                        </div>

                        <h1>
                            Панель администратора
                        </h1>

                    </div>

                    <button
                        className="admin-logout"
                        onClick={handleLogout}
                    >
                        Выйти
                    </button>

                </header>

                <section className="admin-content">

                    {/* ======================================
                        FORM
                    ====================================== */}

                    <div className="admin-section-header">

                        <div>

                            <span className="admin-section-label">
                                CONTENT
                            </span>

                            <h2>
                                {editingId
                                    ? "Редактирование статьи"
                                    : "Создание статьи"}
                            </h2>

                        </div>

                    </div>

                    <form
                        className="admin-article-form"
                        onSubmit={handleSubmitArticle}
                    >

                        {/* ID */}

                        <div className="admin-field">

                            <label htmlFor="article-id">
                                ID статьи
                            </label>

                            <input
                                id="article-id"
                                name="id"
                                type="text"
                                value={article.id}
                                onChange={handleArticleChange}
                                placeholder="Например: society-6"
                                required
                            />

                            <span className="admin-hint">
                                Уникальный идентификатор статьи.
                            </span>

                        </div>

                        {/* TITLE */}

                        <div className="admin-field">

                            <label htmlFor="article-title">
                                Заголовок
                            </label>

                            <input
                                id="article-title"
                                name="title"
                                type="text"
                                value={article.title}
                                onChange={handleArticleChange}
                                placeholder="Введите заголовок статьи"
                                required
                            />

                        </div>

                        {/* CATEGORY */}

                        <div className="admin-field">

                            <label htmlFor="article-category">
                                Категория
                            </label>

                            <select
                                id="article-category"
                                name="category"
                                value={article.category}
                                onChange={handleArticleChange}
                                required
                            >

                                <option value="politics">
                                    Политика
                                </option>

                                <option value="society">
                                    Общество
                                </option>

                                <option value="economy">
                                    Экономика
                                </option>

                                <option value="world">
                                    В мире
                                </option>

                                <option value="podcast">
                                    Подкасты
                                </option>

                            </select>

                        </div>

                        {/* TIME */}

                        <div className="admin-field">

                            <label htmlFor="article-time">
                                Время публикации
                            </label>

                            <input
                                id="article-time"
                                name="time"
                                type="text"
                                value={article.time}
                                onChange={handleArticleChange}
                                placeholder="Например: 19 сентября, 14:30"
                            />

                        </div>

                        {/* SHORT CONTENT */}

                        <div className="admin-field">

                            <label htmlFor="article-content">
                                Краткое описание
                            </label>

                            <textarea
                                id="article-content"
                                name="content"
                                value={article.content}
                                onChange={handleArticleChange}
                                placeholder="Краткое описание статьи"
                                rows="5"
                                required
                            />

                        </div>

                        {/* FULL CONTENT */}

                        <div className="admin-field">

                            <label htmlFor="article-full-content">
                                Полный текст статьи
                            </label>

                            <textarea
                                id="article-full-content"
                                name="fullContent"
                                value={article.fullContent}
                                onChange={handleArticleChange}
                                placeholder={
                                    "Первый абзац статьи...\n\nВторой абзац статьи..."
                                }
                                rows="15"
                                required
                            />

                            <span className="admin-hint">
                                Каждый новый абзац начинайте
                                с новой строки.
                            </span>

                        </div>

                        {/* MEDIA TYPE */}

                        <div className="admin-field">

                            <label htmlFor="article-media-type">
                                Тип медиа
                            </label>

                            <select
                                id="article-media-type"
                                name="mediaType"
                                value={article.mediaType}
                                onChange={handleArticleChange}
                            >

                                <option value="image">
                                    Изображение
                                </option>

                                <option value="video">
                                    Видео
                                </option>

                            </select>

                        </div>

                        {/* MEDIA URL */}

                        <div className="admin-field">

                            <label htmlFor="article-media-url">
                                URL медиа
                            </label>

                            <input
                                id="article-media-url"
                                name="mediaUrl"
                                type="text"
                                value={article.mediaUrl}
                                onChange={handleArticleChange}
                                placeholder="https://example.com/image.jpg"
                            />

                            <span className="admin-hint">
                                Ссылка на изображение или видео.
                            </span>

                        </div>

                        {error && (
                            <div className="admin-error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="admin-success">
                                {success}
                            </div>
                        )}
                        <label className="notification-checkbox">
                            <input
                                type="checkbox"
                                checked={sendNotification}
                                onChange={(e) =>
                                    setSendNotification(e.target.checked)
                                }
                            />

                            <span>
                                Отправить уведомление подписчикам
                            </span>
                        </label>

                        <div className="admin-form-buttons">

                            <button
                                type="submit"
                                className="admin-create-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Сохранение..."
                                    : editingId
                                        ? "Сохранить изменения"
                                        : "Создать статью"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="admin-cancel-button"
                                    onClick={handleCancelEdit}
                                    disabled={loading}
                                >
                                    Отмена
                                </button>
                            )}

                        </div>

                    </form>

                    {/* ======================================
                        ALL ARTICLES
                    ====================================== */}

                    <div className="admin-articles-section">

                        <div className="admin-section-header">

                            <div>

                                <span className="admin-section-label">
                                    DATABASE
                                </span>

                                <h2>
                                    Все статьи

                                    <span className="admin-count">
                                        {articles.length}
                                    </span>
                                </h2>

                            </div>

                            <button
                                className="admin-refresh-button"
                                onClick={fetchArticles}
                                disabled={loading}
                            >
                                Обновить
                            </button>

                        </div>

                        {articles.length === 0 ? (

                            <div className="admin-empty">

                                <h3>
                                    Статей пока нет
                                </h3>

                                <p>
                                    Создайте первую статью
                                    через форму выше.
                                </p>

                            </div>

                        ) : (

                            <div className="admin-articles-list">

                                {articles.map(
                                    (currentArticle) => (

                                        <article
                                            className="admin-article-card"
                                            key={
                                                currentArticle._id ||
                                                currentArticle.id
                                            }
                                        >

                                            {/* MEDIA */}

                                            <div className="admin-article-media">

                                                {currentArticle.mediaType ===
                                                    "video" ? (

                                                    <div className="admin-video-placeholder">
                                                        VIDEO
                                                    </div>

                                                ) : currentArticle.mediaUrl ? (

                                                    <img
                                                        src={
                                                            currentArticle.mediaUrl
                                                        }
                                                        alt={
                                                            currentArticle.title
                                                        }
                                                        onError={(
                                                            event
                                                        ) => {
                                                            event.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />

                                                ) : (

                                                    <div className="admin-image-placeholder">
                                                        NO IMAGE
                                                    </div>

                                                )}

                                            </div>

                                            {/* INFO */}

                                            <div className="admin-article-info">

                                                <div className="admin-article-top">

                                                    <span className="admin-article-category">
                                                        {getCategoryName(
                                                            currentArticle.category
                                                        )}
                                                    </span>

                                                    <span className="admin-article-time">
                                                        {
                                                            currentArticle.time
                                                        }
                                                    </span>

                                                </div>

                                                <div className="admin-article-id">
                                                    ID:{" "}
                                                    {
                                                        currentArticle.id
                                                    }
                                                </div>

                                                <h3>
                                                    {
                                                        currentArticle.title
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        currentArticle.content
                                                    }
                                                </p>

                                                <div className="admin-article-meta">

                                                    <span>
                                                        Media:{" "}
                                                        {
                                                            currentArticle.mediaType ||
                                                            "—"
                                                        }
                                                    </span>

                                                    <span>
                                                        Абзацев:{" "}
                                                        {Array.isArray(
                                                            currentArticle.fullContent
                                                        )
                                                            ? currentArticle
                                                                .fullContent
                                                                .length
                                                            : 0}
                                                    </span>

                                                </div>

                                                {/* ACTIONS */}

                                                <div className="admin-article-actions">

                                                    <button
                                                        className="admin-edit-button"
                                                        onClick={() =>
                                                            handleEditArticle(
                                                                currentArticle
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >
                                                        Редактировать
                                                    </button>

                                                    <button
                                                        className="admin-delete-button"
                                                        onClick={() =>
                                                            handleDeleteArticle(
                                                                currentArticle
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >
                                                        Удалить
                                                    </button>

                                                </div>

                                            </div>

                                        </article>

                                    )
                                )}

                            </div>

                        )}

                    </div>

                    {/* ======================================
                        COMMENTS
                    ====================================== */}

                    <div className="admin-comments-section">

                        <div className="admin-section-header">

                            <div>

                                <span className="admin-section-label">
                                    MODERATION
                                </span>

                                <h2>
                                    Комментарии

                                    <span className="admin-count">
                                        {comments.length}
                                    </span>
                                </h2>

                            </div>

                            <button
                                className="admin-refresh-button"
                                onClick={fetchComments}
                                disabled={commentsLoading}
                            >
                                {commentsLoading
                                    ? "Загрузка..."
                                    : "Обновить"}
                            </button>

                        </div>

                        {commentsError && (
                            <div className="admin-error">
                                {commentsError}
                            </div>
                        )}
                        {/* ======================================
    NEWSLETTER
====================================== */}

                        <div className="admin-newsletter-section">

                            <div className="admin-section-header">

                                <div>
                                    <span className="admin-section-label">
                                        NEWSLETTER
                                    </span>

                                    <h2>
                                        Рассылка новостей
                                    </h2>
                                </div>

                            </div>

                            <div className="admin-newsletter-card">

                                <div className="admin-newsletter-info">

                                    <div className="admin-newsletter-icon">
                                        ✉
                                    </div>

                                    <div>
                                        <h3>
                                            Отправить новость подписчикам
                                        </h3>

                                        <p>
                                            Напишите новость ниже.
                                            После отправки письмо будет
                                            отправлено всем пользователям,
                                            которые подписались на рассылку.
                                        </p>
                                    </div>

                                </div>

                                <form
                                    className="admin-newsletter-form"
                                    onSubmit={handleSendNewsletter}
                                >

                                    <div className="admin-field">

                                        <label htmlFor="newsletter-subject">
                                            Тема письма
                                        </label>

                                        <input
                                            id="newsletter-subject"
                                            type="text"
                                            value={newsletterSubject}
                                            onChange={(event) =>
                                                setNewsletterSubject(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Например: Важные новости дня"
                                            required
                                        />

                                    </div>

                                    <div className="admin-field">

                                        <label htmlFor="newsletter-title">
                                            Заголовок новости
                                        </label>

                                        <input
                                            id="newsletter-title"
                                            type="text"
                                            value={newsletterTitle}
                                            onChange={(event) =>
                                                setNewsletterTitle(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Введите заголовок новости"
                                            required
                                        />

                                    </div>

                                    <div className="admin-field">

                                        <label htmlFor="newsletter-content">
                                            Текст новости
                                        </label>

                                        <textarea
                                            id="newsletter-content"
                                            value={newsletterContent}
                                            onChange={(event) =>
                                                setNewsletterContent(
                                                    event.target.value
                                                )
                                            }
                                            placeholder={
                                                "Введите текст новости...\n\nКаждый новый абзац начинайте с новой строки."
                                            }
                                            rows="12"
                                            required
                                        />

                                        <span className="admin-hint">
                                            Этот текст будет отправлен
                                            всем подписчикам по email.
                                        </span>

                                    </div>

                                    {newsletterError && (
                                        <div className="admin-error">
                                            {newsletterError}
                                        </div>
                                    )}

                                    {newsletterMessage && (
                                        <div className="admin-success">
                                            {newsletterMessage}
                                        </div>
                                    )}

                                    <div className="admin-newsletter-actions">

                                        <button
                                            type="submit"
                                            className="admin-newsletter-send-button"
                                            disabled={newsletterLoading}
                                        >
                                            {newsletterLoading
                                                ? "Отправка..."
                                                : "Отправить всем подписчикам"}
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>
                        {commentsLoading ? (

                            <div className="admin-comments-empty">
                                Загрузка комментариев...
                            </div>

                        ) : comments.length === 0 ? (

                            <div className="admin-comments-empty">

                                <h3>
                                    Комментариев пока нет
                                </h3>

                                <p>
                                    Когда пользователи оставят
                                    комментарии, они появятся здесь.
                                </p>

                            </div>

                        ) : (

                            <div className="admin-comments-list">

                                {comments.map((comment) => (

                                    <div
                                        className="admin-comment-card"
                                        key={comment._id}
                                    >

                                        <div className="admin-comment-header">

                                            <div>

                                                <div className="admin-comment-name">
                                                    {comment.name}
                                                </div>

                                                <div className="admin-comment-date">
                                                    {formatCommentDate(
                                                        comment.createdAt
                                                    )}
                                                </div>

                                            </div>

                                            <button
                                                className="admin-comment-delete"
                                                onClick={() =>
                                                    handleDeleteComment(
                                                        comment
                                                    )
                                                }
                                                disabled={
                                                    deletingCommentId ===
                                                    comment._id
                                                }
                                            >
                                                {deletingCommentId ===
                                                    comment._id
                                                    ? "Удаление..."
                                                    : "Удалить"}
                                            </button>

                                        </div>

                                        <div className="admin-comment-article">

                                            <span>
                                                Статья:
                                            </span>

                                            <strong>
                                                {getArticleTitle(
                                                    comment.articleId
                                                )}
                                            </strong>

                                        </div>

                                        <div className="admin-comment-id">
                                            ID статьи:{" "}
                                            {comment.articleId}
                                        </div>

                                        <p className="admin-comment-text">
                                            {comment.text}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </section>

            </div>

        </main>
    );
};