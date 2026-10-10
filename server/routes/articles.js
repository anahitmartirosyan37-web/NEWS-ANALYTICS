import express from "express";
import Article from "../models/Article.js";
import Subscriber from "../models/Subscriber.js";
import { sendNewArticleEmail } from "../config/mailer.js";

const router = express.Router();


// =========================================================
// Получить все статьи
// GET /api/articles
// =========================================================

router.get("/", async (req, res) => {
    try {

        const articles = await Article.find()
            .sort({ createdAt: -1 });

        res.json(articles);

    } catch (error) {

        console.error(
            "Ошибка при получении статей:",
            error
        );

        res.status(500).json({
            message: "Ошибка при получении статей",
        });

    }
});


// =========================================================
// Получить одну статью
// GET /api/articles/:id
// =========================================================

router.get("/:id", async (req, res) => {
    try {

        const article = await Article.findOne({
            id: req.params.id,
        });

        if (!article) {

            return res.status(404).json({
                message: "Статья не найдена",
            });

        }

        res.json(article);

    } catch (error) {

        console.error(
            "Ошибка при получении статьи:",
            error
        );

        res.status(500).json({
            message: "Ошибка при получении статьи",
        });

    }
});


// =========================================================
// Создание статьи
// POST /api/articles
// =========================================================
router.post("/", async (req, res) => {
    try {
        const article = await Article.create(req.body);

        console.log(
            "Статья создана:",
            article.title
        );

        // Проверяем, нужно ли отправлять уведомление
        if (req.body.sendNotification) {
            const subscribers = await Subscriber.find(
                {},
                { email: 1, _id: 0 }
            );

            console.log(
                `Найдено подписчиков: ${subscribers.length}`
            );

            let articleContent =
                article.content || "";

            if (
                !articleContent &&
                Array.isArray(article.fullContent)
            ) {
                articleContent =
                    article.fullContent.join("\n");
            }

            for (const subscriber of subscribers) {
                try {
                    console.log(
                        `Отправляем письмо: ${subscriber.email}`
                    );

                    await sendNewArticleEmail({
                        to: subscriber.email,
                        title: article.title,
                        content: articleContent,
                        articleId: article.id,
                    });

                    console.log(
                        `Письмо отправлено: ${subscriber.email}`
                    );
                } catch (emailError) {
                    console.error(
                        `Не удалось отправить письмо на ${subscriber.email}:`,
                        emailError
                    );
                }
            }
        } else {
            console.log(
                "Уведомление подписчикам отключено."
            );
        }

        res.status(201).json(article);
    } catch (error) {
        console.error(
            "Ошибка при создании статьи:",
            error
        );

        res.status(500).json({
            message: "Ошибка при создании статьи",
            error: error.message,
        });
    }
});

// =========================================================
// Обновление статьи
// PUT /api/articles/:id
// =========================================================

router.put("/:id", async (req, res) => {
    try {

        const article =
            await Article.findOneAndUpdate(
                {
                    id: req.params.id,
                },
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!article) {

            return res.status(404).json({
                message: "Статья не найдена",
            });

        }

        res.json(article);

    } catch (error) {

        console.error(
            "Ошибка при обновлении статьи:",
            error
        );

        res.status(500).json({
            message: "Ошибка при обновлении статьи",
            error: error.message,
        });

    }
});


// =========================================================
// Удаление статьи
// DELETE /api/articles/:id
// =========================================================

router.delete("/:id", async (req, res) => {
    try {

        const article =
            await Article.findOneAndDelete({
                id: req.params.id,
            });

        if (!article) {

            return res.status(404).json({
                message: "Статья не найдена",
            });

        }

        res.json({
            message: "Статья удалена",
        });

    } catch (error) {

        console.error(
            "Ошибка при удалении статьи:",
            error
        );

        res.status(500).json({
            message: "Ошибка при удалении статьи",
        });

    }
});


export default router;