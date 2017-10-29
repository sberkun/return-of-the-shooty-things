'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use(express.static(path.join(__dirname, 'frontend')))
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const users = [];




var testaaa = require('backend/game.js').exportFunction();
wss.on('connection', (ws) => {
  users[ws.id] = {name:"anonymous"};
  ws.on('message',(message) => {});
  ws.on('close', ()=>users.splice(ws.id,1) );
  ws.send(""+testaaa);
});
/*
setInterval(() => {
  wss.clients.forEach((client) => {
    client.send('02:'+new Date().toTimeString());
  });
}, 1000);
*/
