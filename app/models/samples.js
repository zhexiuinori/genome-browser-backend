// models/samples.js
const { connect } = require('../../config/database');

async function getSamplesCollection() {
    const db = await connect();
    return db.collection('Samples');
}

async function createSample(sample) {
    const collection = await getSamplesCollection();
    return collection.insertOne(sample);
}

async function getAllSamples() {
    const collection = await getSamplesCollection();
    return collection.find().toArray();
}

module.exports = { createSample, getAllSamples };
