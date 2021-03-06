import _ from 'lodash';

// Constructor
const Scrabble = function() {};

// Constants
Scrabble.LETTER_SCORES = {
  'aeioulnrst': 1,
  'dg': 2,
  'bcmp': 3,
  'fhvwy': 4,
  'k': 5,
  'jx': 8,
  'qz': 10
};

// Static functions
Scrabble.score = function(word) {
  if(word === undefined) {
    return word;
  }

  const wordScore = _.sum(_.map(word, function(letter) {
    const score = _.find(Scrabble.LETTER_SCORES, function(score, letters) {
      return letters.includes(letter.toLowerCase());
    });

    if(score === undefined) {
      throw new Error(`'${letter}' is not a valid Scrabble letter`);
    }

    return score;
  }));

  if(word.length > 6) {
    return wordScore + 50;
  } else {
    return wordScore;
  }
};

Scrabble.highestScoreFrom = function(words) {
  if(!_.isArray(words)) {
    throw new Error('highestScoreFrom must be called with an array argument');
  }

  const scoredWords = _.map(words, function(word) {
    return {
      word: word,
      length: word.length,
      score: Scrabble.score(word)
    };
  });

  const maxScoredWord = _.first(_.orderBy(scoredWords, ['score', 'length'], ['desc', 'asc']));
  if(maxScoredWord !== undefined) {
    return maxScoredWord.word;
  } else {
    return undefined;
  }
};

export default Scrabble;
