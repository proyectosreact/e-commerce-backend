const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const { isAuth, isAdmin } = require('../middleware/auth');


router.post('/',isAuth,isAdmin,categoryController.createCategory)
router.get('/', categoryController.queryCategory)
router.put('/update/:id',isAuth,isAdmin, categoryController.updateCategoryId)
router.delete('/delete/:id',isAuth,isAdmin, categoryController.deleteCategoryId)
      
router.get('/IdCategory', categoryController.queryCategoryId)

module.exports = router;