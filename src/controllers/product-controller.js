import mongoose from "mongoose";
import { ProductModel } from "../models/Product.js";
import { ObjectId } from "mongoose";

export const ctrlCreateProduct = async (req, res) => {
    const userId = req.user._id;
    try {
        const {
            code,
            name,
            price,
            finalPrice,
            discountValue,
            discountPercentage,
            discountExpiryDate,
            averageRating,
            newProduct,
            inWishlist,
            description,
            image,
            brand,
            sizes,
            colors,
        } = req.body;
        const product = new ProductModel({
            code,
            name,
            price,
            finalPrice,
            discountValue,
            discountPercentage,
            discountExpiryDate,
            description,
            image,
            averageRating,
            newProduct,
            inWishlist,
            brand,
            sizes,
            colors,
            author: userId,
        });

        const products = await ProductModel.findOne({
            code: product.code,
        });
        if (!products) {
            const newProduct = await product.save();
            const response = {
                message: "Producto creado exitosamente",
                product: newProduct,
            };
            res.status(201).json(product);
        } else {
            res.status(400).json({
                error: "Ya hay un producto con el codigo ingresado",
            });
        }
    } catch (error) {
        res.status(400).json({
            error: "No se pudo crear el producto",
            details: error.message,
        });
    }
};

export const ctrlListAllProducts = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;

        const category = req.query.category;

        const products = await ProductModel.find()
            .populate("author", ["username", "avatar"])
            .populate("comments", ["comment", "date"])
            .sort({ date: -1 })
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
            .where("category", "=", category);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlGetProduct = async (req, res) => {
    const { idParams } = req.params.productId;
    console.log("HOOOLLLAAAA");
    console.log(idParams);

    try {
        const objectId = new ObjectId(idParams);
        const products = await ProductModel.findById(objectId)
            .populate("author", ["username", "avatar"])
            .populate("comments", ["comment", "date"]);

        if (!products) {
            return res
                .status(404)
                .json({ error: "Producto no encontrado" });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlUpdateProduct = async (req, res) => {
    const userId = req.user._id.toString();
    console.log("UserId", userId);
    const { productId } = req.params;
    console.log("productId", productId);
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res
            .status(400)
            .json({ error: "Formato de ID de producto inválido" });
    }
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ error: "Formato de ID de usuario inválido" });
        }
        const product = await ProductModel.findOne({
            _id: productId,
            author: userId,
        });

        console.log(product);

        if (!product) {
            return res
                .status(404)
                .json({ error: "Producto no encontrado" });
        }
        product.set(req.body);

        const currentDate = new Date();
        if (
            product.discountExpiryDate &&
            product.discountExpiryDate > currentDate
        ) {
            if (product.discountValue) {
                product.finalPrice =
                    product.price - product.discountValue;
            } else if (product.discountPercentage) {
                product.finalPrice =
                    product.price -
                    product.price *
                        (product.discountPercentage / 100);
            } else {
                product.finalPrice = product.price;
            }
        } else {
            product.finalPrice = product.price;
        }

        const differenceDays =
            product.discountExpiryDate - currentDate;
        if (differenceDays > 0) {
            product.differenceDates = {
                dias: Math.floor(
                    differenceDays / (1000 * 60 * 60 * 24),
                ),
                horas: Math.floor(
                    (differenceDays / (1000 * 60 * 60)) % 24,
                ),
                minutos: Math.floor(
                    (differenceDays / (1000 * 60)) % 60,
                ),
                segundos: Math.floor((differenceDays / 1000) % 60),
            };
        }

        await product.save();
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlDeleteProduct = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        const product = await ProductModel.findOne({
            title: productId,
            author: userId,
        });
        if (!product) {
            return res
                .status(404)
                .json({ error: "Producto no encontrado" });
        }

        if (product.author !== userId) {
            return res.status(403).json({
                error: "No tienes permiso para eliminar este producto",
            });
        }

        await CommentModel.deleteMany({
            _id: { $in: product.comments },
        });

        await ProductModel.deleteOne({
            title: productId,
            author: userId,
        });

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
            details:
                "Error al borrar el post. Detalles del post:" +
                JSON.stringify(product),
        });
    }
};

//--------------------------------------------//

// Controlador para obtener productos en la lista de deseos
export const ctrlListWishlistProducts = async (req, res) => {
    console.log("HOLLLLAAAAA");
    try {
        const productsWishlist = await ProductModel.find({
            inWishlist: true,
        });
        res.json(productsWishlist);
        console.log(productsWishlist);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener la lista de deseos",
        });
    }
};

// Controlador para vaciar la lista de deseos
export const ctrlClearWishlist = async (req, res) => {
    try {
        await ProductModel.updateMany({}, { inWishlist: false });
        res.json({ message: "Lista de deseos vaciada" });
    } catch (error) {
        res.status(500).json({
            error: "Error al vaciar la lista de deseos",
        });
    }
};
