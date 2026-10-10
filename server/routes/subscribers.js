import express from "express";
import Subscriber from "../models/Subscriber.js";
import { sendNewsletterEmail } from "../config/mailer.js";
const router = express.Router();

router.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Введите email",
            });
        }

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                message: "Введите корректный email",
            });
        }

        const existingSubscriber =
            await Subscriber.findOne({
                email: normalizedEmail,
            });

        if (existingSubscriber) {
            return res.status(409).json({
                message: "Этот email уже подписан на рассылку",
            });
        }

        const subscriber = await Subscriber.create({
            email: normalizedEmail,
        });

        await sendSubscriptionEmail(
            normalizedEmail
        );

        res.status(201).json({
            message:
                "Вы успешно подписались на рассылку",
            subscriber,
        });
    } catch (error) {
        console.error(
            "Ошибка подписки:",
            error
        );

        res.status(500).json({
            message:
                "Не удалось оформить подписку",
        });
    }
});
router.post("/newsletter", async (req, res) => {
    try {
        const { subject, title, content } = req.body;

        if (!subject || !title || !content) {
            return res.status(400).json({
                message:
                    "Заполните тему, заголовок и текст новости",
            });
        }

        const subscribers = await Subscriber.find(
            {},
            { email: 1, _id: 0 }
        );

        if (subscribers.length === 0) {
            return res.status(400).json({
                message:
                    "Пока нет подписчиков для рассылки",
            });
        }

        let sent = 0;
        let failed = 0;

        for (const subscriber of subscribers) {
            try {
                await sendNewsletterEmail({
                    to: subscriber.email,
                    subject: subject.trim(),
                    title: title.trim(),
                    content: content.trim(),
                });

                sent++;
            } catch (error) {
                console.error(
                    `Ошибка отправки на ${subscriber.email}:`,
                    error
                );

                failed++;
            }
        }

        res.status(200).json({
            message: `Рассылка завершена. Отправлено: ${sent}. Ошибок: ${failed}.`,
            sent,
            failed,
            total: subscribers.length,
        });
    } catch (error) {
        console.error(
            "Ошибка рассылки:",
            error
        );

        res.status(500).json({
            message:
                "Не удалось выполнить рассылку",
        });
    }
});

export default router;