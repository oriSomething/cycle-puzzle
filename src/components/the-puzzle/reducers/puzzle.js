import _ from "lodash/fp";
import arraySwap from "../../../utilities/array-swap";

function isIndexOnTheSameRow(matrixRowSize, index1, index2) {
  return Math.floor(index1 / matrixRowSize) === Math.floor(index2 / matrixRowSize);
}

export default function puzzleReducer(state, buttonId = 0) {
  const { puzzle } = state;
  const puzzleRowSize = Math.sqrt(puzzle.length);
  const index = _.findIndex((value) => value === buttonId, puzzle);

  // 0 is for none movable button (or empty cell)
  if (buttonId === 0) {
    return state;
  }

  // Right
  if (puzzle[index + 1] === 0 && isIndexOnTheSameRow(puzzleRowSize, index, index + 1)) {
    return {
      ...state,
      puzzle: arraySwap(puzzle, index, index + 1),
      counter: state.counter + 1,
    };
  }

  // Left
  if (puzzle[index - 1] === 0 && isIndexOnTheSameRow(puzzleRowSize, index, index - 1)) {
    return {
      ...state,
      puzzle: arraySwap(puzzle, index - 1, index),
      counter: state.counter + 1,
    };
  }

  // Up
  if (puzzle[index - puzzleRowSize] === 0) {
    return {
      ...state,
      puzzle: arraySwap(puzzle, index - puzzleRowSize, index),
      counter: state.counter + 1,
    };
  }

  // Down
  if (puzzle[index + puzzleRowSize] === 0) {
    return {
      ...state,
      puzzle: arraySwap(puzzle, index + puzzleRowSize, index),
      counter: state.counter + 1,
    };
  }

  return state;
}
