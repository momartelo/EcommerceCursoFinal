import { Router } from "express";
import { ctrlCreateComment, ctrlDeleteComment, ctrlGetComments, ctrlListAllComments, ctrlUpdateComment } from "../controllers/comment-controller.js";
import { validateToken } from "../middlewares/validate-token.js";
import { authHeader } from "../validations/auth-validation.js";
import { createCommentValidation, deleteCommentValidation, getCommentsValidation, listAllCommentsValidation, updateCommentValidation } from "../validations/comments-validation.js";



const commentRouter = Router();

commentRouter.get("/:productId", listAllCommentsValidation ,ctrlListAllComments)
commentRouter.post("/:productId", authHeader, validateToken ,createCommentValidation ,ctrlCreateComment)

commentRouter.get("/:productId/:commentId", getCommentsValidation ,ctrlGetComments)
commentRouter.patch("/:productId/:commentId", authHeader, validateToken ,updateCommentValidation ,ctrlUpdateComment)
commentRouter.delete("/:productId/:commentId", authHeader, validateToken ,deleteCommentValidation ,ctrlDeleteComment)

export { commentRouter };