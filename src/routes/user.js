//Route to make users
const express = require('express');
const router = express.Router();
const userController = require( '../controllers/userController' );
const { check } = require('express-validator');


//Make a user
//api/user
router.post( '/', [
    check( 'name', 'The name is required').not().isEmpty(),
    check('email', 'Add a valid email').isEmail(),
    check('password', 'The password must be a minimum of 8 characters').isLength({ min: 8 })
],
 userController.createUser )

 //Send email to verifid
router.get('/sendMail', userController.sendEmail);

//Verify Email with link
router.get('/verify', userController.verifyEmail);

//Get Name from user
router.get('/home', userController.showUserName);

//Get List Users
 router.get('/list', userController.listUsers);


module.exports = router;