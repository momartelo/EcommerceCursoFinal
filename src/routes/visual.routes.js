import { Router } from "express";
import { ctrlGetProduct } from "../controllers/product-controller.js";
import { ObjectId } from "mongoose";

const visualRouter = Router();

visualRouter.get("/", (req, res) => {
    res.render("index");
});

visualRouter.get("/count", (req, res) => {
    res.render("count");
});

visualRouter.get("/contact", (req, res) => {
    res.render("contact");
});

visualRouter.get("/wishlist", (req, res) => {
    res.render("wishlist");
});

visualRouter.get("/product/:productId", async (req, res) => {
    const idParams = new ObjectId(req.params.productId);
    console.log(idParams);
    try {
        // const product = await ctrlGetProduct(idParams, res);
        const product = await ctrlGetProduct(req, res);
        if (!product) {
            return res
                .status(404)
                .json({ error: "Producto no encontrado" });
        }
        res.render("product", { product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            error: "Error interno del servidor" + error.message,
        });
    }
});

export { visualRouter };
