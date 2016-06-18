import xs from "xstream";
import { button, div, input, label, span } from "@cycle/dom";
import ThePuzzle from "./the-puzzle";
import GameOver from "./game-over";
import createPuzzleProps$ from "./the-puzzle/create-puzzle-props$";

const MIN_PUZZLE_SIZE = 3;
const MAX_PUZZLE_SIZE = 6;
const DEFAULT_PUZZLE_SIZE = 4;

function view(state$) {
  return state$
    .map(([thePuzzleVTree, gameOverVTree, puzzleRisizerValue]) => {
      return div(".page-layout", [
        div(".page-layout__game", [
          div(".page-layout__game__gameover", [
            div(".page-layout__game__gameover__centerer", [
              gameOverVTree,
            ]),
          ]),
          thePuzzleVTree,
        ]),
        div(".page-layout__controls.controls", [
          div(".controls__layout", [
            button(".new-game-button.js-new-game", {
              type: "button",
            }, ["new game"]),
            label(".puzzle-sizer", [
              input(".puzzle-sizer__range.js-puzzle-sizer", {
                props: {
                  type: "range",
                  step: 1,
                  min: MIN_PUZZLE_SIZE,
                  max: MAX_PUZZLE_SIZE,
                  value: puzzleRisizerValue,
                },
              }),
              span(".puzzle-sizer__label", [`size: ${puzzleRisizerValue}`]),
            ]),
          ]),
        ]),
      ]);
    });
}

export default function App({ DOM }) {
  const newGameButtonIntent$ = DOM.select(".js-new-game")
    .events("click")
    .startWith(null);

  const puzzleRisizerValue$ = DOM.select(".js-puzzle-sizer")
    .events("input")
    .map(event => Number(event.target.value))
    .startWith(DEFAULT_PUZZLE_SIZE);

  // The `newGameButtonIntent$` is an unneeded value. It only used as an event
  // handler for restarting a new game
  const puzzleProps$ = xs.combine(puzzleRisizerValue$, newGameButtonIntent$)
    .map(([puzzleSize, __]) => createPuzzleProps$({ puzzleSize }))
    .flatten();

  const thePuzzle = ThePuzzle({ DOM, props$: puzzleProps$ });
  const gameOver = GameOver({ props$: thePuzzle.state$ });
  const state$ = xs.combine(thePuzzle.DOM, gameOver.DOM, puzzleRisizerValue$);
  const vTree$ = view(state$);

  return {
    DOM: vTree$,
    Focus: thePuzzle.Focus,
  };
}
