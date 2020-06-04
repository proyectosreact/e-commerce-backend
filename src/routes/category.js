const express= require('express');
const router=express.Router();
const categoryController=require('../controllers/categoryControllers');
const {check}=require('express-validator');


router.post('/',[
    check('categoryname', 'The name of category is required').not().isEmpty(),
    check('description','The description is required').not().isEmpty()
],categoryController.createCategory)

module.exports=router;