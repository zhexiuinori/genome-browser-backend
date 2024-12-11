// routes/samplesRoutes.js
const express = require('express');
const samplesController = require('../controllers/samplesController');

const router = express.Router();

router.post('/', samplesController.createSample);
router.get('/', samplesController.getAllSamples);

module.exports = router;
