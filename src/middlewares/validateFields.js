const {validationResult} = require('express-validator');
const status = require('../config/config');
const { unlink } = require('fs-extra');


/**
 * @description Este middleware nos permite verificar los errores.
 * Si se encuentra errores que nos lanza el express validator
 * este middleware no dejará pasar la petición y responderá al cliente
 * con un error 400.
 */
const verifyErrors = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        if(req.file){

            await unlink(req.file.path);
            
        }

        return res.status(400).json(
            {
                code:status.ERROR,
                errors:errors.array()
            }
        );

    }

    next();//dejamos que pase la petición del cliente.

}

module.exports = verifyErrors;
