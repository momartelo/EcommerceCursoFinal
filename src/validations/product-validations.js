import { body, header, param } from "express-validator";
import { isValidObjectId } from "mongoose";
import { applyValidations } from "../middlewares/apply-validations.js";

export const createProductValidation = [
    body("code")
        .notEmpty()
        .withMessage("El campo { codigo } no puede estar vacio")
        .isString()
        .withMessage("El campo { codigo } debe ser un string"),
    body("name")
        .notEmpty()
        .withMessage("El campo { name } no puede estar vacio")
        .isString()
        .withMessage("El campo { name } debe ser un string"),
    body("price")
        .notEmpty()
        .withMessage("El campo { price } no puede estar vacio")
        .isNumeric()
        .withMessage("El campo { price } debe ser un numero"),
    body("discountValue")
        .optional()
        .isNumeric()
        .withMessage("El campo { discountValue } debe ser un numero"),
    body("discountPercentage")
        .optional()
        .isNumeric()
        .withMessage(
            "El campo { discountPercentage } debe ser un numero",
        ),
    // body("discountExpiryDate")
    //     .optional()
    //     .isDate()
    //     .withMessage(
    //         "El campo { discountExpiryDate } debe ser una fecha",
    //     ),
    body("description")
        .notEmpty()
        .withMessage("El campo { description } no puede estar vacio")
        .isString()
        .withMessage("El campo { description } debe ser un string"),
    body("image")
        .notEmpty()
        .withMessage("El campo { image } no puede estar vacio")
        .isArray()
        .withMessage("El campo { image } debe ser un string")
        .isURL()
        .withMessage("El campo { image } debe ser una URL"),
    body("brand")
        .isString()
        .withMessage("El campo { brand } debe ser un string"),
    applyValidations,
];

export const getProductsValidation = [
    param("productId")
        .notEmpty()
        .withMessage("El campo { prductId } no debe estar vacion")
        .isString()
        .withMessage("El campo { productId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { productId } debe ser una id valida",
        ),
    applyValidations,
];

export const updateProductsValidation = [
    param("productId")
        .optional()
        // .notEmpty()
        // .withMessage("El campo { prductId } no debe estar vacion")
        .isString()
        .withMessage("El campo { productId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { postId } debe ser una id valida",
        ),
    body("code")
        .optional()
        // .notEmpty()
        // .withMessage("El campo { codigo } no puede estar vacio")
        .isString()
        .withMessage("El campo { codigo } debe ser un string"),
    body("name")
        .optional()
        // .notEmpty()
        // .withMessage("El campo { name } no puede estar vacio")
        .isString()
        .withMessage("El campo { name } debe ser un string"),
    body("price")
        .optional()
        // .notEmpty()
        // .withMessage("El campo { price } no puede estar vacio")
        .isNumeric()
        .withMessage("El campo { price } debe ser un numero"),
    body("discountValue")
        .optional()
        .isNumeric()
        .withMessage("El campo { discountValue } debe ser un numero"),
    body("discountPercentage")
        .optional()
        .isNumeric()
        .withMessage(
            "El campo { discountPercentage } debe ser un numero",
        ),
    // body("discountExpiryDate")
    //     .optional()
    //     .isDate()
    //     .withMessage(
    //         "El campo { discountExpiryDate } debe ser una fecha YYYY-MM-DD",
    //     ),
    body("description")
        .optional()
        // .notEmpty()
        // .withMessage("El campo { description } no puede estar vacio")
        .isString()
        .withMessage("El campo { description } debe ser un string"),
    body("image")
        .optional()
        // .notEmpty()
        // .withMessage("El campo { image } no puede estar vacio")
        .isArray()
        .withMessage("El campo { image } debe ser un string")
        .isURL()
        .withMessage("El campo { image } debe ser una URL"),
    body("brand")
        .optional()
        .isString()
        .withMessage("El campo { brand } debe ser un string"),
    applyValidations,
];

export const deleteProductsValidation = [
    param("productId")
        .notEmpty()
        .withMessage("El campo { prductId } no debe estar vacion")
        .isString()
        .withMessage("El campo { productId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { productId } debe ser una id valida",
        ),
    applyValidations,
];
