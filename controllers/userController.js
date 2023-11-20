/*
   This file contains functions for registering doctors, logging in doctors,
   registering patients, creating reports for patients, and fetching reports.
   Each function handles database operations and sends a JSON response with
   the appropriate status code and message.
   If there’s an error, it sends a JSON response with an error message.  
*/

const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const jwt = require('jsonwebtoken');

// Function to register a Doctor
module.exports.registerDoctor = async(req,res,next) =>{
    try{
        const doctor = await Doctor.create(req.body);

        res.status(200).json({
            success:true,
            message:"Doctor created sucessfully",
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"could not create a doctor , internal server error",
        })
    }
};

// Function to log in a doctor
module.exports.login = async(req,res,next) => {
    try{
        const user = await Doctor.find(req.body);
        if(user){
            const token = jwt.sign({ _id: user.id }, "secret");
            res.status(200).json({
                success:true,
                token,
            });
        }else{
            res.status(404).json({
                success:false,
                message:"name or password do not match",
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

// Function to register a Patient
module.exports.registerPatient = async(req,res,next) =>{
    try{
        // req.body.doctor = "6558be697f1de0c176c7b907";
        const doctorId = req.body.doctor;
        const patient = await Patient.create(req.body);

        res.status(200).json({
            success:true,
            message:"Patient created sucessfully",
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"could not create a patient, internal server error",
        })
    }
};

// Function to create a report for a patient
module.exports.createReport = async(req,res,next)=>{
    try{
        const patient = await Patient.findById(req.params.id);
        req.body.date = Date.now();
        patient.reports.push(req.body);
        patient.save();
        res.status(200).json({
            success:true,
            message:"Report submitted sucessfully",
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:"could not created a report, internal server error",
        }) 
    }
};

// Function to fetch all reports of a patient
module.exports.all_reports= async (req,res,next)=> {
    try{
        const patient = await Patient.findById(req.params.id);
        res.status(200).json({
            success : true,
            reports:patient.reports
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"could not able to fetch the patient's report, internal server error",
        });
    }
};

// Function to fetch all reports filtered by a specific status.
module.exports.AllReports = async (req,res,next) =>{
    try{
        const patient = await Patient.find({
            reports:{$elemMatch:{status:req.params.status}}
        });

        res.status(200).json({
            success:true,
            data:patient,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"could not able to fetch the reports, internal server error",
        });
    }

}; 