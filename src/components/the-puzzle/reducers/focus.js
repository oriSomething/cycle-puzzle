import _ from "lodash/fp";
import  {
  ARROW_UP_KEY,
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
} from "../../../constants/keys";

export default function focusReducer(puzzle, { target: element, key: eventKey }) {
  const puzzleRowSize = Math.sqrt(puzzle.length);
  const buttonId = Number(event.target.dataset.id);
  const index = _.findIndex(x => x === buttonId, puzzle);

  function findElement(index) {
    if (puzzle[index] !== 0) {
      return _.find((element) => {
        return Number(element.dataset.id) === puzzle[index];
      })(element.parentElement.children);
    }
  }

  switch (eventKey) {
  case ARROW_UP_KEY:
    return (
      index - puzzleRowSize < 0 ?
        null :
        findElement(index - puzzleRowSize)
    );

  case ARROW_DOWN_KEY:
    return (
      index + puzzleRowSize > puzzle.length + 1 ?
        null :
        findElement(index + puzzleRowSize)
    );

  case ARROW_LEFT_KEY:
    return (
      index % puzzleRowSize === 0 ?
        null :
        findElement(index - 1)
    );

  case ARROW_RIGHT_KEY:
    return (
      index % puzzleRowSize === puzzleRowSize - 1 ?
        null :
        findElement(index + 1)
    );
  }

  return null;
}
