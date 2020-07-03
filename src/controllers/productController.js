const Product = require('../models/product');
const { validationResult } = require('express-validator');
const status = require('../config/config');

exports.createProduct = async ( req, res ) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) {
    return res.status(400).json({ code: status.ERROR, message: errors.array() });
  }

  const { product } = req.body;

  try {
    let newProduct = await Product.findOne({product});

    if (newProduct) {
      return res.status(400).json({ code: status.ERROR, message: 'Product already exists.' });
    }

    newProduct = new Product(req.body);
    await newProduct.save();

    return res.json({ code: status.OK, message: 'The product was inserted correctly' });
    
  } catch (error) {
    return res.status(400).json({ code: status.ERROR, message: 'There was a mistake' });
  }

}

exports.findProduct = async ( req, res ) => {
  
}

exports.updateProduct = async ( req, res ) => {
  
}

exports.deleteProduct = async ( req, res ) => {
  
}

exports.listProducts = async ( req, res ) => {
  // check for mistakes.
  const errors = validationResult(req);

  if ( !errors.isEmpty() ) {
    return res.status(400).json({ code: status.ERROR, message: errors.array() });
  }

  try {
    const products = await Product.find();
    const total = await Product.countDocuments();

    return res.json({ code: status.OK, products, total });

  } catch (error) {
    return res.json({ code: status.ERROR, message: 'Internal server error' });
  }
}
