// models/ssrMarkers.js
const { connect } = require('../../config/database');

// 根据物种名称获取对应的collection
async function getCollectionBySpecies(speciesName) {
    const db = await connect();
    const collectionName = `Broussonetia ${speciesName}`;
    return db.collection(collectionName);
}

// 创建SSR标记
async function createMarker(species, marker) {
    const collection = await getCollectionBySpecies(species);
    return collection.insertOne(marker);
}

// 获取所有SSR标记
async function getAllMarkers(species) {
    const collection = await getCollectionBySpecies(species);
    return collection.find().toArray();
}

// 获取重复序列统计信息
async function getRepeatSequenceStats(speciesName) {
    try {
        console.log(`连接到数据库集合: Broussonetia ${speciesName}`);
        const collection = await getCollectionBySpecies(speciesName);
        
        console.log('获取所有序列ID...');
        const seqids = await collection.distinct("seqid");
        console.log('找到的序列ID:', seqids);

        const stats = {};
        for (const seqid of seqids) {
            console.log(`处理序列 ${seqid} 的统计...`);
            const result = await collection.aggregate([
                { $match: { seqid: seqid } },
                { $group: {
                    _id: "$repeat_sequence",
                    count: { $sum: 1 }
                }},
                { $sort: { count: -1 } }
            ]).toArray();
            
            stats[seqid] = result;
        }
        
        return stats;
    } catch (error) {
        console.error('统计过程中发生错误:', error);
        throw error;
    }
}

// 统计每个序列中不同长度重复序列的数量
async function getRepeatLengthStats(speciesName) {
    try {
        console.log(`连接到数据库集合: Broussonetia ${speciesName}`);
        const collection = await getCollectionBySpecies(speciesName);
        
        console.log('获取所有序列ID...');
        const seqids = await collection.distinct("seqid");
        console.log('找到的序列ID:', seqids);

        const stats = {};
        for (const seqid of seqids) {
            console.log(`处理序列 ${seqid} 的统计...`);
            const result = await collection.aggregate([
                { $match: { 
                    seqid: seqid,
                    repeat_sequence: { $ne: null }  // 过滤掉 null 值
                }},
                {
                    $addFields: {
                        repeatLength: { 
                            $cond: {
                                if: { $ne: ["$repeat_sequence", null] },
                                then: { $strLenCP: "$repeat_sequence" },
                                else: 0
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$repeatLength", 1] }, then: "单碱基重复" },
                                    { case: { $eq: ["$repeatLength", 2] }, then: "双碱基重复" },
                                    { case: { $eq: ["$repeatLength", 3] }, then: "三碱基重复" }
                                ],
                                default: "多碱基重复"
                            }
                        },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { "_id": 1 } }
            ]).toArray();
            
            stats[seqid] = result;
        }
        
        return stats;
    } catch (error) {
        console.error('统计过程中发生错误:', error);
        throw error;
    }
}

// 获取基本信息统计
async function getBasicInfo(speciesName) {
    try {
        console.log(`连接到数据库集合: Broussonetia ${speciesName}`);
        const collection = await getCollectionBySpecies(speciesName);
        
        console.log('获取所有序列ID...');
        const seqids = await collection.distinct("seqid");
        console.log('找到的序列ID:', seqids);

        const stats = {};
        for (const seqid of seqids) {
            console.log(`处理序列 ${seqid} 的统计...`);
            const result = await collection.aggregate([
                { 
                    $match: { 
                        seqid: seqid
                    }
                },
                {
                    $project: {
                        _id: 0,
                        ID: 1,
                        seqid: 1,
                        source: 1,
                        type: 1,
                        start: 1,
                        end: 1,
                        strand: 1,
                        phase: 1,
                        repeat_info: 1,
                        repeat_sequence: 1,
                        repeat_count: 1
                    }
                }
            ]).toArray();
            
            stats[seqid] = result;
        }
        
        return stats;
    } catch (error) {
        console.error('获取基本信息统计失败:', error);
        throw error;
    }
}

module.exports = {
    createMarker,
    getAllMarkers,
    getRepeatSequenceStats,
    getCollectionBySpecies,
    getRepeatLengthStats,
    getBasicInfo
};
