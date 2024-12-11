// controllers/speciesController.js
const speciesModel = require('../models/species');

async function getAllSpecies(req, res) {
    try {
        const speciesList = await speciesModel.getAllSpecies();
        const response = {
            data: speciesList,
        };
        res.json(response);
    } catch (error) {
        res.status(500).json({
            code: 500,
            data: null,
            message: error.message
        });
    }
}

async function getSpeciesByName(req, res) {
    try {
        const { name } = req.params;
        const species = await speciesModel.getSpeciesByName(name);
        
        if (!species) {
            return res.status(404).json({
                code: 404,
                data: null,
                message: 'Species not found'
            });
        }

        res.json({
            code: 200,
            data: species
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            data: null,
            message: error.message
        });
    }
}

async function createSpecies(req, res) {
    try {
        const speciesData = req.body;
        const result = await speciesModel.createSpecies(speciesData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    getAllSpecies, 
    createSpecies,
    getSpeciesByName 
};
