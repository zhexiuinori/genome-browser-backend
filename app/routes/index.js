const express = require('express');
const router = express.Router();

const speciesRoutes = require('./speciesRoutes');
const ssrMarkersRoutes = require('./ssrMarkersRoutes');
const crossSpeciesTransferabilityRoutes = require('./crossSpeciesTransferabilityRoutes');
const genotypingResultsRoutes = require('./genotypingResultsRoutes');
const samplesRoutes = require('./samplesRoutes');



router.use('/species', speciesRoutes);
router.use('/ssrmarkers', ssrMarkersRoutes);
router.use('/transferability', crossSpeciesTransferabilityRoutes);
router.use('/genotyping', genotypingResultsRoutes);
router.use('/samples', samplesRoutes);

module.exports = router;