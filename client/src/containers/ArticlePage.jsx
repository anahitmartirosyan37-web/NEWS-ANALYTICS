import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Article.css";

const API_URL = "https://news-analytics-5or6.vercel.app";

export const ArticlePage = () => {

    const { id } = useParams();

    const [article, setArticle] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================================================
    // COMMENTS
    // =========================================================

    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);

    const [commentName, setCommentName] = useState("");
    const [commentText, setCommentText] = useState("");

    const [commentLoading, setCommentLoading] = useState(false);

    const [commentError, setCommentError] = useState("");
    const [commentSuccess, setCommentSuccess] = useState("");


    // =========================================================
    // ПОЛУЧАЕМ СТАТЬЮ
    // =========================================================

    useEffect(() => {

        const fetchArticle = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/articles`
                );

                if (!response.ok) {
                    throw new Error(
                        "Не удалось получить статьи"
                    );
                }

                const data = await response.json();

                const articles = Array.isArray(data)
                    ? data
                    : data.articles || [];

                const foundArticle = articles.find(
                    (item) =>
                        String(item.id) === String(id)
                );

                if (!foundArticle) {
                    setArticle(null);
                } else {
                    setArticle(foundArticle);
                }

            } catch (error) {

                console.error(
                    "Ошибка загрузки статьи:",
                    error
                );

                setError(
                    "Не удалось загрузить статью."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchArticle();

    }, [id]);


    // =========================================================
    // ПОЛУЧАЕМ КОММЕНТАРИИ
    // =========================================================

    useEffect(() => {

        if (!article) {
            return;
        }

        const fetchComments = async () => {

            try {

                setCommentsLoading(true);

                const response = await fetch(
                    `${API_URL}/api/articles/${article.id}/comments`
                );

                if (!response.ok) {
                    throw new Error(
                        "Не удалось получить комментарии"
                    );
                }

                const data = await response.json();

                setComments(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (error) {

                console.error(
                    "Ошибка загрузки комментариев:",
                    error
                );

            } finally {

                setCommentsLoading(false);

            }

        };

        fetchComments();

    }, [article]);


    // =========================================================
    // ДОБАВИТЬ КОММЕНТАРИЙ
    // =========================================================

    const handleAddComment = async (event) => {

        event.preventDefault();

        setCommentError("");
        setCommentSuccess("");

        if (!commentName.trim()) {

            setCommentError(
                "Введите ваше имя."
            );

            return;

        }

        if (!commentText.trim()) {

            setCommentError(
                "Введите текст комментария."
            );

            return;

        }

        try {

            setCommentLoading(true);

            const response = await fetch(
                `${API_URL}/api/articles/${article.id}/comments`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name: commentName,
                        text: commentText,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Не удалось добавить комментарий"
                );

            }

            setComments((prevComments) => [
                data,
                ...prevComments,
            ]);

            setCommentText("");

            setCommentSuccess(
                "Комментарий опубликован."
            );

        } catch (error) {

            console.error(
                "Ошибка добавления комментария:",
                error
            );

            setCommentError(
                error.message ||
                "Не удалось добавить комментарий."
            );

        } finally {

            setCommentLoading(false);

        }

    };


    // =========================================================
    // ЗАГРУЗКА
    // =========================================================

    if (loading) {

        return (

            <main className="article-page">

                <div className="article-loading">

                    <div className="article-loading-line"></div>

                    <p>
                        Загрузка статьи...
                    </p>

                </div>

            </main>

        );

    }


    // =========================================================
    // ОШИБКА
    // =========================================================

    if (error) {

        return (

            <main className="article-page">

                <div className="article-not-found">

                    <span className="article-not-found-code">
                        Ошибка
                    </span>

                    <h1>
                        Не удалось загрузить статью
                    </h1>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/"
                        className="article-back-home"
                    >
                        Вернуться на главную
                    </Link>

                </div>

            </main>

        );

    }


    // =========================================================
    // СТАТЬЯ НЕ НАЙДЕНА
    // =========================================================

    if (!article) {

        return (

            <main className="article-page">

                <div className="article-not-found">

                    <span className="article-not-found-code">
                        404
                    </span>

                    <h1>
                        Статья не найдена
                    </h1>

                    <p>
                        Возможно, статья была удалена
                        или больше не существует.
                    </p>

                    <Link
                        to="/"
                        className="article-back-home"
                    >
                        Вернуться на главную
                    </Link>

                </div>

            </main>

        );

    }


    // =========================================================
    // ПОЛНЫЙ ТЕКСТ
    // =========================================================

    const paragraphs = Array.isArray(article.fullContent)

        ? article.fullContent

        : article.fullContent

            ? [article.fullContent]

            : article.content

                ? [article.content]

                : [];


    // =========================================================
    // КАТЕГОРИЯ
    // =========================================================

    const categoryName = {

        politics: "ПОЛИТИКА",

        society: "ОБЩЕСТВО",

        economy: "ЭКОНОМИКА",

        world: "В МИРЕ",

        podcast: "ПОДКАСТЫ"

    }[article.category] ||
        article.category?.toUpperCase();


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <main className="article-page">

            <article className="article-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="article-header">

                    <div className="article-category">

                        {categoryName}

                    </div>


                    <h1 className="article-title">

                        {article.title}

                    </h1>


                    {article.time && (

                        <div className="article-time">

                            {article.time}

                        </div>

                    )}

                </header>


                {/* =================================================
                    ARTICLE MAIN
                    ФОТО СЛЕВА / ТЕКСТ СПРАВА
                ================================================= */}

                <div className="article-main-layout">


                    {/* =================================================
                        ФОТО / ВИДЕО
                    ================================================= */}

                    <div className="article-media">

                        {article.mediaUrl ? (

                            article.mediaType === "video" ? (

                                <video
                                    src={article.mediaUrl}
                                    controls
                                    preload="metadata"
                                />

                            ) : (

                                <img
                                    src={article.mediaUrl}
                                    alt={article.title}
                                />

                            )

                        ) : (

                            <div className="article-no-media">
                                Нет изображения
                            </div>

                        )}

                    </div>


                    {/* =================================================
                        КРАСНАЯ ЛИНИЯ
                    ================================================= */}

                    <div className="article-divider"></div>


                    {/* =================================================
                        ТЕКСТ
                    ================================================= */}

                    <div className="article-text-column">


                        {article.content && (

                            <p className="article-lead">

                                {article.content}

                            </p>

                        )}


                        <div className="article-text">

                            {paragraphs.map(
                                (paragraph, index) => (

                                    <p key={index}>

                                        {paragraph}

                                    </p>

                                )
                            )}

                        </div>

                    </div>

                </div>


                {/* =================================================
                    COMMENTS
                ================================================= */}

                <section className="article-comments">


                    <div className="article-comments-header">

                        <h2>
                            Комментарии
                        </h2>

                        <span>
                            {comments.length}
                        </span>

                    </div>


                    {/* =================================================
                        ФОРМА
                    ================================================= */}

                    <form
                        className="comment-form"
                        onSubmit={handleAddComment}
                    >


                        <input
                            type="text"
                            value={commentName}
                            onChange={(event) =>
                                setCommentName(
                                    event.target.value
                                )
                            }
                            placeholder="Ваше имя"
                            maxLength={50}
                            disabled={commentLoading}
                            className="comment-name-input"
                        />


                        <textarea
                            value={commentText}
                            onChange={(event) =>
                                setCommentText(
                                    event.target.value
                                )
                            }
                            placeholder="Напишите свой комментарий..."
                            maxLength={1000}
                            disabled={commentLoading}
                        />


                        <div className="comment-form-bottom">

                            <span>
                                {commentText.length}/1000
                            </span>


                            <button
                                type="submit"
                                disabled={commentLoading}
                            >

                                {commentLoading
                                    ? "Публикация..."
                                    : "Опубликовать"
                                }

                            </button>

                        </div>


                        {commentError && (

                            <p className="comment-error">

                                {commentError}

                            </p>

                        )}


                        {commentSuccess && (

                            <p className="comment-success">

                                {commentSuccess}

                            </p>

                        )}

                    </form>


                    {/* =================================================
                        СПИСОК КОММЕНТАРИЕВ
                    ================================================= */}

                    <div className="comments-list">


                        {commentsLoading ? (

                            <div className="comments-loading">

                                Загрузка комментариев...

                            </div>

                        ) : comments.length === 0 ? (

                            <div className="comments-empty">

                                <p>
                                    Пока комментариев нет.
                                </p>

                                <span>
                                    Будьте первым, кто
                                    оставит комментарий.
                                </span>

                            </div>

                        ) : (

                            comments.map((comment) => (

                                <article
                                    className="comment-item"
                                    key={comment._id}
                                >

                                    <div className="comment-header">

                                        <div className="comment-author">

                                            {comment.name ||
                                                "Пользователь"}

                                        </div>


                                        {comment.createdAt && (

                                            <time>

                                                {new Date(
                                                    comment.createdAt
                                                ).toLocaleString(
                                                    "ru-RU",
                                                    {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )}

                                            </time>

                                        )}

                                    </div>


                                    <p className="comment-text">

                                        {comment.text}

                                    </p>

                                </article>

                            ))

                        )}

                    </div>

                </section>

            </article>

        </main>

    );

};