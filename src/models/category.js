<<<<<<< HEAD
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    category: {
        name: {
            type: String,
            require: true
        },
        subCategory: {
            name: {
                type: String,
                require: true
            },
            product: {
                name: {
                    type: String,
                    require: true
                },
                sku: {

                    type: String,
                    require: true

                },
                size: {

                    type: String,
                    require: true

                },
                url: {
                    type: String,
                    require: true
                }

            }


        }

    }


}, {
    timestamps: true
})
module.exports = mongoose.model('Category', CategorySchema)
=======
const {Schema, model}= require('mongoose'),

CategorySchema = new Schema({
    category:{        
        type: String,
        unique: true,
        required: 'Category is required',
        subCategory:[{
            name:{
            type:String,
            product:[{
                name:{
                    type:String,
                },
                sku:{
                    unique: true,
                    type:String,   
                },
                size:{
                    type:String,    
                },
                url:{
                    type:String,
                }
            }]}        
        }],
    }},{
    timestamps:true}
)
module.exports = model('Category',CategorySchema);
>>>>>>> c33a9d7a0fd1898be7ae68ca8af08ad14592b5ac
