const Category = require('../models/category');
const { ValidationResult } = require('express-validator');

exports.createProduct = async(req, res) => {

    const errors = ValidationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    let descriptionCategory = req.body.descriptionCategory;
    let descriptionProduct = req.body.descriptionProduct;
    console.log(descriptionCategory);
    console.log(descriptionProduct);

    // Buscamos si ya existe la categoría que vamos a enviar.
    try {
        let product = await Category.findOne({ descriptionProduct });

        if (product) {
            console.log('Producto existe', product);
            return res.status(400).json({
                msg: 'Product already exist'
            });
        }




    } catch (error) {
        console.log(error);
    }
}