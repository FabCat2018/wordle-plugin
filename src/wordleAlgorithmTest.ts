import { wordleAlgorithm } from "./wordleAlgorithm";

function assertResultMatchesCondition(result: string[], expected: string[]) {
  for (let i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(expected[i]);
  }
  expect(result.length).toEqual(expected.length);
}

describe("Wordle Plugin", function () {
  it("should return the entire list when there are no known letters", function () {
    const wordList = ["aa", "bb", "cc"];
    const result = wordleAlgorithm(wordList, []);
    assertResultMatchesCondition(result, wordList);
  });

  it("should return words containing one known letter", function () {
    const wordList = ["ba", "bb", "bc"];
    const result = wordleAlgorithm(wordList, [{ letter: "a", position: -1 }]);
    assertResultMatchesCondition(result, ["ba"]);
  });

  it("should return words containing both known letters", function () {
    const wordList = ["ab", "bc", "ac"];
    const result = wordleAlgorithm(wordList, [
      { letter: "b", position: -2 },
      { letter: "c", position: -1 },
    ]);
    assertResultMatchesCondition(result, ["bc"]);
  });

  it("should return words with the letter not present", function() {
    const wordList = ["abd", "bc", "cad"];
    const result = wordleAlgorithm(wordList, [{letter: "d", position: 0}])
    assertResultMatchesCondition(result, ["bc"])
  })

  it("should return words with the letter at the specified position", function () {
    const wordList = ["ab", "bc", "ca"];
    const result = wordleAlgorithm(wordList, [{ letter: "a", position: 1 }]);
    assertResultMatchesCondition(result, ["ab"]);
  });

  it("should return words containing two known letters, one with position specified", function () {
    const wordList = ["ab", "bc", "ac", "cb"];
    const result = wordleAlgorithm(wordList, [
      { letter: "b", position: 1 },
      { letter: "c", position: -1 },
    ]);
    assertResultMatchesCondition(result, ["bc"]);
  });

  it("should return words containing a known letter at unknown position", function () {
    const wordList = ["ab", "bc", "ac"];
    const result = wordleAlgorithm(wordList, [{ letter: "b", position: -1 }]);
    assertResultMatchesCondition(result, ["ab"]);
  });
});
