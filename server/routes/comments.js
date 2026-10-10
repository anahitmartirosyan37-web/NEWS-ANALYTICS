import express from "express";
import Comment from "../models/Comment.js";
import Article from "../models/Article.js";

const router = express.Router();

/*
========================================
ПОЛУЧИТЬ КОММЕНТАРИИ К СТАТЬЕ
GET /api/articles/:articleId/comments
========================================
*/

router.get("/:articleId/comments", async (req, res) => {
    try {
        const { articleId } = req.params;

        const article = await Article.findOne({
            id: articleId,
        });

        if (!article) {
            return res.status(404).json({
                message: "Статья не найдена",
            });
        }

        const comments = await Comment.find({
            articleId,
        }).sort({
            createdAt: -1,
        });

        res.json(comments);
    } catch (error) {
        console.error(
            "Ошибка при получении комментариев:",
            error
        );

        res.status(500).json({
            message: "Ошибка при получении комментариев",
        });
    }
});

/*
========================================
ДОБАВИТЬ КОММЕНТАРИЙ
POST /api/articles/:articleId/comments
========================================
*/

router.post("/:articleId/comments", async (req, res) => {
    try {
        const { articleId } = req.params;
        const { name, text } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Введите ваше имя",
            });
        }

        if (name.trim().length > 50) {
            return res.status(400).json({
                message:
                    "Имя не должно быть длиннее 50 символов",
            });
        }

        if (!text || !text.trim()) {
            return res.status(400).json({
                message:
                    "Комментарий не может быть пустым",
            });
        }

        if (text.trim().length > 1000) {
            return res.status(400).json({
                message:
                    "Комментарий не должен быть длиннее 1000 символов",
            });
        }

        const article = await Article.findOne({
            id: articleId,
        });

        if (!article) {
            return res.status(404).json({
                message: "Статья не найдена",
            });
        }

        const comment = await Comment.create({
            articleId,
            name: name.trim(),
            text: text.trim(),
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error(
            "Ошибка при добавлении комментария:",
            error
        );

        res.status(500).json({
            message: "Ошибка при добавлении комментария",
            error: error.message,
        });
    }
});

/*
========================================
ПОЛУЧИТЬ ВСЕ КОММЕНТАРИИ ДЛЯ АДМИНКИ
GET /api/comments
========================================
*/

router.get("/", async (req, res) => {
    console.log(1);
    
    try {
        const comments = await Comment.find()
            .sort({
                createdAt: -1,
            });

        res.json(comments);
    } catch (error) {
        console.error(
            "Ошибка при получении всех комментариев:",
            error
        );

        res.status(500).json({
            message: "Ошибка при получении комментариев",
        });
    }
});

/*
========================================
УДАЛИТЬ ЛЮБОЙ КОММЕНТАРИЙ
DELETE /api/comments/:commentId
========================================
*/

router.delete("/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findByIdAndDelete(
            commentId
        );

        if (!comment) {
            return res.status(404).json({
                message: "Комментарий не найден",
            });
        }

        res.json({
            message: "Комментарий удалён",
            comment,
        });
    } catch (error) {
        console.error(
            "Ошибка при удалении комментария:",
            error
        );

        res.status(500).json({
            message: "Ошибка при удалении комментария",
        });
    }
});

export default router;