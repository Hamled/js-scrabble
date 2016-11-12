import Scrabble from 'scrabble';
import _ from 'lodash';

describe('Scrabble', function() {
  describe('.LETTER_SCORES', function() {
    const getLetters = function(letterScores) {
      return _.keys(letterScores).reduce(function(a, b) {
        return a + b;
      });
    };

    it('includes all letters', function() {
      var allLetters = getLetters(Scrabble.LETTER_SCORES);
      expect(allLetters.length).toEqual(26);
    });

    it('includes no duplicates', function() {
      var allLetters = getLetters(Scrabble.LETTER_SCORES);
      expect(_.join(_.uniq(allLetters), '')).toEqual(allLetters);
    });
  });

  describe('.score', function() {
    it('can be called', function() {
      Scrabble.score();
    });

    it('returns correct score for each letter', function() {
      _.each(Scrabble.LETTER_SCORES, function(score, letters) {
        _.each(letters, function(letter) {
          expect(Scrabble.score(letter)).toEqual(score);
        });
      });
    });

    it('returns correct score for multi-letter words', function() {
      var word = 'abstruse';
      var scoreByLetters = _.sum(_.map(word, function(letter) {
        return Scrabble.score(letter);
      }));
      var scoreByWord = Scrabble.score(word);

      expect(scoreByWord).toEqual(scoreByLetters);
    });
  });
});
