var Player = function(name) {
  if(name === undefined) {
    throw new Error('Player must be given a name');
  }
};

export default Player;
