// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }

    }
  }
  return letterPoints;
}

function initialPrompt() {
  console.log("Let's play some scrabble!");

  return input.question("Enter a word to score: ");
};

let simpleScorer = word => word.length;

// let vowelBonusScorer = word => {
//   let score = 0;
//   let vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
//   for (let char of word) {
//     if (vowels.includes(char)) {
//       score += 3;
//     } else {
//       score += 1;
//     }
//   }
//   return score;
// };

// let vowelBonusScore2 = word => {
//   let score = 0;
//   for (let charFromWord of word) {
//     if ("aeiouy".includes(charFromWord)) {
//       score += 3;
//     } else {
//       score += 1;
//     }
//   }
//   return score;
// };

let vowelBonusScorer = word => {
  const vowelWord = word.replace(/[^aeiouy]/gi, "");
  return word.length + 2 * vowelWord.length;
};

let scrabbleScorer = word => {
  let score = 0;
  for (const char of word.toLowerCase()) {
    score += newPointStructure[char];
  }
  return score;
};

const scoringAlgorithms = [
  {
    name: "Simple score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer
  }
];

function scorerPrompt() { 
  console.log("\nScoring algorithms available: ")    
  for (let i = 0; i < scoringAlgorithms.length; i++) {
   console.log(`\t${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
  }
  while (true) {
    const algIndex = input.question("\nSelect a scoring algorithm: ");
    if (algIndex >= 0 && algIndex < scoringAlgorithms.length) {
      return scoringAlgorithms[algIndex];
    }
    console.log("Please enter a number between 0 and 2.");
  }

}

function transform(oldObject) {
  const newObject = {};
  for (const score in oldObject) {
    for (const letter of oldObject[score]) {
      newObject[letter.toLowerCase()] = Number(score);
    }
  }
  return newObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  const word = initialPrompt();
  const scorer = scorerPrompt();
  console.log(`The score for '${word}': ${scorer.scorerFunction(word)}`)
}

module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};
