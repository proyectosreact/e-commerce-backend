const Category = require('../models/category');
const {validationResult} = require('express-validator');

exports.cretaSubcategory = async ( req, res ) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    };

    console.log(req.body)
    const {subCategory, name} = req.body;

}