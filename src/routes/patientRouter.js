const express = require("express");
const patientController = require("../controllers/patientController");
const patientRouter = express.Router();


patientRouter.post("/newPatient",
    patientController.newPatient);
patientRouter.post("/searchPatientByName",
    patientController.searchPatientByName);

module.exports = patientRouter;