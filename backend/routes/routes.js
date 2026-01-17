const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const userController = require('../controllers/userController');

//PATIENT
router.post('/createPatient', patientController.createPatient);
router.get('/getAllPatients', patientController.getAllPatients);
router.get('/getPatientById/:patient_id', patientController.getPatientById);
router.put('/updatePatient/:patient_id', patientController.updatePatient);
router.delete('/deletePatient/:patient_id', patientController.deletePatient);

// USERS
router.post('/createUser', userController.createUser);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:user_id', userController.getUserById);
router.put('/updateUser/:user_id', userController.updateUser);
router.delete('/deleteUser/:user_id', userController.deleteUser);



module.exports = router;
