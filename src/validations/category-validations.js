import { body, header, param } from "express-validator";
import { isValidObjectId } from "mongoose";
import { applyValidations } from "../middlewares/apply-validations.js";

export const createCategoryValidation = [
    body("title")
    .notEmpty()
    .withMessage("El campo { title } no puede estar vacio"),
    applyValidations,
];

export const listAllCategoriesValidation = [
    header("authorization").exists(),
    applyValidations,
]

export const updateCategoryValidation = [
    param("categoryId")
    .notEmpty()
    .withMessage("El camo { categoryId } no puede estar vacio")
    .isString()
    .withMessage("El campo { productId } debe ser un string")
    .custom(isValidObjectId)
    .withMessage("El parametro { postId } debe ser una id valida"),

    body("title")
    .notEmpty()
    .withMessage("El campo { title } no puede estar vacio"),
    applyValidations,
]

export const deleteCategoryValidation = [
    param("categoryId")
    .notEmpty()
    .withMessage("El camo { categoryId } no puede estar vacio")
    .isString()
    .withMessage("El campo { productId } debe ser un string")
    .custom(isValidObjectId)
    .withMessage("El parametro { postId } debe ser una id valida"),
    applyValidations,
]