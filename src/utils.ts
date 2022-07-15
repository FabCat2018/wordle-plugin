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
): { letter: string; position: number }[] {
  const knownLetters: { letter: string; position: number }[] = [];
  for (let i = 0; i < tiles.length; i++) {
    let rowNumber = (i % 5) + 1;

    if (tiles[i].state === TileState.Absent) {
      rowNumber = 0;
    } else if (tiles[i].state === TileState.Present) {
      rowNumber *= -1;
    }

    knownLetters.push({ letter: tiles[i].text, position: rowNumber });
  }

  return knownLetters;
}
