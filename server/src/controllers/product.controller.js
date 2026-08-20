import { Product } from "../models/product.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import apiResponse from "../utils/apiResponse.js";


const addProduct = asyncHandler(async (req, res) => {

    const parsedData = JSON.parse(req.body.inputData);

    const { name, description, originalPrice, discountPrice, size, stock, sku, hsn, tax, star, length, breadth, height, weight } = parsedData;

    // console.log(parsedData);


    if (!name || !name.trim())
        throw new apiError(400, "Product name is required");
    if (!description || !description.trim())
        throw new apiError(400, "Product description is required");
    if (!sku || !sku.trim())
        throw new apiError(400, "SKU is required");
    if (!hsn || !hsn.trim())
        throw new apiError(400, "HSN is required");
    if (tax === undefined)
        throw new apiError(400, "Tax is required");
    if (star === undefined)
        throw new apiError(400, "Star rating is required");
    if (length === undefined)
        throw new apiError(400, "Length is required");
    if (breadth === undefined)
        throw new apiError(400, "Breadth is required");
    if (height === undefined)
        throw new apiError(400, "Height is required");
    if (weight === undefined)
        throw new apiError(400, "Weight is required");



    let cloudinaryURLs;
    // console.log(req.files);

    if (req.files && req.files.length > 0) {
        const filesLocalPath = req.files?.map((file) => {
            return file.path;
        })
        // console.log("filesLocalPath",filesLocalPath);

        cloudinaryURLs = await uploadOnCloudinary(filesLocalPath);
        // console.log(cloudinaryURLs);

        if (!cloudinaryURLs || cloudinaryURLs.length === 0)
            throw new apiError(400, "Error while uploading image");
    }

    // const existingSkuProduct = await Product.findOne({
    //     $or: [
    //         { sku: sku.trim() },
    //         { "sizes.sku": sku.trim() }
    //     ]
    // });
    
    const existingSkuProduct = await Product.findOne({ "sizes.sku": sku.trim() });

    if (existingSkuProduct) {
        throw new apiError(
            409,
            `SKU ${sku} already exists`
        );
    }

    const existingProduct = await Product.findOne({
        name
    });

    if (existingProduct) {

        // ---------------------------------------------
        // Check if this product is size-based
        // ---------------------------------------------

        if (size) {

            // Check whether size already exists
            const existingSize = existingProduct.sizes.find(
                (item) => item.size === size
            );

            if (existingSize) {

                throw new apiError(
                    409,
                    `Size ${size} already exists for this product`
                );
            }


            // Add new size
            existingProduct.sizes.push({
                size,
                stock: Number(stock),
                sku
            });


            // Recalculate total stock
            existingProduct.stock =
                existingProduct.sizes.reduce(
                    (total, item) => total + Number(item.stock),
                    0
                );


            await existingProduct.save();


            const updatedProduct = await Product.findById(
                existingProduct._id
            ).select("-createdAt -updatedAt");


            return res.status(200).json(
                new apiResponse(
                    200,
                    `Size ${size} added successfully`,
                    updatedProduct
                )
            );
        }


        // ---------------------------------------------
        // Existing product but no size
        // ---------------------------------------------

        throw new apiError(
            409,
            "Product already exists"
        );
    }

    let product;

    if (size) {
        product = await Product.create({
            name,
            description,
            originalPrice: Number(originalPrice),
            discountPrice: Number(discountPrice),
            stock: Number(stock),
            sizes: [{ size, stock: Number(stock), sku }],
            images: cloudinaryURLs || [],
            hsn: Number(hsn),
            tax: Number(tax) / 100,
            star: Number(star),
            length: Number(length),
            breadth: Number(breadth),
            height: Number(height),
            weight: Number(weight)
        })
    }
    else {
        product = await Product.create({
            name,
            description,
            originalPrice: Number(originalPrice),
            discountPrice: Number(discountPrice),
            stock: Number(stock),
            images: cloudinaryURLs || [],
            sizes: [{ sku }],
            hsn: Number(hsn),
            tax: Number(tax) / 100,
            star: Number(star),
            length: Number(length),
            breadth: Number(breadth),
            height: Number(height),
            weight: Number(weight)
        })
    }

    const createdProduct = await Product.findById(product._id).select("-createdAt -updatedAt")

    if (!createdProduct)
        throw new apiError(400, "Product add failed");

    res
        .status(200)
        .json(
            new apiResponse(200, "Product added successfully", createdProduct)
        )

})

const removeProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId)
        throw new apiError(400, "Product id is required");

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct)
        throw new apiError(404, "Product not found");

    res
        .status(200)
        .json(
            new apiResponse(200, "Product deleted successfully")
        )
})

