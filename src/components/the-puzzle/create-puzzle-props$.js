import xs from "xstream";
import _ from "lodash/fp";

export function createPuzzle(size = 4) {
  const puzzle = _.shuffle(_.range(0, Math.pow(size, 2)));
  return puzzle;
}

export default function createPuzzleProps$({ puzzle: _puzzle, puzzleSize }) {
  const puzzle = _.isArray(_puzzle) ? _puzzle : createPuzzle(puzzleSize);

  return xs.of({
    isGameOver: false,
    counter: 0,
    puzzle,
  });
}
