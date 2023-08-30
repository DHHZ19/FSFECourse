const express = require('express');
const server = require('http').createServer();
const app = express();
const PORT = 3000;
app.get('/', ( req, res ) => {
    res.sendFile('index.html', {root: __dirname});
});

server.on('request', app);
server.listen( 3000,  () => console.log(`server started on PORT ${PORT}`));