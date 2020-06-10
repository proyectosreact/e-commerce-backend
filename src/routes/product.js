const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Definir las rutas.

router.post('/', productController.createProduct);

router.get('/', productController.queryProduct);
router.get('/:IdProduct', productController.queryProductId);

router.put('/:IdProduct', productController.updateProductId);
router.delete('/:IdProduct', productController.deleteCategoryId);

module.exporst = router;