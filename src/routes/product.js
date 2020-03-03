/* eslint-disable no-console */
const express = require('express');

const {
  getPoductCategoryRoutes,
  getProductDataRoutes,
  postProductRoutes,
  getProductBrandRoutes,
  getProductByBrandnameRoutes,
  getProductByCategorynameRoutes,
  getProductByCategoryTreeRoutes,
  getProductByNameRoutes
} = require('../controller/product');

const router = express.Router();
router.use(express.json());

router.get('/products', getProductDataRoutes);
router.get('/products/:product_name', getProductByNameRoutes);
router.get('/category', getPoductCategoryRoutes);
router.get('/brand', getProductBrandRoutes);
router.get('/brand/:brand_name', getProductByBrandnameRoutes);
router.get('/category/:category_name', getProductByCategorynameRoutes);
router.get(
  '/category/categorytree/:category_name',
  getProductByCategoryTreeRoutes
);
router.post('/products', postProductRoutes);

module.exports = router;
