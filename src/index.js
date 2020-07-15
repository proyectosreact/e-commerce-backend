const express = require('express');
const connectedDB = require('./config/dataBase');
const passport=require('./config/passport');
const cors = require('cors');


//make server
const app = express();


//conect DB
connectedDB();

//Express.json
app.use(express.json({
  extended: true
}));
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());


//PORT app
const PORT = process.env.PORT || 4000;

//configuration the session
app.use(require('express-session')({
  secret:'proyectoreact2020',
  resave: true,
  saveUninitialized:true

}));
// initialize passport auth and session
app.use(passport.initialize());
app.use(passport.session());
//Import route user

app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/authfacebook',require('./routes/authfacebook'));


//app.use('/api/authgoogle',require('/routes/authgoogle'));

app.use('/api/category', require('./routes/category'));
app.use('/api/subCategory', require('./routes/subCategory'));
app.use('/api/product', require('./routes/product'));

//start app
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});