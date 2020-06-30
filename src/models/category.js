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

