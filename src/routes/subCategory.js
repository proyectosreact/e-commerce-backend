const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryControllers');
const { isAuth, isAdmin } = require('../middleware/auth');



router.post('/:id',isAuth,isAdmin, subCategoryController.createSubCategory)
      .get('/', subCategoryController.showSc)
      .get('/:id', subCategoryController.showScId)
      .put('/:id',isAuth,isAdmin, subCategoryController.updateSc)
      .delete('/:id',isAuth,isAdmin, subCategoryController.deleteSc)
module.exports = router;

