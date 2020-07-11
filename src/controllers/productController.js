const Product = require('../models/product');
const { validationResult } = require('express-validator');
const status = require('../config/config');
const Category = require('../models/category');

exports.createProduct = async ( req, res ) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) {
    return res.status(400).json({ code: status.ERROR, message: errors.array() });
  }

  try {

    const {idCategory, idSubCategory, product} = req.body;
   
    const category = await Category.findOne({'_id':idCategory,'subCategorys._id':idSubCategory},{'subCategorys.$':1,_id:0});

    if(category){

      await Category.findOneAndUpdate(
        {'_id':idCategory,'subCategorys._id':idSubCategory},
        {$push:{'subCategorys.$.products':product}}
      )  

      return res.status(200).json({code: status.ERROR, msg:"Producto creado satisfactoriamente"});

    }

    return res.status(400).json({msg:"No se pudo crear el producto"});
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({ code: status.ERROR, msg: 'There was a mistake' });
  }

}

exports.findProduct = async ( req, res ) => {
  
}

exports.updateProduct = async ( req, res ) => {
  
}


//En pruebas
exports.deleteProduct = async ( req, res ) => {
  
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  try{

    //findByIdAndDelete
    /*const product = await Category.findOneAndDelete (
      {'subCategorys.products._id':req.param.id},
      {'subCategorys.products.$._id':req.param.id}
    );
      */

      console.log(req.params.id);
    
      const product = await Category.find({'subCategorys.products':{$elemMatch:{_id:req.params.id}}},
                                          {'subCategorys.products.$':1,_id:0});

    res.json(product);
    //console.log(subCategoria);

    

/*
    if(productDelete){
      return res.status(200).json({msg:`Product ${productDelete.product} is deleted`});
    }

    console.log("No se pudo eliminar");*/

  }catch(error){
    console.log(error);
    return res.status(400).json({msg:'The requested operation could not be performed'});
  }

}


exports.listProductsByCategoriesAndSubsCategories = async( req, res) => {

  const errors = validationResult(req);

  if ( !errors.isEmpty() ) {
    return res.status(400).json({ code: status.ERROR, message: errors.array() });
  }

  //console.log(req.query);
  const {idCategories,idSubCategory} = req.query;

  try {

    const products = await Category.findOne(
      {_id:idCategories,'subCategorys._id':idSubCategory},
      {_id:0,'subCategorys.$':1}
    );

    //const total = await Category.countDocuments();

    let productsItems = [],
        total = 0;

    if(products && products.subCategorys[0] && products.subCategorys[0].products){
      
      productsItems = products.subCategorys[0].products;
  
      total = productsItems.length;

    }
    
    return res.json({ code: status.OK, products: productsItems, total });
    
  } catch (error) {
    
    return res.json({ code: status.ERROR, message: 'Internal server error' });

  }

};