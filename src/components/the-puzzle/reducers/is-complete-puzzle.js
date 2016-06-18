import _ from "lodash/fp";

const getWinninigPuzzle = _.memoize(_.compose(
  _.sortBy((value) => value === 0 ? Infinity : value),
  _.range(0)
));

export default function isCompletePuzzleReducer(state) {
  const { puzzle } = state;
  const winningPuzzle = getWinninigPuzzle(puzzle.length);

  return {
    ...state,
    isGameOver: _.isEqual(puzzle, winningPuzzle),
  };
}
