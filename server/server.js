import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articles.js";
import commentRoutes from "./routes/comments.js";
import subscriberRoutes from "./routes/subscribers.js";

dotenv.config();

const app = express();

app.use(
    cors()
);

app.use(express.json());

// Подключаемся к базе перед обработкой запросов
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("MongoDB connection error:", error);
        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/articles", commentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/subscribers", subscriberRoutes);

app.get("/api", (req, res) => {
    res.json({
        message: "News API is running"
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

export default app;
