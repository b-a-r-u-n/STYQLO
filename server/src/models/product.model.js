import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        originalPrice: {
            type: Number,
            default: 0
        },
        discountPrice: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0,
            min: 0
        },
        sizes: [
            {
                size: {
                    type: String,
                    enum: ["S", "M", "L", "XL", "XXL"]
                },
                stock: {
                    type: Number,
                    default: 0,
                    min: 0
                },
                sku: {
                    type: String,
                    trim: true,
                    uppercase: true,
                },
            }
        ],
        images: [
            {
                url: {
                    type: String
                },
                publicId: {
                    type: String
                }
            }
        ],
        hsn: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            default: 0
        },
        star: {
            type: Number,
            default: 4.3
        },
        length: {
            type: Number,
            required: true
        },
        breadth: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

export const Product = mongoose.model("Product", productSchema)