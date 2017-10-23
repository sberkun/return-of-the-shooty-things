'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const users = [];

wss.on('connection', (ws) => {
  console.log('Client connected');
  users[ws.id] = {name:"anonymous"};
  ws.on('message',(message) => {
    users[ws.id]['name'] = message;
    ws.send('00:'+users[ws.id]['name']);
  });
  ws.on('close', () => {
    users.splice(ws.id,1);
    console.log('Client disconnected');
    wss.clients.forEach((client) => client.send('01:'+wss.clients.length));
  });
  ws.send('00:'+users[ws.id]['name']);
  wss.clients.forEach((client) => client.send('01:'+wss.clients.length));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send('02:'+new Date().toTimeString());
  });
}, 1000);
