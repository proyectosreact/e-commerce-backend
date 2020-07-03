const Category = require("../models/category");
const { validationResult } = require("express-validator");



exports.createSubCategory = async(req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        variablenw = false;
        const {subCategory} = req.body; 
        
        let nwsub = await Category.findById({_id : req.params.id})

        nwsub.subCategorys.forEach(subCategory => {
            if (subCategory.subCategory === req.body.subCategory) { variablenw = true }
        })
        
        console.log(variablenw)
        
        if (variablenw === false) {
            
            let nw = await Category.findByIdAndUpdate(
                {_id : req.params.id},{$push:{'subCategorys':{subCategory}}}
            )
            res.json({msg:'ok'})
        }
        
        
        
        
        
    }
    
exports.querySubCategoryByIdCategory = async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
}

