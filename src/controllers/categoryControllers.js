<<<<<<< HEAD
const Category = require('../models/category');

const { validationResult } = require('express-validator');
const { json } = require('express');
=======
const Category=require('../models/category');
const {validationResult}=require('express-validator');

>>>>>>> c33a9d7a0fd1898be7ae68ca8af08ad14592b5ac

exports.createCategory = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
<<<<<<< HEAD

    const { category } = req.body.category;

    console.log(category.name);
    //validamos si existe en la base

    try {
        let categoryName = await Category.findOne({ name });
        if (categoryName) {
            return res.status(400).json({ msg: 'This category exist!' });
        }
        categoryName = new Category(req.body);
        await categoryName.save();
        res.status(200).json({ message: "inserted the category" })
    } catch (error) {
        console.log(error);
        res.status(400).send('there was a mistake');
    }
=======
 
    const {category} = req.body;
    console.log({ category });
    
    try {
        let categoryName = await Category.findOne({ category });

        if(categoryName){
            return res.status(400).json({msg: 'Category already exists'});
        }

        categoryName = new Category(req.body);
        await categoryName.save()

        res.json({status: true, msg: 'The category was inserted correctly'});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'There was a mistake'});
    }   
>>>>>>> c33a9d7a0fd1898be7ae68ca8af08ad14592b5ac
}

exports.queryCategory = async(req, res) => {
    Category.find({}, (err, categorys) => {
        if (err) {

            return res.status(500).send({ message: `Erro this pettition ${err}` })
        }
        if (!categorys) {
            return res.status(404).send({ message: `The categorys not exist ` })

        }
        res.status(200).send({ categorys })
    })
}



exports.queryCategoryId = async(req, res) => {
    let categoryId = req.params.IdCategory
    Category.findById(categoryId, (err, category) => {
        if (err) {

            return res.status(500).send({ message: `Erro this petition ${err}` })
        }
        if (!category) {
            return res.status(404).send({ message: `The category not exist ` })

        }
        res.send(200, { category })
    })
}
exports.updateCategoryId = async(req, res) => {
    let categoryId = req.params.IdCategory
    let update = req.body

    Category.findByIdAndUpdate(categoryId, update, (err, category) => {
        if (err) {

            return res.status(500).send({ message: `Erro on update category ${err}` })
        }

        res.send(200, { category })
    })
}

exports.deleteCategoryId = async(req, res) => {
    let categoryId = req.params.productId
    Category.findById(categoryId, (err, category) => {
        if (err) res.status(500).send({ message: `Error on delete Category${err}` })

        category.remove(err => {
            if (err) res.status(500).send({ message: 'Erro this delete category' })
            res.status(200).send({ message: 'This product has delete' })
        })
    })
}