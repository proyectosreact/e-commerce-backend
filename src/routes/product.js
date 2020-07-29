const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { check } = require('express-validator');
const {isAuth,isAdmin }= require('../middleware/auth');


// Usar las validaciones para la SubCategory y Product

router.post('/:id',[check('name', 'The name is required').not().isEmpty(),isAuth,isAdmin], productController.createProduct);
router.get('/list',[isAuth,isAdmin],productController.listProducts)
router.get('/find',productController.findProduct)

//router.put('/:IdCategory',productController.updateProductId)
//router.delete('/:IdCategory',productController.deleteProductId)

module.exports=router;