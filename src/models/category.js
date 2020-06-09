'use strict'
const mongoose= require('mongoose')
const Schema= mongoose.Schema;
const CategorySchema=new Schema({
    category:{
        categoryName: String,
        require:true,
        timestamp:true,
        subcategory:[{
            subCategoryName: String,
            produt:[{description: String, sku: String, timestamp:true}]
        }]
    },
    UrlImge:{
        type:String,
        require:true
    }    
})
module.exports = mongoose.model('Category',CategorySchema)