const TileState = {
  Correct: "correct",
  Present: "present",
  Absent: "absent",
};

export function getTiles(): { text: string; state: string }[] {
  const allTiles = document.querySelectorAll(
    '[data-testid="tile"]'
  ) as NodeListOf<HTMLElement>;
  return Array.from(allTiles)
    .map((entry) => {
      return {
        text: entry.textContent || "",
        state: entry.dataset.state?.toString() || "",
      };
    })
    .filter((entry) => entry.text !== "");
}

export function convertToKnownLetters(
  tiles: { text: string; state: string }[]
): Map<string, Set<number>> {
  const knownLetters = new Map<string, Set<number>>();
  for (let i = 0; i < tiles.length; i++) {
    const tileState = tiles[i].state;
    const tileText = tiles[i].text;
    let rowNumber = (i % 5) + 1;

    if (tileState === TileState.Absent) {
      rowNumber = 0;
    } else if (tileState === TileState.Present) {
      rowNumber *= -1;
    }

    if (knownLetters.has(tileText)) {
      knownLetters.set(
        tileText,
        new Set<number>(knownLetters.get(tileText)).add(rowNumber)
      );
    } else {
      knownLetters.set(tileText, new Set<number>().add(rowNumber));
    }
  }

  return knownLetters;
}
