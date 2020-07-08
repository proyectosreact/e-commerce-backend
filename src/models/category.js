const {Schema, model}= require('mongoose'),


CategorySchema = new Schema({

    category:{
        type: String,
        required: true
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
            //slug: ver si agregar    
        }]
    }]
},{
    timestamps:true}
)
module.exports = model('Category',CategorySchema);

