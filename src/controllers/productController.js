const { validationResult } = require('express-validator');
const status = require('../config/config');
const Category = require('../models/category');
const mongooseTypes = require('mongoose').Types;
const { isValidObjectId, Mongoose } = require('mongoose');

exports.createProduct = async ( req, res ) => {
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()} );
  }
  
  try {

    const {idSubCategory, product} = req.body;
   
    const category = await Category.findOne({'subCategorys._id':idSubCategory,
                    'subCategorys.products.product':{'$ne':product.product}},{'subCategorys.$':1,_id:0});
    
    if(category){

      const findProduct = await Category.findOneAndUpdate(
        {'subCategorys._id':idSubCategory},
        {$push:{'subCategorys.$.products':product}}
      );  

      return res.status(200).json({code: status.OK, msg:"Producto creado satisfactoriamente", data: findProduct});

    }

    return res.status(404).json({ code: status.ERROR, msg:"No se pudo crear el producto"});
    
  } catch (error) {
    return res.status(500).json({ code: status.ERROR_SERVER, msg: 'There was a mistake' });
  }

}

exports.updateProduct = async ( req, res ) => {
  
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  try{
    
    const {id} = req.params;
    const idProduct = new mongooseTypes.ObjectId(id);

    const category = await Category.findOne({'subCategorys.products._id':id},{'subCategorys.$':1});

    let product=null;

    if(category){

      const idCategory = category._id;
      const idSubCategory = category.subCategorys[0]._id;
      console.log(idSubCategory);
      product = await Category.updateOne({"_id":new mongooseTypes.ObjectId(category._id)},
      {
        "$push": {
            "subCategorys.$[i].products.$[j]": req.body
        }
      },
      arrayFilters = [
          {
            "i._id": new mongooseTypes.ObjectId(idSubCategory),
            "j._id": new mongooseTypes.ObjectId(id)
          }
        ]
      );
    }

    /*const product = await Category.findOneAndUpdate({'subCategorys.products._id':idProduct},{
      "$set" : {
        'subCategorys.$.products.$':req.body
      }
    });*/

    console.log(product);

    res.status(200).json({category});

  }catch(error){

    console.log(error);

    res.status(500).json({msg:"problem"});

  }

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

exports.findProduct = async (req,res) => {

  const errors = validationResult(req);

  if ( !errors.isEmpty() ) {
    return res.status(400).json({ code: status.ERROR, message: errors.array() });
  }

  try{

    const {id} = req.params;
    const idProduct = new mongooseTypes.ObjectId(id);

    const product = await Category.aggregate([
      {
        $match:{
          'subCategorys.products._id':idProduct
        }
      },
      {
        $unwind: {
          'path': '$subCategorys'
        }
      },
      {
        $project: {
          'products':'$subCategorys.products',
          _id:0 
        } 
      },
      {
        $unwind: {
          'path': '$products'
        }
      },
      {
        $match: {
          'products._id': idProduct
        }
      }
    ]);

    if(product){

      res.status(202).json({code:status.OK,'data':product[0].products});

    }else{

      res.status(404).json({code:status.ERROR});

    }

  }catch(error){
    console.log(error);
    res.status(500).json({"code":status.ERROR_SERVER,"msg":"Server Error"});

  }

};

exports.listProductBySubCategory = async (req, res) => {

  const errors = validationResult(req);

  if ( !errors.isEmpty() ) {
    return res.status(400).json({ code: status.ERROR, message: errors.array() });
  }

  try{

    const {idSubCategory} = req.query; 

    const subCategory = await Category.findOne({'subCategorys._id':idSubCategory},{'subCategorys.$':1,_id:0});

    if(subCategory){

      res.status(200).json({'data':subCategory.subCategorys[0].products||[]});      

    }else{

      res.status(404).json({'code':status.ERROR,'data':[]});

    }

  }catch(error){
    res.status(500).json({"code":status.ERROR_SERVER,"msg":"Server Error"});
  }


};

