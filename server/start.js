import dotenv from "dotenv";
import app from "./server.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

try {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
} catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
}