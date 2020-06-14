const User = require('../models/user');
const bcryptjs = require ('bcryptjs');
const _ = require('lodash');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const nodemailer= require('nodemailer');
const status = require('../config/config');



//Create the user and send email to verify account
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
        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS
            }
          });
        
        console.log(process.env.HOST);
        const link="http://"+process.env.HOST+"/api/users/verify?id="+user._id;
        
        const mailOptions={
            to : email,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            }
            else {
                console.log("Message sent: ");
                res.send("Please check your mail, we sent mail to verify account");
            }
        });
       
        
    } catch (error) {
        console.log(error);
        res.status(400).send('There was a mistake');
        
    }
}
// user required reset password, we send mail to verify
exports.forgetPassword = async (req, res) =>{   
    
    //check for mistakes
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        res.status(400).json({ errors: errors.array() })
    };

    const {email} = req.body;
    try{
    await User.findOne({email}, (err, user) => {

        if(err || !user){
            return res.status(400).json({error: "User with this email does not exists"})            
        };
        console.log(user._id);
        token = jwt.sign({_id: user._id}, process.env.SECRET,{expiresIn:'20m'});
        console.log(token);

        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS
            }
          });
    
        const link="http://"+process.env.HOST+"/api/users/resetPassword?token="+token;
        
        const mailOptions={
            to : email,
            subject : "Reset Password",
            html : "Hello,<br> Please Click on the link to set a new password.<br><a href="+link+">Click here</a>"
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            }
            else {
                console.log("Message sent: ");
                res.send("Please check your mail, we sent mail to verify account");
            }
        });
        return user.updateOne({resetLink: token}, (err, success) =>{
            if(err || !user){
                return res.status(400).json({error: "User with this email does not exists"}); 
            }else{
                return res.json({msg: 'ok'})
            }
        })
    })
    }catch(error){
        console.log(error);
        res.status(400).send('There was a mistake');
    }
}
//set user to reset password
exports.resetPassword = async ( req, res) =>{
    
    //check for mistakes
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        res.status(400).json({ errors: errors.array() })
    };

    const {resetLink, newPass, repeatNewPass} = req.body;

    try{
    if(resetLink){
        jwt.verify(resetLink, process.env.SECRET, (error, decodedData) =>{
            if(error){
                return res.status(401).json({ msg: 'Incorrect token or it is expired' })
            }
        })
    }else{
        return res.status(401).json({error: "Autentication error!"})   
    }
    await User.findOne({resetLink}, (err, user)=>{
        
        if(err || !user){
            return res.status(400).json({error: "User with this token does not exists."})            
        }
        const obj = {
            password : newPass
        }

        /*check password
        const differentPass = bcryptjs.compare( password, user.password );
        if(correctPass){
            return res.status(400).json({ msg: 'no podes poner el mismo password anterior' })
        }*/    

        user = _.extend(user, obj);
        
        user.save((err, result)=>{
            if(err || !user){
                return res.status(401).json({error: "reset password error"}); 
            }else{
                return res.status(200).json({msg: 'the password change ok'});
            }
        })
    })
    }catch(error){
        console.log(error);
        res.status(400).send('There was a mistake');
    }
}
//confirmamos el click en el link del correo cambiamos el campo de verify en la base al validar la cuenta
exports.verifyEmail = async (req, res) =>{

    const Host=req.get('Host');
    const id = req.query.id;
    let userId ={name:{},password:{},email:{},direction:[],_id:{},registry:{}};
    
    userId = await User.findOne({_id : id});
    console.log(userId._id);
    console.log("http://"+Host);
    if((req.protocol+"://"+Host)==("http://"+Host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id== userId._id)
            {
                console.log("email is verified");
                res.end("<h1>Email "+userId.email+" is been Successfully verified");
                let verifyUser= await User.update({_id : userId._id},{$set:{verify: true}});
                console.log(userId.verify);
                
            }
        else
            {
                console.log("email is not verified");
                res.end("<h1>Bad Request</h1>");
            }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
    //res.redirection('/');
};

exports.showUserName = async (req, res, next) => {

    console.log('desde show');
    let showNameUser = await User.find(req.query.id)
    console.log(showNameUser);
};
exports.listUsers = async (req, res) => {
    //check for mistakes
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        res.status(400).json({ errors: errors.array() })
    };
    try {
        const users = await User.find();
        const total = await User.countDocuments();

        return res.json({ code: status.OK, users, total });
        
    } catch (error) {
        return res.json({ code: status.ERROR, message: 'Internal server Error' });
    }
}

