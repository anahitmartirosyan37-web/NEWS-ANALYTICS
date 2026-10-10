import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articles.js";
import commentRoutes from "./routes/comments.js";
import subscriberRoutes from "./routes/subscribers.js";


dotenv.config({
    path: "./server/.env",
});

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());

await connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/articles", commentRoutes);
app.use("/api/comments", commentRoutes);

app.use(
    "/api/subscribers",
    subscriberRoutes
);

app.get("/api", (req, res) => {
    res.json({
        message: "News API is running",
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: "API route not found",
    });
});

app.listen(PORT, () => {
    console.log(
        `Server started on http://localhost:${PORT}`
    );
});