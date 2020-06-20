const Category = require('../models/category');
const {validationResult} = require('express-validator');

exports.cretaSubcategory = async ( req, res ) =>{

    const errors = validationResult(req);


    let categoryId = req.params.IdCategory;
    await Category.findById(categoryId, (err, category) => {
        if (err) { return res.status(500).send({ message: `Erro this petition ${err}` }) }
        if (!category) { return res.status(404).send({ message: `The category not exist ` })  }
        
        let { subCategory } = req.body;
        Category.find(subCategory, (err, SubCateg) => {

        }) 
        .then( res.status(404).send({message: `The subcategory already exist `}) )
        .catch(
            res.send(200, { SubCateg })
        )
        
    })




    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    };

    console.log(req.body)
    const {subCategory, name} = req.body;

}


exports.querySubCategory = (req, res) => {
    let subCategory= Category.find();
    if(!subCategory) {
        return res.send("No se encontraron");
    }
    return res.subCategory;
}


exports.deleteSubCategory = async(req,res) => {
    let subCategory=req.params.subCategory;
    Category.findByIdAndDelete(subCategory,(err,subCategory) => {
         if(err) res.status(500).send({message:`Error on delete subCategory${err}`});
    });
}
