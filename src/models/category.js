const mongoose= require('mongoose');
const  CategorySchema=mongoose.Schema({
    categoryName:{
        subcategory:{
            product:{
                sku:{
                    type:String,
                    require:true
                },
             description:{
                 type:String,
                 require:true
            },
             size:{
                 type:String,
                 require:true
             }
        }}},
    description:{
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
module.exports=mongoose.model('Category',CategorySchema)