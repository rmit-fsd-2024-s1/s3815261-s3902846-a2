const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// get all products
router.get('/', productController.getAllProducts);

module.exports = router;
