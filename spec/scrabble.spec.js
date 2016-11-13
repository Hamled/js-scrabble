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
      expect(_.isFunction(Scrabble.score)).toBeTruthy();
    });

    it('returns undefined for empty arguments', function() {
      expect(Scrabble.score()).toBeUndefined();
    });

    it('returns zero for empty string', function() {
      expect(Scrabble.score('')).toEqual(0);
    });

    it('returns correct score for each letter', function() {
      _.each(Scrabble.LETTER_SCORES, function(score, letters) {
        _.each(letters, function(letter) {
          expect(Scrabble.score(letter)).toEqual(score);
        });
      });
    });

    it('returns correct score for multi-letter words', function() {
      var word = 'absurd';
      var scoreByLetters = _.sum(_.map(word, function(letter) {
        return Scrabble.score(letter);
      }));
      var scoreByWord = Scrabble.score(word);

      expect(scoreByWord).toEqual(scoreByLetters);
    });

    it('is case insensitive', function() {
      var lowerCaseScore = Scrabble.score('aperture');
      var mixedCaseScore = Scrabble.score('ApeRtUrE');
      var upperCaseScore = Scrabble.score('APERTURE');

      expect(lowerCaseScore).toEqual(mixedCaseScore);
      expect(lowerCaseScore).toEqual(upperCaseScore);
    });

    it('throws an Error when given non-letter characters', function() {
      var nonLetterChars = '1234567890!@#$%^&*()-=_+,.<>;\':"?/\\[]{}|`~';
      _.each(nonLetterChars, function(char) {
        expect(function() {
          return Scrabble.score(char);
        }).toThrowError(Error, `'${char}' is not a valid Scrabble letter`);
      });

      expect(function() {
        return Scrabble.score('multiple words');
      }).toThrowError(Error, `' ' is not a valid Scrabble letter`);
    });

    it('increases score by 50 for words greater than six letters', function() {
      var word = 'madden';
      var wordScore = Scrabble.score(word);
      var suffix = 's';
      var suffixScore = Scrabble.score(suffix);

      expect(Scrabble.score(word + suffix)).toEqual(wordScore + suffixScore + 50);
    });
  });

  describe('.highestScoreFrom', function() {
    it('can be called', function() {
      expect(_.isFunction(Scrabble.highestScoreFrom)).toBeTruthy();
    });

    it('throws an Error for no or non-array argument', function() {
      _.each([[], [undefined], [''], [0], [false]], function(args) {
        expect(function() {
          return Scrabble.highestScoreFrom.apply(undefined, args);
        }).toThrowError(Error, "highestScoreFrom must be called with an array argument");
      });
    });

    it('returns undefined for empty array', function() {
      expect(Scrabble.highestScoreFrom([])).toBeUndefined();
    });

    it('returns a word within given array of words', function() {
      var words = [
        'blimp',
        'fixie',
        'quart'
      ];

      var maxWord = Scrabble.highestScoreFrom(words);
      expect(maxWord).toBeString();
      expect(words).toContain(maxWord);
    });

    it('returns highest scoring word when no ties', function() {
      var words = [
        'fruits',
        'banana',
        'orange',
        'papaya'
      ];
      var scores = _.map(words, Scrabble.score);
      var maxWord = _.maxBy(words, Scrabble.score);

      // Sanity checks
      expect(_.uniq(scores)).toEqual(scores); // above words all have different scores
      expect(maxWord).not.toBeUndefined();

      _.each([words, _.reverse(words)], function(words) {
        expect(Scrabble.highestScoreFrom(words)).toEqual(maxWord);
      });
    });

    it('returns shorter word when highest scoring words tie', function() {
      var words = [
        'grape',
        'banana'
      ];
      var shortestWord = _.minBy(words, 'length');

      _.each([words, _.reverse(words)], function(words) {
        expect(Scrabble.highestScoreFrom(words)).toEqual(shortestWord);
      });
    });

    it('returns word with > 6 letters when tied for score', function() {
      var words = [
        'grapes',
        'bananas'
      ];
      var wordOverSixLetters = _.find(words, function(word) {
        return word.length > 6;
      });

      _.each([words, _.reverse(words)], function(words) {
        expect(Scrabble.highestScoreFrom(words)).toEqual(wordOverSixLetters);
      });
    });
  });
});
