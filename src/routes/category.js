const express= require('express');
const router=express.Router();
const categoryController=require('../controllers/categoryControllers');
const {check}=require('express-validator');



router.post('/',categoryController.createCategory)



router.get('/',categoryController.queryCategory)
router.get('/:IdCategory',categoryController.queryCategoryId)

router.put('/:IdCategory',categoryController.updateCategoryId)
router.delete('/:IdCategory',categoryController.deleteCategoryId)

module.exports=router;