const Category = require('../models/category');

const { validationResult } = require('express-validator');


// Create a new Category
exports.createCategory = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { category } = req.body;
    console.log({ category });

    try {

        let categoryName = await Category.findOne({ category });

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
        res.status(400).json({ msg: `There was an error: ${error}` });
    }
}

// List all the Categories and SubCategory
exports.queryCategory = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Request to get all Categories in the database and list the category and subCategory name.
        let category = await Category.find({}, { _id: false, category: true, subCategory: true });

        return res.json({
            status: true,
            category
        });
    } catch (error) {
        return res.status(400).json({
            msg: `There was an error processing the request: ${error}`
        });
    }
}

// List an specific Category
exports.queryCategoryId = async(req, res) => {

    // Verify that we do not have errors.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        // Parameter that we receive in the request.
        let { id } = req.query;

        let category = await Category.findOne({ category: id }, { category: true, _id: false });

        if (category) {
            return res.json({
                msg: 'ok',
                category
            });
        }

        return res.status(400).json({
            msg: `Category does not exist`
        });


    } catch (error) {
        return res.status(400).json({
            msg: `There was an error processing the request: ${error}`
        });
    }
}

// Yamil
// Pasar esto a ASYNC, AWAIT
exports.updateCategoryId = async(req, res) => {
    // Verify that we do not have errors.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // If the record exist
        let { id } = req.query;

        let category = await Category.findOne({ category: id }, { category: true, _id: false });

        if (category) {
            return res.json({
                msg: 'ok',
                category
            });
        }

        let categoryUpdate = await Category.findByIdAndUpdate(category);
        if (categoryUpdate) {
            return res.status(200).json({
                msg: `Category ${categoryUpdate.category} updated`
            });
        }
    } catch (err) {
        return res.status(400).json({
            msg: `An error ocurred trying to update the Category`
        });
    }

    // let categoryId = req.query.IdCategory
    // let update = req.body

    // Category.findByIdAndUpdate(categoryId, update, (err, category) => {
    //     if (err) {

    //         return res.status(500).json({
    //             message: `Erro on update category ${err}`
    //         })
    //     }

    //     res.status(200).json({
    //         category
    //     })
    // })
}

// Enzo
// Pasar esto a ASYNC, AWAIT
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