import { Schema, model, Types } from "mongoose";

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const CategoryModel = model("Category", CategorySchema);
