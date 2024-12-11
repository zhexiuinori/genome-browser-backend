// controllers/crossSpeciesTransferabilityController.js
const crossSpeciesTransferabilityModel = require('../models/crossSpeciesTransferability');

async function createTransferability(req, res) {
    try {
        const transferability = req.body;
        const result = await crossSpeciesTransferabilityModel.createTransferability(transferability);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllTransferability(req, res) {
    try {
        const transferabilityList = await crossSpeciesTransferabilityModel.getAllTransferability();
        res.json(transferabilityList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createTransferability, getAllTransferability };
