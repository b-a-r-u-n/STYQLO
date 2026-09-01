import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "./models/product.model.js";
import createUniqueSlug from "./utils/createSlug.js";
import {dbName} from "./constant.js";


dotenv.config({
    path: ".env"
});

const generateProductSlugs = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        console.log("Connected to MongoDB");
console.log("Database:", mongoose.connection.name);
console.log("Host:", mongoose.connection.host);
console.log("Collection:", Product.collection.name);

        console.log("Connected to MongoDB");

        const product = await Product.find().select("_id name slug").lean();

        const products = await Product.find({
            $or: [
                { slug: { $exists: false } },
                { slug: null },
                { slug: "" }
            ]
        });

        console.log(products);
        

        console.log(`Products without slug: ${products.length}`);

        for (const product of products) {
            const slug = await createUniqueSlug(
                product.name,
                product._id
            );

            product.slug = slug;

            await product.save();

            console.log(`${product.name} → ${slug}`);
        }

        console.log("Slug migration completed");

        console.log(products);
        

        await mongoose.disconnect();

        process.exit(0);

    } catch (error) {
        console.error("Slug migration failed:", error);

        await mongoose.disconnect();

        process.exit(1);
    }
};

generateProductSlugs();