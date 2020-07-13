const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { check } = require('express-validator');

// Usar las validaciones para la SubCategory y Product

//router.post('/',[check('name', 'The name is required')], productController.createProduct);
router.post('/',[
    check('idCategory', 'The idCategory is required').not().isEmpty(),
    check('idSubCategory', 'The idSubCategory is required').not().isEmpty(),
    check('product', 'The product is required').not().isEmpty(),
    check('product.price', 'The price is required').not().isEmpty()
],
productController.createProduct);


//router.get('/list',productController.listProducts);
router.get('/list',productController.listProductsByCategoriesAndSubsCategories);
router.delete('/:id',productController.deleteProduct);

//router.put('/:IdCategory',productController.updateProduct)
//router.delete('/:IdCategory',productController.deleteProductId)

module.exports=router;