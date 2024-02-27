import express from 'express';
import { isAdmin, requireSignIn } from './../MiddleWare/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productPhotoController, productlistController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// get all products
router.get('/get-product', getProductController);

// single product 
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);

// delete product controller
router.delete('/delete-product/:pid', deleteProductController);

// update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// filterProduct
router.post('/product-filters', productFilterController);

// product count
router.get('/product-count', productCountController);

// product per page
router.get('/product-list/:page', productlistController);

// serch product router 
router.get('/search/:keyword', searchProductController);

// similar products
router.get('/related-product/:pid/:cid', relatedProductController);

// category wise product router 
router.get('/product-category/:slug', productCategoryController);

export default router;