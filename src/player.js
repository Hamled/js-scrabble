import _ from 'lodash';

var Player = function(name) {
  if(name === undefined) {
    throw new Error('Player must be given a name');
  }

  this.name = name;
  this.plays = [];
};

Player.prototype.play = function(word) {
  if(!_.isString(word)) {
    throw new Error('play must be called with a string argument');
  }
};

export default Player;
