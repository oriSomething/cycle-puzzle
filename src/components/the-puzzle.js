import _ from "lodash/fp";
import { div, h3 } from "@cycle/dom";
import { ARROW_KEYS } from "../constants/keys";
import createButtonVTreeCreator from "./the-puzzle/create-button-vtree-creator";
import createPuzzleProps$ from "./the-puzzle/create-puzzle-props$";
import puzzleReducer from "./the-puzzle/reducers/puzzle";
import focusReducer from "./the-puzzle/reducers/focus";
import isCompletePuzzleReducer from "./the-puzzle/reducers/is-complete-puzzle";

const CELL_SELECTOR = ".js-button";

function intent(DOM) {
  return DOM
    .select(CELL_SELECTOR)
    .events("click")
    .map(event => Number(event.target.dataset.id));
}

function model(props$, intent$) {
  return props$
    .map((initialProps) => intent$.fold(puzzleReducer, initialProps))
    .flatten()
    .map(isCompletePuzzleReducer)
    .remember();
}

function view(state$) {
  return state$
    .map(({ puzzle, counter, isGameOver }) => {
      const createButtonsVTree = _.compose(
        _.map(cellId => createButtonVTreeCreator(puzzle, CELL_SELECTOR, cellId)),
        _.sortBy((cellId) => cellId),
        _.reject(cellId => cellId === 0)
      );

      return div(".the-puzzle", [
        div(".the-puzzle__board", {
          class: {
            "the-puzzle__board--entering": counter === 0,
            "the-puzzle__board--leaving": isGameOver,
          },
        }, [
          div(".the-puzzle__buttons", createButtonsVTree(puzzle)),
        ]),
        h3(".the-puzzle__counter", {
          class: { "the-puzzle__counter--invisible": isGameOver },
        }, [`Moves: ${counter}`]),
      ]);
    });
}

function focus(DOM, state$) {
  return DOM.select(CELL_SELECTOR)
    .events("keydown")
    .filter((event) => ARROW_KEYS.some(KEY => event.key === KEY))
    .map((event) => {
      return state$
        .take(1)
        .map(({ puzzle }) => focusReducer(puzzle, event));
    })
    .flatten();
}

export default function ThePuzzle({ DOM, props$ = createPuzzleProps$({ puzzleSize: 4 }) }) {
  const intent$ = intent(DOM);
  const state$ = model(props$, intent$);

  return {
    DOM: view(state$),
    Focus: focus(DOM, state$),
    state$,
  };
}
