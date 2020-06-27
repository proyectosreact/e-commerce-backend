const Category = require('../models/category');
const { validationResult } = require('express-validator');

exports.cretaSubcategory = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    console.log(req.body)
    const { subCategory, name } = req.body;

}

// Crear Get para el SubCategory
// uyamil
exports.querySubCategory = async(req, res) => {
    Category.find({ name }, (err, subCategory) => {
        if (err) {
            return res.status(500).send({
                message: `Error with this petition ${err}`
            });
        }
        if (!subCategory) {
            return res.status(404).send({
                message: `The SubCategory does not exist`
            });
        } else {
            return res.status(200).send({
                subCategory
            });
        }
    });
}