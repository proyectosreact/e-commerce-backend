//Route to auth users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authControllers = require('../controllers/authControllers');


//Check user
//api/auth
router.post( '/', [
    check('email', 'Add a valid email').isEmail(),
    check('password', 'The password must be a minimum of 8 characters').isLength({ min: 8 })
    ],
    authControllers.authUser
);


module.exports = router;