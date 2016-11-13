import _ from 'lodash';
import Player from 'player';

describe('Player', function() {
  describe('.constructor', function() {
    it('can be called', function() {
      expect(Player).toBeFunction();
    });

    it('throws an Error when not given a name argument', function() {
      expect(function() {
        return new Player();
      }).toThrowError(Error, 'Player must be given a name');
    });
  });
});
