// controllers/samplesController.js
const samplesModel = require('../models/samples');

async function createSample(req, res) {
    try {
        const sample = req.body;
        const result = await samplesModel.createSample(sample);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllSamples(req, res) {
    try {
        const samplesList = await samplesModel.getAllSamples();
        res.json(samplesList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createSample, getAllSamples };
