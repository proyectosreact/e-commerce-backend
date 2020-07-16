const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { check } = require('express-validator');

// Usar las validaciones para la SubCategory y Product

//router.post('/',[check('name', 'The name is required')], productController.createProduct);
router.post('/',[
    /*check('id_subCategory', 'The idSubCategory is required').not().isEmpty(),
    check('product', 'The product is required').not().isEmpty()*/
],
productController.createProduct);


//router.get('/list',productController.listProducts);
/*router.get('/list',productController.listProductsByCategoriesAndSubsCategories);*/
router.get('/list',productController.listProductBySubCategory);
router.get('',productController.findProduct);
router.delete('/:id',productController.deleteProduct);
router.put('/:id',productController.updateProduct);

//router.delete('/:IdCategory',productController.deleteProductId)

module.exports=router;