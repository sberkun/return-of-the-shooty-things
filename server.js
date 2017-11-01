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
const peoples = [];
const testaaa = require('./backend/game.js').exportFunction(peoples);
//const awseoijh = require(./backend/player.js).exportFunction();//*********************************************

wss.on('connection', (ws) => {
  peoples[ws.id] = 7;//require(./backend/player.js).exportFunction();
  ws.on('message',(message) => {});
  ws.on('close', ()=>peoples.splice(ws.id,1) );
  ws.send(""+testaaa.peoples.length);
});

