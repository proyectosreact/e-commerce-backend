
var config=require('../config/config').facebook;
var passport=require('passport')
var facebook=require('passport-facebook').Strategy;

passport.use(new facebook({
    clientID: 774711750018305,
    clientSecret:"b30f510ae0a126f9caa375eda7442e87",
    profileFields:['id ','displayName','photos']}
, function(accessToken,refreshToken,profile,done){

    console.log(profile);

return done(null,profile);
}));
passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(obj,done){
    done(null,obj);
})
exports.authfacebook=async (req,res)=>{
 try{
     let faceboo= await passport.authenticate('facebook');
     res.status(200).json({msg: faceboo.user});

 }catch(e){
     if(e){
         res.status(500).json({msg:'This errors login by facebook'})
     }
 }


}