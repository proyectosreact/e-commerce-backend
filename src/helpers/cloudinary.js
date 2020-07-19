const {unlink} = require('fs-extra');

const addImage = async (imagePath, cloudinary, folderName = 'products') => {

    const result = await cloudinary.v2.uploader.upload(imagePath,{
        folder: folderName,
        invalidate: true
    });
    
    return result;

};

const deleteImage = async (public_id, cloudinary) => {
    await cloudinary.v2.uploader.destroy(public_id,{
        invalidate:true
      });
};

module.exports = {
    addImage,
    deleteImage
};