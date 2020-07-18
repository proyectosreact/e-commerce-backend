const path = require('path');
const multer = require('multer');
const {generarSku} = require('../helpers/utils');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, generarSku() + path.extname(file.originalname));
    }
});

const mul = (app) =>{
    app.use(multer({storage}).single('image'));
};

module.exports = mul;


