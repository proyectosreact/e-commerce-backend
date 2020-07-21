const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });


const connectedDB = async () =>{
    try {
        await mongoose.connect( process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB conected');
    } catch (error) {
        console.log(error);
        process.exit(1); //stop app
    }

}

module.exports = connectedDB;