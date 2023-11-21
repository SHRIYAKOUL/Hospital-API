/*
    This file sets up the connection to your MongoDB database. 
    It imports the mongoose module, connects to your MongoDB database using
    the specified URI, and sets up event listeners for the ‘open’ and ‘error’ 
    events on the database connection. 
*/


const mongoose =require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017");
require('dotenv').config();
console.log(process.env.Mongo_URI);
const uri = process.env.Mongo_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const db =mongoose.connection;
// Event listener for 'open' event
db.once('open',()=>{
    console.log("Successfully connecting with mongodb");
});
// Event listener for 'error' event
db.on("error",
console.error.bind(console,"Error in connecting with mongodb")
);


// Export database connection
module.exports = db;
