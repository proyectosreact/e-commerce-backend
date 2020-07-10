const {Schema, model}= require('mongoose'),


CategorySchema = new Schema({
    category:{
        type: String
    },
    subCategorys:[{
        subCategory:{
            type: String,
            
        },
        products:[{
            product:{
                type: String,
            },
            sku:{
                type: String
            },
            uri:{
                type: String
            },
            price:{
                type: Number
            },
            stock:{
                type: String
            },
             }]
    }]
},{ timestamps:true }
)
module.exports = model('Category',CategorySchema);

