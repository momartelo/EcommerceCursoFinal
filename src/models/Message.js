import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // agrega createdAt y updatedAt
        versionKey: false,
    },
);

export const MessageModel = model("Message", MessageSchema);
