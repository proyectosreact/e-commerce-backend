const User = require('../models/user');
const bcryptjs = require ('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authUser = async (req, res) =>{
    //check for mistakes
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        res.status(400).json({ errors: errors.array() })
    }

    //Extract email and password
    const { email, password } = req.body

    try {
        //check that the user is registered
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ msg: 'The username does not exist' });
        }

        //check password
        const correctPass = await bcryptjs.compare( password, user.password );
        if(!correctPass){
            return res.status(400).json({ msg: 'Wrong Password' })
        }

        //if everything is correct Create and sing the JWT
        const payload = {
            user: {
                id: user.id
            }

        };

        //Sing JWT
        jwt.sign(payload, process.env.SECRET, {

            expiresIn: 14400
        }, 
        (error, token) => {
            if(error) throw error;

            //Confirmation Msg
            res.json({ token });

        });



    } catch (error) {
        console.log(error)
    }

}