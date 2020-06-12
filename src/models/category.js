const mongoose= require('mongoose')
const Schema= mongoose.Schema;
const CategorySchema=new Schema({
    category:{
         name:{
            type: String,
            require:true},
            subCategory:{
                name:{
                    type:String,
                    require:true},
                product:{
                    name:{
                        type:String,
                        require:true
                    },
                    sku:{
                        
                            type:String,
                            require:true
    
                        },
                        size:{
                        
                            type:String,
                        require:true
    
                        } ,
                        url:{
                            type:String,
                            require:true
                        }

                    }


            }
               
    }
    

},{
    timestamps:true}
)
module.exports = mongoose.model('Category',CategorySchema)