const express=require('express');
const router= express.Router();
var authfacebookController=require('../controllers/authfacebook');

router.get('/',authfacebookController.authfacebook)

module.exports=router;