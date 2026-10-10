import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        articleId: {
            type: String,
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        text: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Comment",
    commentSchema
);