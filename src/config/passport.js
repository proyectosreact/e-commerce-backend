 const passport =require('passport');
 const facebookStrategy=require('passport-facebook').Strategy;

 //Login wiht facebook
 passport.use(
     new facebookStrategy({
        clientID:'774711750018305',
        clientSecret:"b30f510ae0a126f9caa375eda7442e87",
        callbackURL: '/api/authfacebook/callback',
        profileFields:['id ','displayName','photos']
     },
     async(accessToken,refreshToken,profile,done)=>{
         
         aprofile(profile);
        /*try {

            return done(null,profile); 
        } catch (error) {
            return done(null,false,{
                msg:'This error'
            })
        }*/
        return done(null,profile);
     })
);

//Serialize user
passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((obj,done)=>{
    done(null.obj);
});

 const aprofile= function(profile,req,res){
console.log(profile);
 res.status(200).json({msg:profile._json})
}
module.exports=passport;