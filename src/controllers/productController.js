const { validationResult } = require('express-validator');
const status = require('../config/config');
const Category = require('../models/category');

exports.createProduct = async ( req, res ) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()} );
  }
  
  const { product } = req.body
  const { id } = req.params

  let pc = await Category.findOne({
    subCategorys : { $elemMatch : { products : { $elemMatch : {product: product}} }}
  },
  {
     _id : false, 'subCategorys.products.product': true
  });

  console.log(pc.subCategorys)


  /*let findSc = await Category.findOne({'subCategorys._id' : id},{_id : false ,'subCategorys.$':true})
  console.log(pc)*/


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

  
}