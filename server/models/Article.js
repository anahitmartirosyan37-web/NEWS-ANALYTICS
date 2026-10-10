import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },

        time: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            enum: [
                "politics",
                "society",
                "economy",
                "world",
                "podcast",
            ],
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            default: "",
        },

        fullContent: {
            type: [String],
            default: [],
        },

        mediaType: {
            type: String,
            enum: ["image", "video"],
            default: "image",
        },

        mediaUrl: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Article", articleSchema);