const express = require('express');
const connectedDB = require('./config/dataBase');


//make server
const app = express();
app.use(cors());

//conect DB
connectedDB();

//Express.json
app.use(express.json({ extended: true }));


//PORT app
const PORT = process.env.PORT || 4000;

//Import route user
app.use('/api/users' , require( './routes/user' ));
app.use('/api/auth' , require( './routes/auth' ));


//start app
app.listen( PORT, () =>{
    console.log(`Server on port ${PORT}`);
}); 