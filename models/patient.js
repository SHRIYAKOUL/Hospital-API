/*
    This file defines the schema for a Patient in the database.
    Each patient has a name, reports, and a doctor.
    The reports field is an array of objects, each containing a status and 
    date. The doctor field is an ObjectId referencing the Doctor model.
*/
const mongoose = require('mongoose');

// Define schema for a Patient
const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
    },
    reports:[
        {
            status:{
                type:String,
                required:[true],
                enum:["Negative", "travelled-Quarantine","Symptoms-Quarantine","Positive-Admin"],
            },
            date:{
                type:Date,
                required:true,
            }
        },
    ],
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true,
    },
});

// Create Patient model
const Patient = new mongoose.model("Patient", patientSchema);
// Export Patient model
module.exports = Patient;

