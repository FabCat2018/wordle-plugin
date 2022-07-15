import { convertToKnownLetters, getTiles } from "./utils";

import { getAnswers } from "./wordle-dict";
import { wordleAlgorithm } from "./wordleAlgorithm";

// listen for our browserAction to be clicked
chrome.action.onClicked.addListener((tab) => {
  // for the current tab, inject the "inject.js" file & execute it
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id ? tab.id : -1 },
      func: () => run(),
      args: [],
    })
    .then();
});

function run(): void {
  const tiles = getTiles();
  const knownLetters = convertToKnownLetters(tiles);
  const solutions = wordleAlgorithm(getAnswers().answers, knownLetters);
  console.log(solutions);
}
