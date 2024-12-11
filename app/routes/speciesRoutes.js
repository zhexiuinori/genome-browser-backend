const express = require('express');
const speciesController = require('../controllers/speciesController');

const router = express.Router();

router.get('/', speciesController.getAllSpecies);
// 将 detail/:name 改为 species/:name
router.get('/species/:name', speciesController.getSpeciesByName);
router.post('/', speciesController.createSpecies);

module.exports = router;