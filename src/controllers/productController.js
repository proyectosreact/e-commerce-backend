
const Category=require('../models/category');
const {validationResult}=require('express-validator'); //Faltan hacer validaciones


exports.createProduct = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  let descriptionProduct = req.body.descriptionProduct

  console.log(descriptionCategory)
  console.log(descriptionProduct)
  try {
    let product = await Category.findOne({
      descriptionProduct
    })

    if (product) {
      console.log('This encontrad thi product', product)
      return res.status(400).json({
        msg: 'Product already exist'
      });
    }
    product = new Category()

    product.categoryName.subcategory.product.sku = req.body.sku
    product.categoryName.subcategory.product.description = req.body.descriptionProduct
    product.categoryName.subcategory.product.size = req.body.size
    product.descriptionCategory = req.body.descriptionCategory
    product.urlImage = req.body.urlImage

    await product.save((err, productStored) => {
      if (err) res.status(500).send({
        message: `this error of save ${err}`
      })

      res.status(200).send({
        product: productStored
      })
    })

  } catch (error) {
    console.log(error);
    res.status(400).send('there was a mistake');
  }
}

exports.queryProduct = async (req, res) => {
  Category.find({}, (err, products) => {
    if (err) {

      return res.status(500).send({
        message: `Erro this pettition ${err}`
      })
    }
    if (!products) {
      return res.status(404).send({
        message: `The categorys not exist `
      })

    }
    res.send(200, {
      products
=======
const { validationResult } = require('express-validator');

exports.createProduct = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    let descriptionProduct = req.body.descriptionProduct

    console.log(descriptionCategory)
    console.log(descriptionProduct)
    try {
        let product = await Category.findOne({ descriptionProduct })

        if (product) {
            console.log('This encontrad thi product', product)
            return res.status(400).json({ msg: 'Product already exist' });
        }
        product = new Category()

        product.categoryName.subcategory.product.sku = req.body.sku
        product.categoryName.subcategory.product.description = req.body.descriptionProduct
        product.categoryName.subcategory.product.size = req.body.size
        product.descriptionCategory = req.body.descriptionCategory
        product.urlImage = req.body.urlImage

        await product.save((err, productStored) => {
            if (err) res.status(500).send({ message: `this error of save ${err}` })

            res.status(200).send({ product: productStored })

        })

    } catch (error) {
        console.log(error);
        res.status(400).send('there was a mistake');
    }
}


exports.queryProduct = async(req, res) => {
    Category.find({}, (err, products) => {

        if (err) {

            return res.status(500).send({ message: `Erro this pettition ${err}` })
        }
        if (!products) {

            return res.status(404).send({ message: `The categorys not exist ` })

        }
        res.send(200, { products })
    })
  })
}


exports.queryProductId = async(req, res) => {
    let productId = req.params.IdProduct
    Category.findById(productId, (err, products) => {
        if (err) {

            return res.status(500).send({ message: `Erro this petition ${err}` })
        }
        if (!products) {
            return res.status(404).send({ message: `The category not exist ` })

        }
        res.send(200, { products })
    })
      return res.status(404).send({message: `The product not exist `})
        
    }
    res.send(200, {products})
})
}

exports.updateCategoryId = (req, res) => {        
        res.send('UpdateProduct');
}