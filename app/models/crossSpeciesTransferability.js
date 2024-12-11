// models/crossSpeciesTransferability.js
const { connect } = require('../../config/database');

async function getCrossSpeciesTransferabilityCollection() {
    const db = await connect();
    return db.collection('CrossSpeciesTransferability');
}

async function createTransferability(transferability) {
    const collection = await getCrossSpeciesTransferabilityCollection();
    return collection.insertOne(transferability);
}

async function getAllTransferability() {
    const collection = await getCrossSpeciesTransferabilityCollection();
    return collection.find().toArray();
}

module.exports = { createTransferability, getAllTransferability };
