/*
    This file sets up the routing for our application.
    It imports the necessary modules, creates a router, and defines routes 
    for registering doctors, logging in doctors, registering patients, 
    creating reports for patients, and fetching reports.
    Some routes are protected by JWT authentication.
*/

const express = require('express');
const {registerDoctor, registerPatient, createReport, all_reports, AllReports, login} = require("../controllers/userController");

const router = express.Router();
const passport = require('passport');

// Define routes
router.post('/doctors/register',registerDoctor);

router.post("/login", login);

router.post('/patients/register',passport.authenticate('jwt',{session :false}),registerPatient);

router.post('/patient/:id/create_report',passport.authenticate('jwt',{session :false}),createReport);

router.get('/patients/:id/all_report',all_reports);

router.get('/reports/:status',AllReports);
// Export router
module.exports = router;