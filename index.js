/*
  It sets up your Express server, connects to your MongoDB database, and 
  configures our application’s settings. It sets up middleware to parse 
  form data and JSON data, and uses the router for handling routes.
  Finally, it starts the server on the specified port and logs a message 
  to the console.
  If there’s an error starting the server, it logs the error message.  
*/

const express = require('express');
const bodyParser = require('body-parser');
const db= require('./config/mongoose');
const passport=require('passport');
const passportStrategy = require("./config/passport");
const router = require('./routes/router');

const app = express();
const PORT = 8000;

// Middleware to parse form data and JSON data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Userouter for handling routes
app.use(router);

// Start the server
app.listen(PORT,(err)=>{
    if(err){
        console.log(`Server is giving an error :$(err)`);
    }else{
        console.log(`Server is successfully up and running`);
    }
});