const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { param, body } = require('express-validator');
const verifyErrors = require('../middlewares/validateFields');
const {validateIdMongoDb} = require('../helpers/validation');
const {isExistsSubCategory} = require('../middlewares/subCategory');

router.post('/',
    [
        body('product','El nombre del producto es requerido').not().isEmpty(),
        body('id_subCategory','El id_subCategory no es válido').custom(validateIdMongoDb),
        verifyErrors,
        isExistsSubCategory
    ],
    productController.createProduct
);

router.get('/list',productController.listProductBySubCategory);
router.get('',productController.findProduct);
router.delete('/:id',
    [
        param('id','El id no es válido').custom(validateIdMongoDb),
        verifyErrors
    ],
    productController.deleteProduct
);
router.put('/:id',
    [   
        body('product','El nombre del producto es requerido').not().isEmpty(),
        body('id_subCategory','El id de la subCategoría no es válido').custom(validateIdMongoDb),
        param('id','El id no es válido').custom(validateIdMongoDb),
        verifyErrors,
        isExistsSubCategory
    ],
    productController.updateProduct
);

module.exports=router;