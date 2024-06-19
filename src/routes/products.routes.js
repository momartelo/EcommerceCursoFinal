import { Router } from "express";
import {
    ctrlClearWishlist,
    ctrlCreateProduct,
    ctrlDeleteProduct,
    ctrlGetProduct,
    ctrlListAllProducts,
    ctrlListWishlistProducts,
    ctrlUpdateProduct,
} from "../controllers/product-controller.js";
import { validateToken } from "../middlewares/validate-token.js";
import { authHeader } from "../validations/auth-validation.js";
import {
    createProductValidation,
    deleteProductsValidation,
    getProductsValidation,
    updateProductsValidation,
} from "../validations/product-validations.js";

const productRouter = Router();

productRouter.get(
    "/",

    ctrlListAllProducts,
);
productRouter.post(
    "/new",
    authHeader,
    validateToken,
    createProductValidation,
    ctrlCreateProduct,
);

productRouter.get(
    "/:productId",
    getProductsValidation,
    ctrlGetProduct,
);
productRouter.patch(
    "/:productId",
    authHeader,
    validateToken,
    updateProductsValidation,
    ctrlUpdateProduct,
);
productRouter.delete(
    "/:productId",
    authHeader,
    validateToken,
    deleteProductsValidation,
    ctrlDeleteProduct,
);

productRouter.get("/wishlist", ctrlListWishlistProducts);
productRouter.post("/wishlist/clear", ctrlClearWishlist);

export { productRouter };
