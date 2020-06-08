const mongoose= require('mongoose');
const  CategorySchema=mongoose.Schema({
    categoryName:{
        subcategory:{
            product:{
                sku:String,
             description:String,
             size:String   
        }}},
    descriptionCategory:{
        type:String,
        require: true,
        trim:true
    },
    urlImage:{
        type: String,
        require:true,
        trim:true
    }
})
module.exports = mongoose.model('Category',CategorySchema)