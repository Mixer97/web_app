
const path = require('path')
const express = require('express');
const server = express();

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3001, () => {
    console.log("Server attivo!");
});



