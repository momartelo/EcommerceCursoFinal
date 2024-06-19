import { Router } from "express";
import { crtlLoginUser, crtlCreaterUser } from "../controllers/user-controller.js";
import { createUserValidations, loginUserValidations } from "../validations/user-validations.js";


const authRouter = Router();

authRouter.post("/login", loginUserValidations ,crtlLoginUser);
authRouter.post("/register", createUserValidations ,crtlCreaterUser);

export { authRouter };