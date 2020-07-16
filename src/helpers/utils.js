const utils = {};
//const uuid = require('uuid');
const {v4:uuidv4} = require('uuid');

utils.generarSku = () => uuidv4();



module.exports = utils;