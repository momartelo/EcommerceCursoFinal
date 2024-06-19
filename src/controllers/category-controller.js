import mongoose from "mongoose";
import { CategoryModel } from "../models/Categories.js";

export const ctrlCreateCategory = async (req, res) => {
    const UserId = req.user._id;
    try {
        const { title } = req.body;

        const existingCategory = await CategoryModel.findOne({
            title,
        });
        if (existingCategory) {
            return res.status(400).json({
                error: "No se pudo crear la categoría",
                details: "El título de la categoría ya existe",
            });
        }

        const category = new CategoryModel({
            title,
            author: UserId,
        });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({
            error: "No se pudo crear la categoria",
            details: error.message,
        });
    }
};

export const ctrlListAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find().populate(
            "author",
            ["username", "avatar"],
        );

        if (!categories) {
            return res
                .status(400)
                .json({ error: "No hay ninguna categoria creada" });
        }

        res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlUpdateCategories = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await CategoryModel.findOne({
            _id: categoryId,
        });
        if (!category) {
            return res
                .status(400)
                .json({ error: "No existe la categoria" });
        }

        category.set(req.body);
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "No se pudo modificar la categoria" });
    }
};

export const ctrlDeleteCategories = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await CategoryModel.findOneAndDelete({
            _id: categoryId,
        });
        if (!category) {
            return res
                .status(400)
                .json({ error: "No existe la categoria" });
        }
        res.status(200).json(category);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "No se pudo borrar la categoria" });
    }
};
