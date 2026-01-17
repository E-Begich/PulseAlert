const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const userController = require('../controllers/userController');
const auditController = require('../controllers/auditLogController');
const deliveryController = require('../controllers/deliveryController');
const invoiceController = require('../controllers/invoiceController');




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

// AUDIT LOG
router.get('/getAllAuditLogs', auditController.getAllAuditLogs);
router.get('/getLogsByUser/:user_id', auditController.getLogsByUser);

//DELIVERY
router.post('/createDelivery', deliveryController.createDelivery);
router.get('/getAllDeliveries', deliveryController.getAllDeliveries);
router.get('/getDeliveryById/:delivery_id', deliveryController.getAllDeliveries);
router.put('/updateDelivery/:delivery_id', deliveryController.updateDelivery);
router.delete('/deleteDelivery/:delivery_id', deliveryController.deleteDelivery);

// INVOICES
router.get('/getAllInvoices', invoiceController.getAllInvoices);
router.get('/getInvoiceById/:invoice_id', invoiceController.getInvoiceById);
router.post('/createInvoice/create', invoiceController.createInvoice);
router.put('/updateInvoice/:invoice_id', invoiceController.updateInvoice);
router.delete('/deleteInvoice/:invoice_id', invoiceController.deleteInvoice);


module.exports = router;
