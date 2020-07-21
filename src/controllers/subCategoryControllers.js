const Category = require("../models/category");
const { validationResult } = require("express-validator");


exports.createSubCategory = async(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()} );
    }
    
    variablenw = false;
    const {subCategory} = req.body; 
    try{
        let showSub = await Category.find({
            subCategorys : { $elemMatch : { subCategory : subCategory }}
        },
        {
             _id : false, subCategorys : {
                 $elemMatch : { subCategory : subCategory }}
        });
        if(showSub != null){

            let nwsub = await Category.findById({_id : req.params.id})
        nwsub.subCategorys.forEach(subCategory => {
            if (subCategory.subCategory === req.body.subCategory) {
                variablenw = true 
            }
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
        }else{
        res.json({msg:`The subcategory ${subCategory} is exists`})
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

    let data = await Category.find( {}, {_id:false, subCategorys:true})
    let docTotal = await Category.countDocuments()
    res.status(200).json({status : true, data, docTotal})


}
exports.showScId = async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { subCategory } = req.body
    const {id} = req.params

    try{
        if (id != null ) {
            let data = await Category.find({
                subCategorys : { $elemMatch : { _id : id , 'subCategory' : subCategory}}
            },
            {
               _id : false, 'subCategorys.subCategory': true, 
            });
            
            console.log(data);

            if( data ){                
                
                return res.status(200).json({ mgs: `The requested Subcategory is: ${subCategory}`, data });
            }
                

        }
        
        let data = await Category.find({
            subCategorys : { $elemMatch : { subCategory : subCategory }}
        },
        {
             _id : false, subCategorys : {
                 $elemMatch : { subCategory : subCategory }}
        });

        console.log({'showSc.subCategorys' : subCategory})
        

        if (data) {

            return res.status(200).json({ mgs: `The requested Subcategory is: ${subCategory}`, data});
                      
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

            let updateSc = await Category.findOneAndUpdate({
                subCategorys:{$elemMatch: {_id: id}}
            },
            {'subCategorys.$.subCategory': subCategory},{'subCategory.subCategory': true})
            
            console.log(updateSc)           
            let data = await Category.findOne({
                subCategorys : { $elemMatch : { _id : req.params.id }}
            },
            {
                subCategorys : { $elemMatch : { _id : req.params.id }}
            })
            res.status(200).json({ msg: `The update was successfull`, data})
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

    try{
        if (id != null ) {
            
            let data = await Category.findOne({'subCategorys._id' : id})
            
            console.log(deleteSc)
            
            res.status(200).json({ msg: `The delete was successful`, data})
        }    
        
    }catch(err){
        return res.status(400).json({ msg: `The Subcategory does not exist, please check and ask again ${err}`})
    }
}
