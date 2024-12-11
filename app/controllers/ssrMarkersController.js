// controllers/ssrMarkersController.js
const ssrMarkersModel = require('../models/ssrMarkers');

// 验证物种名称的辅助函数
function validateSpecies(species) {
    return ['papyrifera', 'kaempferi', 'monoica'].includes(species);
}

async function createSSRMarker(req, res) {
    try {
        const { species } = req.params;
        const marker = req.body;
        
        if (!validateSpecies(species)) {
            return res.status(400).json({ error: '不支持的物种类型' });
        }

        const result = await ssrMarkersModel.createMarker(species, marker);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllSSRMarkers(req, res) {
    try {
        const { species } = req.params;
        
        if (!validateSpecies(species)) {
            return res.status(400).json({ error: '不支持的物种类型' });
        }

        const markersList = await ssrMarkersModel.getAllMarkers(species);
        res.json(markersList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRepeatSequenceStats(req, res) {
    try {
        const { species } = req.params;
        
        if (!validateSpecies(species)) {
            return res.status(400).json({ error: '不支持的物种类型' });
        }

        console.log(`正在获取 ${species} 的重复序列统计...`);
        const stats = await ssrMarkersModel.getRepeatSequenceStats(species);
        console.log('获取到的统计数据:', stats);
        res.json(stats);
    } catch (error) {
        console.error('获取重复序列统计失败:', error);
        res.status(500).json({ error: error.message });
    }
}

async function getRepeatLengthStats(req, res) {
    try {
        const { species } = req.params;
        
        if (!validateSpecies(species)) {
            return res.status(400).json({ error: '不支持的物种类型' });
        }

        console.log(`正在获取 ${species} 的重复序列长度统计...`);
        const stats = await ssrMarkersModel.getRepeatLengthStats(species);
        console.log('获取到的统计数据:', stats);
        res.json(stats);
    } catch (error) {
        console.error('获取重复序列长度统计失败:', error);
        res.status(500).json({ error: error.message });
    }
}

async function getBasicInfo(req, res) {
    try {
        const { species } = req.params;
        
        if (!validateSpecies(species)) {
            return res.status(400).json({ error: '不支持的物种类型' });
        }

        console.log(`正在获取 ${species} 的基本信息...`);
        const basicInfo = await ssrMarkersModel.getBasicInfo(species);
        console.log('获取到的基本信息:', basicInfo);
        res.json(basicInfo);
    } catch (error) {
        console.error('获取基本信息失败:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    createSSRMarker, 
    getAllSSRMarkers,
    getRepeatSequenceStats,
    getRepeatLengthStats,
    getBasicInfo
};
