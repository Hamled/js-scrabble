var Player = function(name) {
  if(name === undefined) {
    throw new Error('Player must be given a name');
  }

  this.name = name;
};

export default Player;
