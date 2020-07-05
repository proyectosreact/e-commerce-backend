const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryControllers');

const {
  check
} = require('express-validator');



router.post('/:id', subCategoryController.createSubCategory)
      .get('/', subCategoryController.showSc)
      .get('/showSc', subCategoryController.showScId)
      .put('/:id', subCategoryController.updateSc)
      .delete('/:id', subCategoryController.deleteSc)
module.exports = router;

