import { body } from "express-validator";
import { applyValidations } from "../middlewares/apply-validations.js";

export const createMessageValidation = [
    body("name")
        .notEmpty()
        .withMessage("El campo { name } no debe estar vacio")
        .isString()
        .withMessage("El campo { name } debe ser un string"),
    body("email")
        .notEmpty()
        .withMessage("El campo { email } no debe estar vacio")
        .isEmail()
        .withMessage("El campo { email } debe ser un email valido"),
    body("phone")
        .optional()
        .isInt()
        .withMessage(
            "El campo { phone } debe ser un número entero entre 0 y 5",
        ),
    body("subject")
        .notEmpty()
        .withMessage("El campo { subject } no debe estar vacio")
        .isString()
        .withMessage("El campo { subject } debe ser un string"),
    body("message")
        .notEmpty()
        .withMessage("El campo { message } no debe estar vacio")
        .isString()
        .withMessage("El campo { message } debe ser un string"),
    applyValidations,
];

