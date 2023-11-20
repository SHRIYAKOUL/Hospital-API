/*
    This file defines the schema for a Doctor in the database.
    Each doctor has a name and password.
    Both fields are required and the password must be greater than 6
    characters.
*/
const mongoose = require('mongoose');

// Define schema for a Doctor
const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
    },
    password:{
        type:String,
        required:[true,"Please enter your Password"],
        minLength:[6,"Password should be greater than 6 characters"],
    },
});

// Create Doctor model
const Doctor = new mongoose.model("Doctor", doctorSchema);
// Export Doctor
module.exports = Doctor;