const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { login } = require('../controllers/authController');

const patientController = require('../controllers/patientController');
const userController = require('../controllers/userController');
const auditController = require('../controllers/auditLogController');
const deliveryController = require('../controllers/deliveryController');
const invoiceController = require('../controllers/invoiceController');
const paymentController = require('../controllers/paymentController');
const activityHistoryController = require('../controllers/activityHistoryController');
const documentController = require('../controllers/documentController');

//PATIENT
router.post('/createPatient', auth, patientController.createPatient);
router.get('/getAllPatients', auth,  patientController.getAllPatients);
router.get('/getPatientById/:patient_id', auth, patientController.getPatientById);
router.put('/updatePatient/:patient_id', auth, patientController.updatePatient);
router.delete('/deletePatient/:patient_id', auth, patientController.deletePatient);

// USERS
router.post('/createUser', auth, userController.createUser);
router.get('/getAllUsers', auth, userController.getAllUsers);
router.get('/getUserById/:user_id', auth, userController.getUserById);
router.put('/updateUser/:user_id', auth, userController.updateUser);
router.delete('/deleteUser/:user_id', auth, userController.deleteUser);

//login
router.post('/login', userController.loginUser);

// AUDIT LOG
router.get('/getAllAuditLogs', auth, auditController.getAllAuditLogs);
router.get('/getLogsByUser/:user_id', auth, auditController.getLogsByUser);

//DELIVERY
router.post('/createDelivery', auth,deliveryController.createDelivery);
router.get('/getAllDeliveries', auth, deliveryController.getAllDeliveries);
router.get('/getDeliveryById/:delivery_id', auth, deliveryController.getAllDeliveries);
router.put('/updateDelivery/:delivery_id', auth, deliveryController.updateDelivery);
router.delete('/deleteDelivery/:delivery_id', auth, deliveryController.deleteDelivery);

// INVOICES
router.post('/createInvoice', auth, invoiceController.createInvoice);
router.get('/getAllInvoices', auth, invoiceController.getAllInvoices);
router.get('/getInvoiceById/:invoice_id', auth, invoiceController.getInvoiceById);
router.put('/updateInvoice/:invoice_id', auth, invoiceController.updateInvoice);
router.delete('/deleteInvoice/:invoice_id', auth, invoiceController.deleteInvoice);

// PAYMENT
router.post('/createPayment', auth, paymentController.createPayment);
router.get('/getAllPayments', auth, paymentController.getAllPayments);
router.get('/getPaymentById/:payment_id', auth, paymentController.getPaymentById);
router.put('/updatePayment/:payment_id', auth, paymentController.updatePayment);
router.delete('/deletePayment/:payment_id', auth, paymentController.deletePayment);

// ACTIVITY HISTROY
router.post('/createActivity', auth, activityHistoryController.createHistoryActivity);
router.get('/getAllActivity', auth, activityHistoryController.getAllHistoryActivities);
router.get('/getActivityById/:id', auth, activityHistoryController.getHistoryActivityById);
router.put('/updateActivity/:id', auth, activityHistoryController.updateHistoryActivity);
router.delete('/deleteActivity/:id', auth, activityHistoryController.deleteHistoryActivity);
 
// DOCUMENTS
router.post('/createDocument', auth, documentController.createDocument);
router.get('/getAllDocuments', auth, documentController.getAllDocuments);
router.get('/getDocumentById/:id', auth, documentController.getDocumentById);
router.put('/updateDocument/:id', auth, documentController.updateDocument);
router.delete('/deleteDocument/:id', auth, documentController.deleteDocument);




module.exports = router;
