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
    const result = wordleAlgorithm(wordList, new Map<string, Set<number>>());
    assertResultMatchesCondition(result, wordList);
  });

  it("should return words containing one known letter", function () {
    const wordList = ["ba", "bb", "bc"];
    const knownLetters = new Map<string, Set<number>>().set(
      "a",
      new Set<number>().add(-1)
    );
    const result = wordleAlgorithm(wordList, knownLetters);
    assertResultMatchesCondition(result, ["ba"]);
  });

  it("should return words containing both known letters", function () {
    const wordList = ["ab", "bc", "ac"];
    const knownLetters = new Map<string, Set<number>>()
      .set("b", new Set<number>().add(-2))
      .set("c", new Set<number>().add(-1));
    const result = wordleAlgorithm(wordList, knownLetters);
    assertResultMatchesCondition(result, ["bc"]);
  });

  it("should return words with the letter not present", function () {
    const wordList = ["abd", "bc", "cad"];
    const knownLetters = new Map<string, Set<number>>().set(
      "d",
      new Set<number>().add(0)
    );
    const result = wordleAlgorithm(wordList, knownLetters);
    assertResultMatchesCondition(result, ["bc"]);
  });

  it("should return words with the letter at the specified position", function () {
    const wordList = ["ab", "bc", "ca"];
    const knownLetters = new Map<string, Set<number>>().set(
      "a",
      new Set<number>().add(1)
    );
    const result = wordleAlgorithm(wordList, knownLetters);
    assertResultMatchesCondition(result, ["ab"]);
  });

  it("should return words with the letter only present once", function () {
    const wordList = ["abac", "bbaa", "cabd"];
    const knownLetters = new Map<string, Set<number>>()
      .set("a", new Set<number>().add(-1).add(0));
    const result = wordleAlgorithm(wordList, knownLetters);
    assertResultMatchesCondition(result, ["cabd"]);
  });

  it("should return words containing two known letters, one with position specified", function () {
    const wordList = ["ab", "bc", "ac", "cb"];
    const knownLetters = new Map<string, Set<number>>()
      .set("b", new Set<number>().add(1))
      .set("c", new Set<number>().add(-1));
    const result = wordleAlgorithm(wordList, knownLetters);
    assertResultMatchesCondition(result, ["bc"]);
  });

  it("should return words containing a known letter at unknown position", function () {
    const wordList = ["ab", "bc", "ac"];
    const knownLetters = new Map<string, Set<number>>().set(
      "b",
      new Set<number>().add(-1)
    );
    const result = wordleAlgorithm(wordList, knownLetters);
    assertResultMatchesCondition(result, ["ab"]);
  });
});
