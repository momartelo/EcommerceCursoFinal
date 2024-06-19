import { Schema, model, Types } from "mongoose";

const ProductSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        finalPrice: {
            type: Number,
        },
        discountValue: {
            type: Number,
            default: 0,
        },
        discountPercentage: {
            type: Number,
            default: 0,
        },
        discountExpiryDate: {
            type: Date,
            required: function () {
                return (
                    this.discountValue > 0 ||
                    this.discountPercentage > 0
                );
            },
            validate: {
                validator: function (value) {
                    return (
                        this.discountValue > 0 ||
                        this.discountPercentage > 0
                    );
                },
                message:
                    "Si se establece una fecha de expiración, se debe aplicar un descuento (valor o porcentaje).",
            },
        },
        differenceDates: {
            dias: Number,
            horas: Number,
            minutos: Number,
            segundos: Number,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: [String],
            required: true,
        },
        brand: {
            type: String,
            default: "Generico",
        },
        sizes: {
            type: [String],
        },
        colors: {
            type: [String],
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        newProduct: {
            type: Boolean,
            default: true,
        },
        inWishlist: {
            type: Boolean,
            default: false,
        },
        author: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: [
            {
                type: Types.ObjectId,
                ref: "Category",
            },
        ],
        comments: [
            {
                type: Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        timestamps: true, // agrega createdAt y updatedAt
        versionKey: false,
    },
);

ProductSchema.pre("save", function (next) {
    const currentDate = new Date();
    console.log(currentDate);
    const differenceDays = this.discountExpiryDate - currentDate;
    console.log(differenceDays);
    console.log(this.discountExpiryDate);

    if (
        this.discountExpiryDate &&
        this.discountExpiryDate > currentDate
    ) {
        var segundos = Math.floor(differenceDays / 1000) % 60;
        var minutos = Math.floor(differenceDays / (1000 * 60)) % 60;
        var horas =
            Math.floor(differenceDays / (1000 * 60 * 60)) % 24;
        var dias = Math.floor(differenceDays / (1000 * 60 * 60 * 24));

        if (this.discountValue) {
            this.finalPrice = this.price - this.discountValue;
        } else if (this.discountPercentage) {
            this.finalPrice =
                this.price -
                this.price * (this.discountPercentage / 100);
        } else {
            this.finalPrice = this.price;
        }
        this.differenceDates.dias = dias;
        this.differenceDates.horas = horas;
        this.differenceDates.minutos = minutos;
        this.differenceDates.segundos = segundos;
    } else {
        this.finalPrice = this.price;
    }

    if (this.comments && this.comments.length > 0) {
        const totalRating = this.comments.reduce(
            (sum, comment) => sum + comment.rating,
            0,
        );
        this.averageRating = totalRating / this.comments.length;
    } else {
        this.averageRating = 0;
    }

    next();
});

export const ProductModel = model("Product", ProductSchema);
