const express= require('express');
const router=express.Router();
const categoryController=require('../controllers/categoryControllers');
const {check}=require('express-validator');


router.post('/',categoryController.createCategory)

router.get('/:categoryId',[
    check('Id','it`s need Id of category').not().isEmpty()
],categoryController.queryCategory)
module.exports=router;