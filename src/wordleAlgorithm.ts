export function wordleAlgorithm(
  wordList: string[],
  knownLetters: Map<string, Set<number>>
): string[] {
  if (knownLetters.size === 0) {
    return wordList;
  }

  let filteredList = new Array(...wordList);
  knownLetters.forEach((positions, letter) => {
    const correctPositions = Array.from(positions.values())
      .filter((n) => n > 0)
      .map((n) => n - 1);
    const incorrectPositions = Array.from(positions.values())
      .filter((n) => n < 0)
      .map((n) => -n - 1);
    const notPresent = positions.has(0);
    filteredList = filteredList.filter((word) => {
      if (notPresent && positions.size === 1) {
        return !word.includes(letter);
      } else {
        let result: boolean = true;
        correctPositions.forEach((pos) => (result &&= word[pos] === letter));
        incorrectPositions.forEach(
          (pos) => (result &&= word[pos] !== letter && word.includes(letter))
        );

        if (notPresent) {
          result &&= word.lastIndexOf(letter) === word.indexOf(letter);
        }

        return result;
      }
    });
  });

  return filteredList;
}
