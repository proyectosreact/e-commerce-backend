const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');


router.post('/',categoryController.createCategory)
router.get('/', categoryController.queryCategory)
router.put('/update/:id', categoryController.updateCategoryId)
router.delete('/delete/:id', categoryController.deleteCategoryId)
      
router.get('/:id', categoryController.queryCategoryId)

module.exports = router;