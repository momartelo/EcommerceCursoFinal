import mongoose from "mongoose";
import { MessageModel } from "../models/Message.js";

export const ctrlCreateMessage = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        const newMessage = new MessageModel({
            name,
            email,
            phone, // Optional
            subject,
            message,
        });

        await newMessage.save();
        res.status(201).json({
            message: "Mensaje creado exitosamente",
            data: newMessage,
        });
    } catch (error) {
        let errorMessage =
            "Error interno del servidor al crear el mensaje";
        if (error.name === "ValidationError") {
            errorMessage = "Error de validacion: " + error.message;
        } else {
            console.error(error);
        }
        res.status(500).json({ error: errorMessage });
    }
};
