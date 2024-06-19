import { body, header, param } from "express-validator";
import { isValidObjectId } from "mongoose";
import { applyValidations } from "../middlewares/apply-validations.js";

export const createCommentValidation = [
    param("productId")
        .notEmpty()
        .withMessage("El campo { producId } no debe estar vacio")
        .isString()
        .withMessage("El campo { producId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { productId } debe ser una id valida.",
        ),
    body("comment")
        .notEmpty()
        .withMessage("El campo { comment } no debe estar vacio")
        .isString()
        .withMessage("El campo { comment } debe ser un string"),
    body("rating")
        .notEmpty()
        .withMessage("El campo { rating } no debe estar vacio")
        .isInt({ min: 0, max: 5 })
        .withMessage(
            "El campo { rating } debe ser un número entero entre 0 y 5",
        ),
    applyValidations,
];

export const listAllCommentsValidation = [
    param("productId")
        .notEmpty()
        .withMessage("El campo { producId } no debe estar vacio")
        .isString()
        .withMessage("El campo { producId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { productId } debe ser una id valida.",
        ),
    applyValidations,
];

export const getCommentsValidation = [
    param("productId")
        .notEmpty()
        .withMessage("El campo { producId } no debe estar vacio")
        .isString()
        .withMessage("El campo { producId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { productId } debe ser una id valida.",
        ),
    param("commentId")
        .notEmpty()
        .withMessage("El campo { commentId } no debe estar vacio")
        .isString()
        .withMessage("El campo { commentId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { commentId } debe ser una id valida.",
        ),
    applyValidations,
];

export const updateCommentValidation = [
    param("productId")
        .notEmpty()
        .withMessage("El campo { producId } no debe estar vacio")
        .isString()
        .withMessage("El campo { producId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { productId } debe ser una id valida.",
        ),
    param("commentId")
        .notEmpty()
        .withMessage("El campo { commentId } no debe estar vacio")
        .isString()
        .withMessage("El campo { commentId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { commentId } debe ser una id valida.",
        ),
    body("comment")
        .optional()
        // .notEmpty().withMessage("El campo { comment } no debe estar vacio")
        .isString()
        .withMessage("El campo { comment } debe ser un string"),
    body("rating")
        .optional()
        // .notEmpty().withMessage("El campo { rating } no debe estar vacio")
        .isInt({ min: 0, max: 5 })
        .withMessage(
            "El campo { rating } debe ser un número entero entre 0 y 5",
        ),
    applyValidations,
];

export const deleteCommentValidation = [
    param("productId")
        .notEmpty()
        .withMessage("El campo { producId } no debe estar vacio")
        .isString()
        .withMessage("El campo { producId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { productId } debe ser una id valida.",
        ),
    param("commentId")
        .notEmpty()
        .withMessage("El campo { commentId } no debe estar vacio")
        .isString()
        .withMessage("El campo { commentId } debe ser un string")
        .custom(isValidObjectId)
        .withMessage(
            "El parametro { commentId } debe ser una id valida.",
        ),
    applyValidations,
];
