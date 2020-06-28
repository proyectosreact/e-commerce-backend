const Category = require('../models/category');
const {
    validationResult
} = require('express-validator');


exports.createCategory = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        category
    } = req.body;


    try {
        let categoryName = await Category.findOne({
            category
        });

        if (categoryName) {
            return res.status(400).json({
                msg: 'Category already exists'
            });
        }

        categoryName = new Category(req.body);
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
    Category.find({}, (err, categorys) => {
        if (err) {

            return res.status(500).json({
                message: `Erro this petition ${err}`
            })
        }
        if (!categorys) {
            return res.status(404).json({
                message: `The categorys not exist `
            })

        }
        res.status(200).json({
            categorys
        })
    })
}
exports.queryCategoryId = async(req, res) => {
    let categoryId = req.query.IdCategory
    console.log(categoryId)
    Category.findById(categoryId, (err, category) => {
        if (err) {

            return res.status(500).json({
                message: `Erro this petition ${err}`
            })
        }
        if (!category) {
            return res.status(404).json({
                message: `The category not exist `
            })

        }
        res.status(200).json({
            category
        })
    })
}
exports.updateCategoryId = async(req, res) => {
    let categoryId = req.query.IdCategory
    let update = req.body

    Category.findByIdAndUpdate(categoryId, update, (err, category) => {
        if (err) {

            return res.status(500).json({
                message: `Erro on update category ${err}`
            })
        }

        res.status(200).json({
            category
        })
    })
}
exports.deleteCategoryId = async(req, res) => {
    let categoryId = req.query.IdCategory
    Category.findById(categoryId, (err, category) => {
        if (err) res.status(500).json({
            message: `Error on delete Category${err}`
        })

        category.remove(err => {
            if (err) res.status(500).send({
                message: 'Erro this delete category'
            })
            res.status(200).json({
                message: 'This product has delete'
            })
        })
    })
}