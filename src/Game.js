const BubbleSort = require('./algorithms/BubbleSort');
const ArrayState = require('./ArrayState');
const firebase = require('firebase');
require('firebase/database');

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.hasEnded = false;
    this.states = [];

    // generate array
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(Math.floor(Math.random() * 10));
    }
    this.arr = arr;

    // generate algorithm
    this.algorithm = 'BubbleSort';

    // generate states
    switch (this.algorithm) {
      case 'BubbleSort':
        this.states = BubbleSort.generateArrayStates(arr);
        break;
    }

    // set player states
    this.player1.arrState = new ArrayState([0, 1, 2, 3, 4, 5, 6]);
    this.player2.arrState = new ArrayState([0, 1, 2, 3, 4, 5, 6]);
  }
}

var a = 0;
Game.prototype.playerMove = function(player, fromIndex, toIndex) {
  // swap state
  const temp = player.arrState.arr[fromIndex];
  player.arrState.arr[fromIndex] = player.arrState.arr[toIndex];
  player.arrState.arr[toIndex] = temp;

  // verify state
  let res = 'Incorrecto';
  if (player.arrState.compareWith(this.states[player.stateIndex])) {
    res = 'Correcto';
    player.stateIndex++;
  }

  // send to player
  player.socket.emit('player_move_response', {res});

  // send to other player
  let otherPlayer = null;
  if (player === this.player1) {
    otherPlayer = this.player2;
  } else {
    otherPlayer = this.player1;
  }
  otherPlayer.socket.emit('other_player_move', {fromIndex, toIndex});

  // check if current player won
  if (res === 'Correcto' && player.stateIndex === this.states.length) {
    player.socket.emit('game_ended', {won: true});
    otherPlayer.socket.emit('game_ended', {won: false});
    this.hasEnded = true;

    // update user that won
    const userRef = firebase.database().ref(`/users/${player.id}`);
    userRef.once('value', snapshot => {
      const user = snapshot.val();

      if (user != null) {
        userRef.set({
          username: player.name,
          won: user.won + 1,
          lost: user.lost,
        });
      } else {
        userRef.set({
          username: player.name,
          won: 1,
          lost: 0,
        });
      }
    });

    // update user that lost
    const otherUserRef = firebase.database().ref(`/users/${otherPlayer.id}`);
    otherUserRef.once('value', snapshot => {
      const user = snapshot.val();

      if (user != null) {
        otherUserRef.set({
          username: otherPlayer.name,
          won: user.won,
          lost: user.lost + 1,
        });
      } else {
        otherUserRef.set({
          username: otherPlayer.name,
          won: 0,
          lost: 1,
        });
      }
    });

    this.player1.destroy();
    this.player2.destroy();
  }
};

module.exports = Game;