const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    if (!productId)
        throw new apiError(400, "Product id is required");
    // console.log("req.body", req.body);

    const parsedInputData = JSON.parse(req.body.inputData);

    const removedImages = JSON.parse(req.body.removedImages || "[]");

    const { name, description, originalPrice, discountPrice, stock, size, sku, hsn, tax, star, length, breadth, height, weight } = parsedInputData;
    // console.log(parsedInputData);

    // console.log("removedImages", removedImages);

    if (!name || !name.trim())
        throw new apiError(400, "Name is required");
    if (!description || !description.trim())
        throw new apiError(400, "Description is required");
    if (originalPrice === undefined)
        throw new apiError(400, "Original price is required");
    if (discountPrice === undefined)
        throw new apiError(400, "Discount Price is required");
    if (stock === undefined)
        throw new apiError(400, "Stock is required");
    if (!sku || !sku.trim())
        throw new apiError(400, "SKU is required");
    if (!hsn || !hsn.trim())
        throw new apiError(400, "HSN is required");
    if (tax === undefined)
        throw new apiError(400, "Tax is required");
    if (star === undefined)
        throw new apiError(400, "Star rating is required");
    if (length === undefined)
        throw new apiError(400, "Length is required");
    if (breadth === undefined)
        throw new apiError(400, "Breadth is required");
    if (height === undefined)
        throw new apiError(400, "Height is required");
    if (weight === undefined)
        throw new apiError(400, "Weight is required");

    let cloudinaryURLs = [];
    if (req?.files && req.files.length > 0) {
        const filesLocalPath = req.files.map((file) => {
            return file.path;
        })

        cloudinaryURLs = await uploadOnCloudinary(filesLocalPath)

        if (!cloudinaryURLs || cloudinaryURLs.length === 0)
            throw new apiError(400, "Error while uploading image");
    }

    if (removedImages && removedImages.length > 0) {
        let publicIDs = removedImages.map((image) => image.publicId)

        await Product.findByIdAndUpdate(
            productId,
            {
                $pull: {
                    images: {
                        publicId: { $in: publicIDs }
                    }
                }
            }
        )

        await deleteFromCloudinary(publicIDs);
    }

    if (cloudinaryURLs && cloudinaryURLs.length > 0) {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                $set: {
                    name,
                    description,
                    originalPrice,
                    discountPrice,
                    stock
                },
                $push: {
                    images: {
                        $each: cloudinaryURLs   // for maintain types
                    }
                }
            },
            {
                new: true
            }
        )

        if (!updatedProduct)
            throw new apiError(400, "Error while updating product")

        return res
            .status(200)
            .json(
                new apiResponse(200, "Product updated", updatedProduct)
            )
    }

    if (size) {
        const product = await Product.findById(productId);
        const isSizeExist = product.sizes.find((s) => s.size === size)
        if (isSizeExist) {
            await Product.findOneAndUpdate(
                { _id: productId, "sizes.size": size },
                {
                    $set: {
                        "sizes.$.stock": stock
                    }
                }
            )
            product.stock =
                product.sizes.reduce(
                    (total, item) => total + Number(item.stock),
                    0
                );


            await product.save();
        } else {

            const existingSkuProduct = await Product.findOne({ "sizes.sku": sku.trim() });

            if (existingSkuProduct) {
                throw new apiError(409, `SKU ${sku} already exists`);
            }

            await Product.findByIdAndUpdate(
                productId,
                {
                    $push: {
                        sizes: { size, stock, sku }
                    }
                }
            )
            product.stock =
                product.sizes.reduce(
                    (total, item) => total + Number(item.stock),
                    0
                );


            await product.save();
        }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                name,
                description,
                originalPrice,
                discountPrice,
                stock
            }
        },
        {
            new: true
        }
    ).select("-createdAt -updatedAt")

    if (!updatedProduct)
        throw new apiError(400, "Error while updating product")

    return res
        .status(200)
        .json(
            new apiResponse(200, "Product updated", updatedProduct)
        )
})

//get all products
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    if (!products)
        throw new apiError(404, "No products found");

    res
        .status(200)
        .json(
            new apiResponse(200, "Products fetched successfully", products)
        )
})

const getSingleProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId)
        throw new apiError(400, "Product id not found");

    const product = await Product.findById(productId);

    if (!product)
        throw new apiError(400, "Product not found");

    res
        .status(200)
        .json(
            new apiResponse(200, "Product fetched successfully", product)
        )
})

export {
    addProduct,
    removeProduct,
    updateProduct,
    getAllProducts,
    getSingleProduct
}