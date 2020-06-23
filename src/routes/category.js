const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const {
  check
} = require('express-validator');



router.post('/', categoryController.createCategory)



router.get('/', categoryController.queryCategory)
router.get('/IdCategory/', categoryController.queryCategoryId)

router.put('/', categoryController.updateCategoryId)
router.delete('/', categoryController.deleteCategoryId)

module.exports = router;