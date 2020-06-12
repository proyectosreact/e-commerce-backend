const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const { check } = require('express-validator');

// Usar las validaciones para la SubCategory y Product

router.post('/', productController.createProduct);

router.get('/',productController.queryProduct)
router.get('/:IdCategory',productController.queryProductId)

router.put('/:IdCategory',productController.updateProductId)
router.delete('/:IdCategory',productController.deleteProductId)

module.exports=router;