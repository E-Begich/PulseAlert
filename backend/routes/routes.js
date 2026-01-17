const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const userController = require('../controllers/userController');
const auditController = require('../controllers/auditLogController');
const deliveryController = require('../controllers/deliveryController');
const invoiceController = require('../controllers/invoiceController');
const paymentController = require('../controllers/paymentController');
const activityHistoryController = require('../controllers/activityHistoryController');
const documentController = require('../controllers/documentController');

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
router.post('/createInvoice', invoiceController.createInvoice);
router.get('/getAllInvoices', invoiceController.getAllInvoices);
router.get('/getInvoiceById/:invoice_id', invoiceController.getInvoiceById);
router.put('/updateInvoice/:invoice_id', invoiceController.updateInvoice);
router.delete('/deleteInvoice/:invoice_id', invoiceController.deleteInvoice);

// PAYMENT
router.post('/createPayment', paymentController.createPayment);
router.get('/getAllPayments', paymentController.getAllPayments);
router.get('/getPaymentById/:payment_id', paymentController.getPaymentById);
router.put('/updatePayment/:payment_id', paymentController.updatePayment);
router.delete('/deletePayment/:payment_id', paymentController.deletePayment);

// ACTIVITY HISTROY
router.post('/createActivity', activityHistoryController.createHistoryActivity);
router.get('/getAllActivity', activityHistoryController.getAllHistoryActivities);
router.get('/getActivityById/:id', activityHistoryController.getHistoryActivityById);
router.put('/updateActivity/:id', activityHistoryController.updateHistoryActivity);
router.delete('/deleteActivity/:id', activityHistoryController.deleteHistoryActivity);

// DOCUMENTS
router.post('/createDocument', documentController.createDocument);
router.get('/getAllDocuments', documentController.getAllDocuments);
router.get('/getDocumentById/:id', documentController.getDocumentById);
router.put('/updateDocument/:id', documentController.updateDocument);
router.delete('/deleteDocument/:id', documentController.deleteDocument);

module.exports = router;
