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

    it('sets the player name', function() {
      var name = 'Player 1';
      var player = new Player(name);

      expect(player.name).toEqual(name);
    });
  });

  describe('#plays', function() {
    it('starts as an empty array', function() {
      var player = new Player('Player 1');

      expect(player.plays).toBeArray();
      expect(player.plays).toBeEmptyArray();
    });
  });

  describe('#play', function() {
    it('can be called', function() {
      var player = new Player('Player 1');

      expect(player.play).toBeFunction();
    });

    it('throws an Error for no or non-string argument', function() {
      var player = new Player('Player 1');

      _.each([[], [undefined], [[]], [0], [false]], function(args) {
        expect(function() {
          return player.play.apply(player, args);
        }).toThrowError(Error, 'play must be called with a string argument');
      });
    });
  });
});
