import _ from 'lodash';
import Scrabble from 'scrabble';

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

  if(_.isEmpty(word)) {
    throw new Error('play must be called with a non-empty string');
  }

  this.plays.push(word);
};

Player.prototype.totalScore = function() {
  return _.sum(_.map(this.plays, Scrabble.score));
};

Player.prototype.hasWon = function() {
  return this.totalScore() > 100;
};

Player.prototype.highestScoringWord = function() {
  return Scrabble.highestScoreFrom(this.plays);
};

export default Player;
