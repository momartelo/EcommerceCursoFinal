import { Router } from "express";
import { ctrlCreateMessage } from "../controllers/message-controller.js";
import { createMessageValidation } from "../validations/message-validations.js";

const messageRouter = Router();

messageRouter.post("/", createMessageValidation, ctrlCreateMessage);

export { messageRouter };
