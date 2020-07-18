const {Schema, model}= require('mongoose'),


CategorySchema = new Schema({
    category:{
        type: String
    },
    subCategorys:[{
        subCategory:{
            type: String,
        }
    }]
},{ timestamps:true }
)
module.exports = model('Category',CategorySchema);

