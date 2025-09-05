// routes/hospitalRoutes.js
const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospital/hospitalController');

router.get('/getAllDetails', hospitalController.getHospitals);
router.get('/getById/:id', hospitalController.getHospitalById);
router.post('/create', hospitalController.createHospital);
router.delete('/delete/:id', hospitalController.deleteHospital);

module.exports = router;
