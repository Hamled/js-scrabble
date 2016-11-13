import _ from 'lodash';
import Player from 'player';

describe('Player', function() {
  describe('.constructor', function() {
    it('can be called', function() {
      expect(Player).toBeFunction();
    });
  });
});
