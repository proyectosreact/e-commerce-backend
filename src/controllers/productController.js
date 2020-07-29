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

exports.listProducts = async ( req, res ) => {
  // check for mistakes.
  
  const errors = validationResult(req);
  

  if ( !errors.isEmpty() ) {
    return res.status(400).json({ code: status.ERROR, message: errors.array() });
  }

  try {
    let {idSubCategory } = req.query;

    const data = await Category.find({'subCategorys._id':idSubCategory},{_id:0,category:1,'subCategorys.$':1});
   /* _id:"5f0650bda12a1928ac35f93e",'subCategorys._id':'5f0650f2a12a1928ac35f943'} */

    return res.json({ code: status.OK, data });

  } catch (error) {
    return res.json({ code: status.ERROR, message: 'Internal server error'+error.message });
  }
}
exports.findProduct = async ( req, res ) => {
  const errors = validationResult(req);
  

  if ( !errors.isEmpty() ) {
    return res.status(400).json({ code: status.ERROR, message: errors.array() });
  }

  try {
    let { idCategory,idSubCategory,idProduct } = req.query;
    console.log(req.query);
    

    /*const listProducts = await Category.findOne({_id:idCategory,'subCategorys._id':idSubCategory},{_id:0,'subCategorys.$':1});
    console.log(listProducts);
    console.log('subcaterorias');
    console.log(listProducts.subCategorys);*/
   
    const datas= await Category.findOne({_id:idCategory,'subCategorys._id':idSubCategory},{subCategorys : { $elemMatch:{products:{ $elemMatch:{"_id":idProduct}}}}});
    console.log('data information 2');
    console.log(data2);

    const data= await Category.aggregate([{ $match:{ 'subCategorys.products.$':idProduct}}]);
    console.log('data information');
    console.log(data);
    



    return res.json({ code: status.OK, data });

  } catch (error) {
    return res.json({ code: status.ERROR, message: 'Internal server error'+error.message });
  }
  
}


exports.updateProduct = async ( req, res ) => {
  
}

exports.deleteProduct = async ( req, res ) => {
  
}

