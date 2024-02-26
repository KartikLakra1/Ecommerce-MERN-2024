import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import fs from 'fs';

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });

            case !description:
                return res.status(500).send({ error: "description is required" });

            case !price:
                return res.status(500).send({ error: "price is required" });

            case !category:
                return res.status(500).send({ error: "category is required" });

            case !quantity:
                return res.status(500).send({ error: "Qunatity is required" });

            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is required and should be less than 1mb" });


        }

        const products = new ProductModel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }

        await products.save();

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product"
        })
    }
}


export const getProductController = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });

        res.status(201).send({
            success: true,
            totalcount: products.length,
            message: "All Products",

            products,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting all product"
        })
    }
}

export const getSingleProductController = async (req, res) => {
    try {

        const product = await ProductModel.findOne({ slug: req.params.slug }).select('-photo').populate('category')

        res.status(201).send({
            success: true,
            message: "Single Product fetched",

            product,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting product"
        })
    }
}


export const productPhotoController = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('Content-Type', product.photo.contentType)
            return res.status(200).send(
                product.photo.data
            )
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting photo"
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(201).send({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in deletion of product"
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });

            case !description:
                return res.status(500).send({ error: "description is required" });

            case !price:
                return res.status(500).send({ error: "price is required" });

            case !category:
                return res.status(500).send({ error: "category is required" });

            case !quantity:
                return res.status(500).send({ error: "Qunatity is required" });

            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is required and should be less than 1mb" });


        }

        const products = await ProductModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        }, {
            new: true
        })

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }

        await products.save();

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in product updation"
        })
    }
}


// filter controller
export const productFilterController = async (req, res) => {
    try {
        const { check, radio } = req.body;
        let args = {}
        if (check.length > 0) args.category = check
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

        const products = await ProductModel.find(args);

        res.status(201).send({
            success: true,
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while filtering products"
        })
    }
}

// count Product controller
export const productCountController = async (req, res) => {
    try {
        const total = await ProductModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error in product count"
        })
    }
}


// Product list based on page
export const productlistController = async (req, res) => {
    try {
        const perPage = 3
        const page = req.params.page ? req.params.page : 1
        const products = await ProductModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });

        res.status(201).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        message: "error in per page ctrl"
    }
}