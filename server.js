const express = require('express');
const postRouter = require('./post-router.js');
const data = require('./data/db.js');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
    res.send(`
    <h1>Project API</h1>`);
});


module.exports = server;