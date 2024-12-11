// db/mongo.js
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";  // 替换为你的MongoDB URI
const client = new MongoClient(uri);

async function connect() {
    try {
        // 连接到 MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // 指定数据库
        const db = client.db('test');  // 替换为你的数据库名称
        return db;

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

// 导出数据库连接
module.exports = { connect, client };
