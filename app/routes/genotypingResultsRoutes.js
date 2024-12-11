// routes/genotypingResultsRoutes.js
const express = require('express');
const genotypingResultsController = require('../controllers/genotypingResultsController');

const router = express.Router();

router.post('/', genotypingResultsController.createGenotypingResult);
router.get('/', genotypingResultsController.getAllGenotypingResults);

module.exports = router;
