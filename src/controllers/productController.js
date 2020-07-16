const status = require('../config/config');
const Category = require('../models/category');
const Product = require('../models/product');
const mongooseTypes = require('mongoose').Types;
const { isValidObjectId, Mongoose } = require('mongoose');
const {isArrayError} = require('../helpers/validation');
const cloudinary = require('cloudinary');
const {unlink} = require('fs-extra');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

exports.createProduct = async ( req, res) => {
  
  if(isArrayError(req, res)) return;

  try{

    const {product} = req.body;
    
    const productFind = await Product.findOne({'product':product});

    if(!productFind){

      const newProduct = new Product(req.body);
      
      const result = await cloudinary.v2.uploader.upload(req.file.path);

      await unlink(req.file.path);
      
      newProduct.uri = {
        public_id: result.public_id,
        path: result.url,//secure_url para https
        name: req.file.originalname
      };

      await newProduct.save();

      return res.status(201).json({code:status.OK,msg:'Product created',data:newProduct});

    }else{

      return res.status(404).json({code:status.ERROR,"msg":"The product exists"});

    }

  }catch(error){

    console.log(error);

    res.status(500).json({code:status.ERROR_SERVER,"msg":"Server Error"});

  }

};

exports.updateProduct = async ( req, res ) => {
  
  if(isArrayError(req, res)) return;

  try{

    const {id} = req.params;
    
    const product = await Product.findOneAndUpdate({'_id':id},{
      $set: req.body
    },{new:true});

    if(product){

      return res.status(200).json({code:status.OK,msg:'Product actualizado',data:product});

    }else{

      return res.status(404).json({code:status.ERROR,"msg":"El producto no existe"});

    }

  }catch(error){

    res.status(500).json({code:status.ERROR_SERVER,"msg":"Server Error"});

  }

}


//En pruebas
exports.deleteProduct = async ( req, res ) => {
  
  if(isArrayError(req, res)) return;

  try{

    const {id} = req.params;
    
    const product = await Product.findOneAndUpdate({'_id':id, 'enable':true},{
      $set: {
        'enable': false
      }
    },{new:true});
    
    if(product){

      return res.status(200).json({code:status.OK,msg:'Producto eliminado',data:product});

    }else{

      return res.status(404).json({code:status.ERROR,"msg":"El producto no existe o ya se encuentra inhabilitado"});

    }

  }catch(error){

    res.status(500).json({code:status.ERROR_SERVER,"msg":"Server Error"});

  }

}

exports.findProduct = async (req,res) => {

  if(isArrayError(req, res)) return;

  try{

    const {id} = req.query;

    let products = id ? await Product.find({_id:id}) : await Product.find();

    if(products){

      return res.status(200).json({code:status.OK,data:products});

    }else{

      return res.status(404).json({code:status.ERROR,data:[]});

    }

  }catch(error){

    console.log(error);

    res.status(500).json({"code":status.ERROR_SERVER,"msg":"Server Error"});

  }

};

exports.listProductBySubCategory = async (req, res) => {

  if(isArrayError(req, res)) return;

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

