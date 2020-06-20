const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryControllers');


router.get('/', (req, res) => {
    console.log("Entro a Subcategory");
    return "Entro a Subcategory"; //res.send('SubCategory');
});

router.get('/',subCategoryController.querySubCategory)
router.get('/:IdCategory',subCategoryController.querySubCategoryId)

router.put('/:IdCategory',subCategoryController.updateSubCategory)
router.delete('/:IdCategory',subCategoryController.deleteSubCategory);

module.exports=router;