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
                return res.status(500).send({ message: "Name is required" });

            case !description:
                return res.status(500).send({ message: "description is required" });

            case !price:
                return res.status(500).send({ message: "price is required" });

            case !category:
                return res.status(500).send({ message: "category is required" });

            case !quantity:
                return res.status(500).send({ message: "Qunatity is required" });

            case photo && photo.size > 1000000:
                return res.status(500).send({ message: "Photo is required and should be less than 1mb" });


        }

        const products = await ProductModel.findOne({ ...req.fields, slug: slugify(name) });

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