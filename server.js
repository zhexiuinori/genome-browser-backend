// server.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const routes = require('./app/routes');
// connectToDatabase();

// Middlewares
app.use(cors());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // 用于解析JSON格式的请求体

app.use('/api', routes);

// 路由


// Start the server
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

});