const status = require('../config/config');
const Product = require('../models/product');
const cloudinary = require('cloudinary');
const { addImage, deleteImage } = require('../helpers/cloudinary');
const {unlink} = require('fs-extra');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

exports.createProduct = async ( req, res) => {

  try{

    const {product} = req.body;
    
    const productFind = await Product.findOne({'product':product});

    if(!productFind){
      
      const newProduct = new Product(req.body);

      let result;

      if(req.file){
        
        result = await addImage(req.file.path,cloudinary);

      }

      newProduct.uri = {
        public_id: result?result.public_id:'',
        path: result?result.url:'',//secure_url para https
        name: req.file?req.file.originalname:''
      };
      
      await newProduct.save();
      
      return res.status(201).json({code:status.OK,msg:'Producto creado',data:newProduct});

    }

    return res.status(404).json({code:status.ERROR,"msg":"El producto ya existe"});

  }catch(error){

    console.log(error);

    res.status(500).json({code:status.ERROR_SERVER,"msg":"Server Error"});

  }finally{
    if(req.file){
      await unlink(req.file.path);
    }
  }

};

exports.updateProduct = async ( req, res ) => {
  
  try{

    const {id} = req.params;
    
    const findProduct = await Product.findOne({'_id':id,'enable':true});

    if(findProduct){

      const findNameProduct = await Product.findOne(
          {
            _id: { $ne:id },
            product: req.body.product,
            enable: true
          }
      );

      if(findNameProduct){

        return res.status(404).json({code:status.ERROR,msg:"El nombre del producto ya existe"});

      }

      let newImage;
      
      if(findProduct.uri.public_id != ''){

        await deleteImage(findProduct.uri.public_id,cloudinary);
      
      }

      if(req.file){

        newImage = await addImage(req.file.path,cloudinary);

      }

      const attrs = {
        ...req.body,
        uri:{
          public_id: newImage?newImage.public_id:'',
          path: newImage?newImage.url:'',//secure_url para https
          name: req.file?req.file.originalname:''
        }
      };
      
      const product = await Product.findOneAndUpdate(
        {'_id':id},
        {$set: attrs},
        {new:true}
      );
  
      if(product){
  
        return res.status(200).json({code:status.OK,msg:'Producto actualizado',data:product});
  
      }

    }

    return res.status(404).json({code:status.ERROR,"msg":"No se pudo actualizar el producto"});

  }catch(error){
    console.log(error);
    res.status(500).json({code:status.ERROR_SERVER,"msg":"Server Error"});

  }finally{
    if(req.file){
      await unlink(req.file.path);
    }
  }

}


exports.deleteProduct = async ( req, res ) => {
  
  try{

    const {id} = req.params;
    
    const product = await Product.findOneAndUpdate({'_id':id, 'enable':true},{
      $set: {
        'enable': false,
        'uri': {
          'public_id': "",
          'path': "",
          'name': ""
        }
      }
    }/*,{new:true}*/);
    
    if(product){

      //si tiene una uri, la tenemos que eliminar...
      if(product.uri.public_id != ''){

        await deleteImage(product.uri.public_id, cloudinary);

        //console.log("Imagen eliminada de cloudinary");

      }

      return res.status(200).json({code:status.OK,msg:'Producto eliminado'});

    }else{

      return res.status(404).json({code:status.ERROR,"msg":"El producto no existe o ya se encuentra inhabilitado"});

    }

  }catch(error){
    //console.log(error)
    res.status(500).json({code:status.ERROR_SERVER,"msg":"Server Error"});

  }

}
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @description Si se le pasa un query param ?id=wdwdw
 * entonces buscará el producto con ese id, de lo contrario
 * nos devolverá todos los productos.
 */
exports.findProduct = async (req,res) => {

  try{

    const {id} = req.query;

    const products = id ? 
                  await Product.findOne({_id:id,enable:true}) : 
                  await Product.find({enable:true});

    if(products){

      return res.status(200).json({code:status.OK,data:products});

    }else{

      return res.status(404).json({code:status.ERROR,msg:"No se encontraron productos",data:[]});

    }

  }catch(error){

    console.log(error);

    res.status(500).json({"code":status.ERROR_SERVER,"msg":"Server Error"});

  }

};

exports.listProductBySubCategory = async (req, res) => {

  try{

    const {idSubCategory} = req.query; 

    const subCategory = await Product.find({'id_subCategory':idSubCategory});
    
    if(subCategory){

      res.status(200).json({'code':status.OK,'data':subCategory});      

    }else{

      res.status(404).json({'code':status.ERROR,'data':[]});

    }

  }catch(error){
    console.log(error);
    res.status(500).json({"code":status.ERROR_SERVER,"msg":"Server Error"});
    
  }

};
