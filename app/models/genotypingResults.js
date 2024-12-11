// models/genotypingResults.js
const { connect } = require('../../config/database');

async function getGenotypingResultsCollection() {
    const db = await connect();
    return db.collection('GenotypingResults');
}

async function createGenotypingResult(result) {
    const collection = await getGenotypingResultsCollection();
    return collection.insertOne(result);
}

async function getAllGenotypingResults() {
    const collection = await getGenotypingResultsCollection();
    return collection.find().toArray();
}

module.exports = { createGenotypingResult, getAllGenotypingResults };
