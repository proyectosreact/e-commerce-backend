const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryControllers');



router.post('/:id', subCategoryController.createSubCategory)
      .get('/', subCategoryController.showSc)
      .get('/:id', subCategoryController.showScId)
      .put('/:id', subCategoryController.updateSc)
      .delete('/:id', subCategoryController.deleteSc)
module.exports = router;

