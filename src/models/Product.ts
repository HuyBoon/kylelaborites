import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, },
    price: { type: String },
    linktobuy: { type: String },
    discount: { type: String },
    images: [{ type: String, required: true }],
    details: { type: String, required: true },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export const Product = models?.Product || model('Product', ProductSchema);
