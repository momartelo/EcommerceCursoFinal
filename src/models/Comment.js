import { model, Schema, Types } from "mongoose";

const CommentSchema = new Schema ({
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required:true,
        min:0,
        max:5,
    },
    product: {
        type: Types.ObjectId,
        ref: "Product",
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: false,
    versionKey: false,
    toJSON:{
        transform: function(req, res){
            res.date = new Date(res.date).toLocaleString();
            return res;
        },
    },
},
);

export const CommentModel = model("Comment", CommentSchema)

