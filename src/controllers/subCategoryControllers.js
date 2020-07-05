const Category = require("../models/category");
const { validationResult } = require("express-validator");
const { Mongoose, isValidObjectId } = require("mongoose");
const { update } = require("../models/category");


exports.createSubCategory = async(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()} );
    }
    
    variablenw = false;
    const {subCategory} = req.body; 
    try{
        let nwsub = await Category.findById({_id : req.params.id})
        nwsub.subCategorys.forEach(subCategory => {
            if (subCategory.subCategory === req.body.subCategory) { variablenw = true }
        })
        //console.log(variablenw)
        if (variablenw === false) {
            let nw = await Category.findByIdAndUpdate(
                
                {_id : req.params.id},
                {$push:{'subCategorys':{subCategory}}}

            )
            res.status(200).json({
                msg: `The subcategory ${req.body.subCategory} was inserted succesfully `
            })
        }
    }catch(err){
            res.status(400).json({msg: `The subcategory ${subCategory} could not be inserted correctly` })
    }
}
    
exports.showSc = async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }    

    let showSc = await Category.find( {}, {_id:false, subCategorys: true})
    let docTotal = await Category.countDocuments()
    res.status(200).json({status : true, showSc, docTotal})


}

exports.showScId = async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {subCategory, id} = req.body

    try{
        if (id != null ) {
            let showSub = await Category.find({
                subCategorys : { $elemMatch : { _id : id }}
            },
            {
               _id : false, subCategorys : {
                $elemMatch : { _id : id }}
            });
            
            if( showSub ){                
                
                return res.status(200).json({ mgs: `The requested Subcategory is: ${subCategory}`, showSub });
            }
                

        }
        
        let showSub = await Category.find({
            subCategorys : { $elemMatch : { subCategory : subCategory }}
        },
        {
             _id : false, subCategorys : {
                 $elemMatch : { subCategory : subCategory }}
        });

        console.log({'showSc.subCategorys' : subCategory})
        

        if (showSc) {

            return res.status(200).json({ mgs: `The requested Subcategory is: ${subCategory}`, showSub});
                      
        }
            //return res.status(400).json({ msg: `The ${subCategory} Subcategory does not exist, please check and ask again `});
        
        
    }catch(err){
        return res.status(400).json({ msg: `The Subcategory does not exist, please check and ask again ${err}`})
    }
}
exports.updateSc = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { subCategory } = req.body

    try{
        if (id != null ) {
            let updateSub = await Category.updateOne({
                subCategorys : { $elemMatch : { _id : req.params.id }}
            },
            {
                $addToSet:{"subCategorys.$.subCategory": subCategory}
            })            
            let showNewSc = await Category.findOne({
                subCategorys : { $elemMatch : { _id : req.params.id }}
            },
            {
                subCategorys : { $elemMatch : { _id : req.params.id }}
            })
            res.status(200).json({ msg: `The update was successful`, showNewSc})
        }    
        
    }catch(err){
        return res.status(400).json({ msg: `The Subcategory does not exist, please check and ask again ${err}`})
    }


}
exports.deleteSc = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const { id } = req.params
    const { subCategory } = req.body
    variablenw = false

    try{
        if (id != null ) {
            let updateSub = await Category.findOne({

                'subCategorys._id': id

            },{_id: false,category: false, 'subCategorys.products': false, 'subCategorys._id': false} ) 
            
            console.log(updateSub.subCategorys)

            updateSub.subCategorys.forEach(subCategory =>{

                console.log(subCategory.subCategory)
                if (updateSub.subCategorys === subCategory.subCategory) { variablenw = true }                
                console.log(variablenw)
            })

            

            //let deleteSc = await Category.
            
            res.status(200).json({ msg: `The update was successful`, updateSub})
        }    
        
    }catch(err){
        return res.status(400).json({ msg: `The Subcategory does not exist, please check and ask again ${err}`})
    }
}
