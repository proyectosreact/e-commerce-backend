const Category=require('../models/category');
const {validationResult}=require('express-validator');

exports.createCategory=async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const {categoryName}=req.body;
    try{
        let category=await Category.findOne({categoryName});

        if(category){
            return res.status(400).json({
                msg: 'Category already exist'
            });
        }
        category=new Category(req.body);
        await category.save();

    }
    catch(error){
        console.log(error);
        res.status(400).send('there was a mistake');
    }
}