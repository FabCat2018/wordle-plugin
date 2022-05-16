export function wordleAlgorithm(
  wordList: string[],
  knownLetters: { letter: string; position: number }[]
): string[] {
  if (knownLetters.length === 0) {
    return wordList;
  }

  let filteredList = wordList;
  knownLetters.forEach((requiredMatch) => {
    filteredList = filteredList.filter((word) => {
      let index = Math.abs(requiredMatch.position) - 1;

      if (requiredMatch.position < 0) {
        return (
          word[index] !== requiredMatch.letter &&
          word.includes(requiredMatch.letter)
        );
      } else {
        return word[index] === requiredMatch.letter;
      }
    });
  });

  return filteredList;
}
