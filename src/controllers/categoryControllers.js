const Category=require('../models/category');
const {validationResult}=require('express-validator');

exports.createCategory=async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }

    let categoryName=req.body.categoryName
    console.log(categoryName)
    try{
        let category=await Category.findOne(categoryName)

        if(category){
            console.log('This encontrad thi category',category)
            return res.status(400).json({ msg: 'Category already exist'});
        }
        category=new Category()
        category.categoryName=req.body.categoryName
        category.subcategory.subCategoryName=req.body.subCategoryName
        category.subcategory.product.description=req.body.subCategoryProductDescription
        category.subcategory.product.sku=req.body.subCategoryProductSku
        category.urlImage=req.body.urlImage

        await category.save((err, categoryStored)=>{
            if (err) res.status(500).send({message: `this error of save ${err}`})
    
            res.status(200).send({category: categoryStored})
        })

    }
    catch(error){
        console.log(error);
        res.status(400).send('there was a mistake');
    }
}

exports.queryCategory=async(req,res)=>{
    Category.find({},(err,categorys)=>{
        if (err) {
            
           return res.status(500).send({message:`Erro this pettition ${err}`})
        }
        if (!categorys) {
          return res.status(404).send({message: `The categorys not exist `})
            
        }
        res.send(200, {categorys})
    })
}



exports.queryCategoryId=async(req,res)=>{
        let categoryId=req.params.IdCategory
    Category.findById(categoryId,(err,category)=>{
        if (err) {
            
           return res.status(500).send({message:`Erro this petition ${err}`})
        }
        if (!category) {
          return res.status(404).send({message: `The category not exist `})
            
        }
        res.send(200, {category})
    })
}
exports.updateCategoryId=async(req,res)=>{
    let categoryId=req.params.IdCategory
    let update=req.body
    
Category.findByIdAndUpdate(categoryId,update,(err,category)=>{
    if (err) {
        
       return res.status(500).send({message:`Erro on update category ${err}`})
    }
    
    res.send(200, {category})
})
}
exports.deleteCategoryId=async(req,res)=>{
    let categoryId=req.params.productId 
     Category.findById(categoryId,(err,category)=>{
         if(err) res.status(500).send({message:`Error on delete Category${err}`})

         category.remove(err=>{
             if(err) res.status(500).send({message: 'Erro this delete category'})
             res.status(200).send({message:'This product has delete'})
         })
     })
}