const express=require('express');
const router= express.Router();
var authfacebookController=require('../controllers/authfacebook');

router.get('/',authfacebookController.authfacebook);
router.get('/callback',authfacebookController.authfacebookCallback);

module.exports=router;