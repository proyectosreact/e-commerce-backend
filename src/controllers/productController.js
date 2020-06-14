const Category=require('../models/category');
const {validationResult}=require('express-validator'); //Faltan hacer validaciones

exports.createProduct=async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }

    let product=req.body

    console.log(product)

    try{
        let products = await Category.findOne({}, { projection: {categoryName,subcategory,produt}})

        if(products){
            console.log('Product already exist',product)
            return res.status(400).json({ msg: 'Product already exist'});
        }

        await products.save((err, productStored)=>{
            
            if (err) res.status(500).send({message: `this error of save ${err}`})
            res.status(200).json({ msg: 'Product add'});

        })

    }
    catch(error){
        console.log(error);
        res.status(400).send('there was a mistake');
    }
}

exports.queryProduct=async(req,res)=>{
    Category.find({},(err,products)=>{
        if (err) {
            
           return res.status(500).send({message:`Erro this pettition ${err}`})
        }
        if (!products) {
          return res.status(404).send({message: `The products not exist `})
            
        }
        // res.send(200, {products})
        console.log(products);
        res.status(200).send({products});
    })
}

exports.queryProductId=async(req,res)=>{
    let productId=req.params.IdProduct
Category.findById(productId,(err,products)=>{
    if (err) {
        
       return res.status(500).send({message:`Erro this petition ${err}`})
    }
    if (!products) {
      return res.status(404).send({message: `The product not exist `})
        
    }
    res.send(200, {products})
})
}

exports.updateCategoryId = (req, res) => {        
        res.send('UpdateProduct');
}