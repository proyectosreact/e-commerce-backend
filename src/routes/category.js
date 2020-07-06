const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const { check } = require('express-validator');



router.post('/',categoryController.createCategory)
      .get('/', categoryController.queryCategory)
router.put('/update/:id', categoryController.updateCategoryId)
router.delete('/delete/:id', categoryController.deleteCategoryId);
      
router.get('/IdCategory', categoryController.queryCategoryId)

module.exports = router;