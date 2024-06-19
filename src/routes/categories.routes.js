import { Router } from "express";
import { ctrlCreateCategory, ctrlDeleteCategories, ctrlListAllCategories, ctrlUpdateCategories } from "../controllers/category-controller.js";
import { validateToken } from "../middlewares/validate-token.js";
import { authHeader } from "../validations/auth-validation.js";
import { createCategoryValidation, deleteCategoryValidation, listAllCategoriesValidation, updateCategoryValidation } from "../validations/category-validations.js";



const categoryRouter = Router();

categoryRouter.get("/", listAllCategoriesValidation ,ctrlListAllCategories);
categoryRouter.post("/new", authHeader, validateToken ,createCategoryValidation ,ctrlCreateCategory);
categoryRouter.patch("/:categoryId", authHeader, validateToken ,updateCategoryValidation ,ctrlUpdateCategories);
categoryRouter.delete("/:categoryId", authHeader, validateToken ,deleteCategoryValidation ,ctrlDeleteCategories);

export { categoryRouter };