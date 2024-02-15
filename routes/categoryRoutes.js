import express from 'express';
import { isAdmin, requireSignIn } from './../MiddleWare/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();
// requireSignIn, isAdmin,

// routes
// create category
router.post('/create-category', createCategoryController);

// update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// get all category
router.get('/get-category', categoryController);

// single category
router.get('/single-category/:slug', singleCategoryController);

// Delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;