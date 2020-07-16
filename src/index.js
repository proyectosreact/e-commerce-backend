const express = require('express');
const connectedDB = require('./config/dataBase');
const cors = require('cors');
const appMulterConfig = require('./config/multer');


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

//cloudinary
appMulterConfig(app);


//Import route user

app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/category', require('./routes/category'));
app.use('/api/subCategory', require('./routes/subCategory'));
app.use('/api/product', require('./routes/product'));

//start app
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});