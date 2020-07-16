const { validationResult } = require('express-validator');
const validation = {};
const status = require("../config/config");

validation.isArrayError = (req, res) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        res.status(400).json({ code: status.ERROR, message: errors.array() });
        return true;
    }else{
        return false;
    }
};

module.exports = validation;