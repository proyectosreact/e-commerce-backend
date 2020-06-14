const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryControllers');


router.get('/', (req, res) => {
    res.send('SubCategory');
});

router.delete('/:IdCategory',subCategoryController.deleteSubCategory);


module.exports=router;