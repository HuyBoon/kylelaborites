import mongoose, { Schema, model, models } from 'mongoose';

const subcriberSchema = new Schema({
    name: { type: String },
    phone: { type: String },
    email: { type: String, required: true },
    message: { type: String },
});

export const Subcriber = models.Subcriber || model("Subcriber", subcriberSchema);
