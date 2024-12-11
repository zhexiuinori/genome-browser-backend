// routes/crossSpeciesTransferabilityRoutes.js
const express = require('express');
const crossSpeciesTransferabilityController = require('../controllers/crossSpeciesTransferabilityController');

const router = express.Router();

router.post('/', crossSpeciesTransferabilityController.createTransferability);
router.get('/', crossSpeciesTransferabilityController.getAllTransferability);

module.exports = router;
