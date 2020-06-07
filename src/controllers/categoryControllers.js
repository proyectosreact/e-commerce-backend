const Category=require('../models/category');
const {validationResult}=require('express-validator');

exports.createCategory=async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }
    const {sku,product_description,size,description,urlImage}=req.body;
    console.log(description)
    try{
        let category=await Category.findOne({description})

        if(description){
            return res.status(400).json({
                msg: 'Category already exist'
            });
        }
        category=new Category(req.body);
        await category.save()
        res.status(200).send('that saverd a category');

    }
    catch(error){
        console.log(error);
        res.status(400).send('there was a mistake');
    }
}

exports.queryCategory=async(req,res)=>{
    
}