const Category = require("../models/category");
const status = require("../config/config");
const { unlink } = require("fs-extra");

const isExistsSubCategory = async (req, res, next) => {

    let subCategory;

    try{

        const { id_subCategory } = req.body;
        
        subCategory = await Category.findOne(
            {'subCategorys._id':id_subCategory},
            {"subCategorys.$":1}
        );

    }catch(e){
    }finally{

        if(subCategory){
    
            next();
    
        }else{
    
            if(req.file){
                
                await unlink(req.file.path);
    
            }
    
            res.status(404).json(
                {
                    code:status.ERROR,
                    msg:'La subCategoría no existe'
                }
            )
    
        }

    }
    
};

module.exports = {isExistsSubCategory};