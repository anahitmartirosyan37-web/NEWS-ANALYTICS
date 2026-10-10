import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({
            message: "Введите логин и пароль",
        });
    }

    if (
        login !== process.env.ADMIN_LOGIN ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return res.status(401).json({
            message: "Неверный логин или пароль",
        });
    }

    const token = jwt.sign(
        {
            role: "admin",
            login,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    res.json({
        message: "Авторизация успешна",
        token,
    });
});

export default router;