import { Product } from "../models/product.model.js";

const createSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

const createUniqueSlug = async (name, excludeProductId = null) => {
    const baseSlug = createSlug(name);

    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const query = { slug };

        if (excludeProductId) {
            query._id = { $ne: excludeProductId };
        }

        const existingProduct = await Product.findOne(query);

        if (!existingProduct) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
};

export default createUniqueSlug;