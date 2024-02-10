import categoryModels from "../models/categoryModels.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(401).send({
                message: "Name is required"
            })
        }

        const existingCategory = await categoryModels.findOne({ name });

        if (existingCategory) {
            return res.status(401).send({
                success: false,
                message: "Category already exists"
            })
        }

        const category = await new categoryModels({ name, slug: slugify(name) }).save();

        return res.status(201).send({
            success: true,
            message: "New category created",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModels.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        return res.status(201).send({
            success: true,
            message: "Category updated successfully",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in updation of category"
        })
    }
}

// get all categories
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModels.find({});
        res.status(201).send({
            success: true,
            message: "all categories list",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error while getting all categoires "
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModels.findOne({
            slug: req.params.slug
        })
        res.status(201).send({
            success: true,
            message: "get single category successfully",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error while getting single category "
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        const category = await categoryModels.findByIdAndDelete(id);

        res.status(201).send({
            success: true,
            message: "get single category successfully",
            category

        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error while deleting category "
        })
    }
}