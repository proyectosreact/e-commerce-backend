const Category = require('../models/category');
const { validationResult } = require('express-validator');
const status = require('../config/config')


exports.createCategory = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { category } = req.body;
    //console.log(category)

    try {
        let categoryName = await Category.findOne({ category });

        if (categoryName) {
            return res.status(400).json({
                msg: 'Category already exists'
            });
        }

        categoryName = new Category({ category });
        await categoryName.save()

        res.json({
            status: true,
            msg: 'The category was inserted correctly'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'There was a mistake'
        });
    }
}
exports.queryCategory = async(req, res) => {
    
    // Verify that we do not have errors.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        // Request to get all Categories in the database and list the category and subCategory name.
        let data = await Category.find({});
        let countDoc = await Category.countDocuments();
        return res.json({
            code: status.OK,
            data,
            countDoc            
        });
    } catch (error) {
        return res.status(400).json({
            msg: `There was an error processing the request: ${error}`
        });
    }
}
exports.queryCategoryId = async(req, res) => {
   
   // Verify that we do not have errors.
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
   }
   try {
       // Parameter that we receive in the request.
       let { id } = req.params;
       console.log(id)
       let data = await Category.findOne({_id: req.params.id})
       console.log(data)
       if(!data){
           res.status(401).json('Category does not exist')
       }
       res.status(200).json({code: status.OK, data})
       


   } catch (error) {
       return res.json({ code: status.ERROR, message: 'Internal server Error' });
   }
}
exports.updateCategoryId = async(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {category} = req.body
    try{
    let categoryUpdate = await Category.findByIdAndUpdate(req.params.id, { category }, {new : true})
    if(categoryUpdate){
        return res.status(200).json({msg: `Category ${category} is updated`})
    }}catch(err){
        return res.status(400).json({msg: 'The requested operation could not be performed'})
    }   
}
exports.deleteCategoryId = async(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
  
    try{
        let categoryDelete = await Category.findByIdAndDelete(req.params.id)
        if(categoryDelete){
            return res.status(200).json({msg: `Category ${categoryDelete.category} is deleted`})
        }
    }catch(err){
        return res.status(400).json({msg: 'The requested operation could not be performed'})
    }
}