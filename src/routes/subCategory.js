const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryControllers');

const {
  check
} = require('express-validator');

//Fucnciona correcftamente  al momento  ingresar una subcategori por medio del id de la categoria

router.post('/', subCategoryController.createSubCategory);

//Ruta de  consultar correctamente los subcategorias del
router.get('/:IdCategory', subCategoryController.querySubCategoryByIdCategory)
/*
router.get('/:IdCategory:subCategory', categoryController.queryCategoryId)

router.put('/:IdCategory:subCategory', categoryController.updateCategoryId)
router.delete('/:IdCategory:subcategory', categoryController.deleteCategoryId)*/

module.exports = router;

