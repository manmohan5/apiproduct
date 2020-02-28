/* eslint-disable no-console */
const express = require('express');

const {
  getPoductByCategoryRoutes,
  getProductDataRoutes,
  postProductRoutes,
  deleteProductByIDRoutes,
  getProductByBrandRoutes
} = require('../controller/product');

const router = express.Router();
router.use(express.json());

router.get('/', getProductDataRoutes);
router.get('/category/:category', getPoductByCategoryRoutes);
router.get('/brand/:product_brand', getProductByBrandRoutes);
router.post('/', postProductRoutes);
router.delete('/:product_id', deleteProductByIDRoutes);

module.exports = router;
