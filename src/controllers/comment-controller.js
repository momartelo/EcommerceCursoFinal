import mongoose from "mongoose";
import { CommentModel } from "../models/Comment.js";
import { ProductModel } from "../models/Product.js";

export const ctrlCreateComment = async(req, res) => {
    const { productId } = req.params;
    console.log(productId)
    const userId = req.user._id;
    console.log(userId)

    if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({ error: "Id de producto o usuario no valido" })
    }

    try {

        if (!req.body.comment){
            return res.status(400).json({ error: "El comentario no puede estar vacío" });
        }
        const newComment = new CommentModel ({
            comment: req.body.comment,
            rating: req.body.rating,
            product: productId,
            author: userId,
        });
        await newComment.save();
        await ProductModel.findByIdAndUpdate(productId, { $push: { comments: newComment._id } });
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor al crear el comentario", details: error.message });      
    }
}

export const ctrlListAllComments = async(req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const comment = await CommentModel.find({product: productId});
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({error: "No se pudo traer los comentarios"});  
    }
}

export const ctrlGetComments = async(req, res) => {
    const { productId, commentId } = req.params;
    const userId = req.user._id;

    try {
        const comment = await CommentModel.findOne({ _id: commentId, product: productId }).populate("product");
        if (!comment) return res.status(404).json({error: "El comentario no existe"})
        res.status(200).json(comment)        
    } catch (error) {
        res.status(500).json({ error: "No se pudo traer los comentarios", details: error.message });      
    }
}

export const ctrlUpdateComment = async(req, res) => {
    const { productId, commentId } = req.params;
    const userId = req.user._id;

    const commentAuthor = isCommentAuthor({commentId, userId});

    if(!commentAuthor) {
        return res.status(403).json({ error: "El usuario no es el autor del comentario" })
    }

    try {
        const comment = await CommentModel.findOne({ _id:commentId })
        if (!comment) {
            res.status(404).json({ error: "El comentario no existe" })
        }

        comment.set(req.body);
        await comment.save();
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({ error: "No se puede modificar comentario" })
    }
}


export const ctrlDeleteComment = async(req, res) => {
    const { productId, commentId } = req.params;
    const userId = req.user._id;

    const commentAuthor = isCommentAuthor({ commentId, userId });

    if(!commentAuthor) {
        return res.status(403).json({ error: "El usuario no esta autorizado para borrar este comentario" })
    }

    try {
        const deletedComment = await CommentModel.findOneAndDelete({ _id: commentId, product: productId });
        if (!deletedComment){
            return res.status(404).json({ error: "El comentario no existe o ya fue borrado anteriormente" });
        }
        
        await ProductModel.findOneAndUpdate({_id: productId}, {$pull: { comments: commentId }});+
        res.status(200).json({ message: "El comentario fue borrado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "No se puede borrar el comentario" })
    }
}

// export const isAuthor = async ({ productId, userId }) => {
//     try {
//         const product = await CommentModel.findOne({
//             _id: productId,
//             author: userId,
//         });
//         if (!product) {
//             return false;
//         }
//         return true;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// };




export const isCommentAuthor = async({ commentId, userId }) => {
    try {
        const comment = await CommentModel.findOne({ _id: commentId, author: userId });
        return !!comment;
    } catch (error) {
        return false        
    }
}