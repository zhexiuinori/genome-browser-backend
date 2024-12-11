// models/species.js
const { connect } = require('../../config/database');

async function getSpeciesCollection() {
    const db = await connect();
    return db.collection('species');
}

async function createSpecies(species) {
    const collection = await getSpeciesCollection();
    return collection.insertOne(species);
}

async function getAllSpecies() {
    const collection = await getSpeciesCollection();
    const speciesList = await collection.find({}).toArray();
    
    const rootSpecies = speciesList.find(s => s.name === "Broussonetia");
    const childSpecies = speciesList.filter(s => s.name !== "Broussonetia");
    
    if (!rootSpecies) return { tree: [], listData: [] };

    // 构建树形结构
    const tree = [{
        title: rootSpecies.name,
        key: '0-0',
        children: childSpecies.map((species, index) => ({
            title: species.name,
            key: `0-0-${index}`,
            children: []
        }))
    }];

    // 构建列表数据，使用相对路径
    const listData = childSpecies.map((species, index) => ({
        key: `species-${index}`,
        title: species.name,
        description: species.description || `${species.name} description...`,
        content: species.content || `Detailed information about ${species.name}...`,
        imageUrl: `/images/Genomes/Broussonetia/${index + 1}.png` // 使用相对于 public 目录的路径
    }));

    return { tree, listData };  
}

// 修改获取单个物种的函数，使用名称而不是ID
async function getSpeciesByName(name) {
    const collection = await getSpeciesCollection();
    const species = await collection.findOne({ name: name });
    
    if (!species) return null;

    // 根据物种名称确定图片路径
    const imageNumber = species.imageURL || 1; // 默认使用1号图片
    
    return {
        title: species.name,
        scientificName: species.scientificName,
        family: species.family,
        description: species.description,
        genomeInfo: species.genomeInfo,
        distribution: species.distribution,
        researchValue: species.researchValue,
        imageUrl: `/images/Genomes/Broussonetia/${imageNumber}.png`,
    };
}

module.exports = { createSpecies, getAllSpecies, getSpeciesByName };
