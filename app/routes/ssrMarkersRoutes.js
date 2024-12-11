// routes/ssrMarkersRoutes.js
const express = require('express');
const ssrMarkersController = require('../controllers/ssrMarkersController');

const router = express.Router();

// 基础CRUD路由
router.post('/:species', ssrMarkersController.createSSRMarker);
router.get('/:species', ssrMarkersController.getAllSSRMarkers);

// 统计分析路由
router.get('/stats/:species/repeat-sequence', ssrMarkersController.getRepeatSequenceStats);
router.get('/stats/:species/repeat-length', ssrMarkersController.getRepeatLengthStats);
router.get('/stats/:species/basic-info', ssrMarkersController.getBasicInfo);

module.exports = router;
