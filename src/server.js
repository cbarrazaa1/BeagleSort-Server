const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Player = require('./Player');
const Game = require('./Game');
const firebase = require('firebase');

const gameQueue = [];
const games = [];

// check for games that have ended
setInterval(() => {
  let endedGameIndices = [];
  games.forEach((game, i) => {
    if (game.hasEnded) {
      endedGameIndices.push(i);
    }
  });

  endedGameIndices.forEach(i => {
    games.splice(i, 1);
  });
}, 30000);

io.on('connection', socket => {
  console.log(`User connected with socket ID ${socket.conn.id}`);

  socket.on('enter_game_queue', (name, id) => {
    // check if someone else is in queue
    if (gameQueue.length > 0) {
      const firstPlayer = gameQueue.shift();
      const secondPlayer = new Player(socket, name, id);

      const game = new Game(firstPlayer, secondPlayer);
      firstPlayer.game = game;
      secondPlayer.game = game;

      firstPlayer.socket.emit('entered_game', {
        otherPlayerName: secondPlayer.name,
        algorithm: game.algorithm,
        arr: game.arr,
      });
      secondPlayer.socket.emit('entered_game', {
        otherPlayerName: firstPlayer.name,
        algorithm: game.algorithm,
        arr: game.arr,
      });

      games.push(game);
      return;
    }

    // add to queue
    gameQueue.push(new Player(socket, name, id));
    socket.emit('waiting_queue');
  });
});

http.listen(3000, () => {
  console.log('Listening on port 3000.');
  firebase.initializeApp({
    apiKey: 'AIzaSyBbujcUj47GXROPuxYDByZSCXE_VnZfJ3c',
    authDomain: 'beaglesort.firebaseapp.com',
    databaseURL: 'https://beaglesort.firebaseio.com',
    projectId: 'beaglesort',
    storageBucket: 'beaglesort.appspot.com',
    messagingSenderId: '66864649145',
    appId: '1:66864649145:web:6a869c40e72c2122779c68',
    measurementId: 'G-02QN7XNLWQ',
  });
});
