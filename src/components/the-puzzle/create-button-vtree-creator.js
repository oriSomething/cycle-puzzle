import _ from "lodash/fp";
import { button } from "@cycle/dom";

export default function createButtonVTreeCreator(puzzle, intentSelector, buttonId) {
  const puzzleRowSize = Math.sqrt(puzzle.length);
  const x = _.indexOf(buttonId)(puzzle) % puzzleRowSize;
  const y = _.indexOf(buttonId)(puzzle) / puzzleRowSize | 0;

  return button(`.the-puzzle__button${intentSelector}`, {
    type: "button",
    attrs: {
      "data-id": String(buttonId),
    },
    style: {
      left: `calc(100% / ${puzzleRowSize} * ${x} + 1px)`,
      top: `calc(100% / ${puzzleRowSize} * ${y} + 1px)`,
      width: `calc(100% / ${puzzleRowSize} - 2px)`,
      height: `calc(100% / ${puzzleRowSize} - 2px)`,
    },
  }, String(buttonId));
}
