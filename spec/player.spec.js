import _ from 'lodash';
import Player from 'player';
import Scrabble from 'scrabble';

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

    it('increases in size by 1 when you play a new word', function() {
      var player = new Player('Player 1');
      var playsLength = player.plays.length;

      player.play('word');

      expect(player.plays.length).toEqual(playsLength + 1);
    });

    it('includes newly played words at end of array', function() {
      var player = new Player('Player 1');
      var words = [
        'strawberry',
        'cherry',
        'bilberry'
      ];

      _.each(words, function(word) {
        player.play(word);

        expect(_.last(player.plays)).toEqual(word);
      });
    });

    it('allows duplicate played words', function() {
      var player = new Player('Player 1');
      var word = 'blueberry';

      // Play the word at least once
      player.play(word);
      var oldWordCount = _.filter(player.plays, function(playedWord) {
        return playedWord === word;
      }).length;

      // Play it again, sam
      player.play(word);
      var newWordCount = _.filter(player.plays, function(playedWord) {
        return playedWord === word;
      }).length;

      expect(newWordCount).toEqual(oldWordCount + 1);
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

    it('throws an Error when given empty string', function() {
      var player = new Player('Player 1');

      expect(function() {
        return player.play('');
      }).toThrowError(Error, 'play must be called with a non-empty string');
    });
  });

  describe('#totalScore', function() {
    it('can be called', function() {
      var player = new Player('Player 1');

      expect(player.totalScore).toBeFunction();
    });

    it('returns the sum of the scores for entire #plays array', function() {
      var player = new Player('Player 1');
      var words = [
        'elderberry',
        'mulberry'
      ];
      var totalScore = _.sum(_.map(words, Scrabble.score));
      _.each(words, _.bind(player.play, player));

      expect(player.totalScore()).toEqual(totalScore);
    });
  });
});
