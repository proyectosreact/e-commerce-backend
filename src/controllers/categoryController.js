const Category=require('../models/category');
const validationResult =require('express-validator');

exports.createCategory= async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
     res.status(600).json({errors:errors.array()})
    };

    const {categoryName,categoryDescription}= req.body;

}
