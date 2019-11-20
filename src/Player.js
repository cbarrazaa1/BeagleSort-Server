const ArrayState = require('./ArrayState');

class Player {
  constructor(socket, name, id) {
    this.socket = socket;
    this.name = name;
    this.arrState = null;
    this.stateIndex = 1;
    this.game = null;
    this.id = id;

    const self = this;
    this.socket.on('player_move', function(fromIndex, toIndex) {
      self.game.playerMove(self, fromIndex, toIndex);
    });

    this.socket.on('player_exit_early', function() {
      self.game.playerExitEarly(self);
    });
  }

  destroy() {
    this.socket.removeAllListeners('player_move');
  }
}

module.exports = Player;
