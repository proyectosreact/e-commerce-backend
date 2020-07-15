const passport=require('passport');
exports.authfacebook=passport.authenticate('facebook');

exports.authfacebookCallback=passport.authenticate('facebook')