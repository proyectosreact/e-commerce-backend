const User = require('../models/user');
const bcryptjs = require ('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.createUser = async ( req, res ) => {


    //check for mistakes
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        res.status(400).json({ errors: errors.array() })
    };


    //extraer email y pass
    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email });

        //check
        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }

        //create new user
        user = new User(req.body);

        //Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash( password, salt );

        //save user
        await user.save();

        //Create and sing the JWT
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
        console.log(error);
        res.status(400).send('There was a mistake');
        
    }
}

exports.listUsers = async (req, res) => {
    //check for mistakes
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        res.status(400).json({ errors: errors.array() })
    };
    try {
        const since = parseInt( req.query.since || 0 );
        const users = await User.find();
        const total = await User.countDocuments();

        return res.json({ code: status.OK, users, total });
        
    } catch (error) {
        return res.json({ code: status.ERROR, message: 'Internal server Error' });
    }
}