var Player = function(name) {
  if(name === undefined) {
    throw new Error('Player must be given a name');
  }

  this.name = name;
  this.plays = [];
};

Player.prototype.play = function(word) {
};

export default Player;
