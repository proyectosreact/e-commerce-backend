const jwt= require('jsonwebtoken');
const User= require('../models/user');

const isAuth=(req,res,next)=>{

    if(!req.headers.authorization){
        return res
            .status(403)
            .send({message:"Not authorized to access this resource"});
    }
    const token=req.headers.authorization;
    //console.log(token);
    try{
        if(token){
            
            const onlyToken=token.slice(7,token.length);
            //console.log(onlyToken);
            jwt.verify(onlyToken,process.env.SECRET,(err,decode)=>{
                //console.log(decode);
                if(err){
                    return res.status(401).send({message:'Invalid Token'});
                }
                req.user=decode;
                next();
                return;
            });
        }else{
            return res.status(401).send({message:'Token is not supplied.'});
        }
    
    }catch(error){
        return res.status(401).send({message:'Not authorized to access this resource'});
    }
};

const isAdmin=async (req,res,next) => {
    
    const {id}=req.user.user;
    const user=await User.findOne({_id:id});
    if(user && user.isAdmin== true){
        //console.log('si es administrador');
        return next()
    }

    return res.status(401).send({message:'Token is not valid.'});
};

module.exports={isAuth,isAdmin}