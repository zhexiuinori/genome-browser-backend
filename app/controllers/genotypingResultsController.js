// controllers/genotypingResultsController.js
const genotypingResultsModel = require('../models/genotypingResults');

async function createGenotypingResult(req, res) {
    try {
        const resultData = req.body;
        const result = await genotypingResultsModel.createGenotypingResult(resultData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllGenotypingResults(req, res) {
    try {
        const resultsList = await genotypingResultsModel.getAllGenotypingResults();
        res.json(resultsList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createGenotypingResult, getAllGenotypingResults };
