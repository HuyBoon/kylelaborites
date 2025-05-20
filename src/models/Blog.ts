import { model, models, Schema } from "mongoose";

const BlogSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        tags: { type: [String], default: [] },
        description: { type: String },
        thumbnail: { type: String, required: true },
        content: { type: String },
    },
    { timestamps: true }
);

export const Blog = models?.Blog || model("Blog", BlogSchema);
