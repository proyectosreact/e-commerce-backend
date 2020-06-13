const express= require('express');
const router=express.Router();
const categoryController=require('../controllers/categoryControllers');
const {check}=require('express-validator');


router.post('/',[
    check('name', 'The name is required').not().isEmpty()
],categoryController.createCategory)

router.get('/',categoryController.queryCategory)
router.get('/:IdCategory',categoryController.queryCategoryId)

router.put('/:IdCategory',categoryController.updateCategoryId)
router.delete('/:IdCategory',categoryController.deleteCategoryId)

module.exports=router;