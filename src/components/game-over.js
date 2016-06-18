import { div, h3, p, strong } from "@cycle/dom";

export default function GameOver({ props$ }) {
  const DOM = props$
    .map(({ isGameOver, counter }) => {
      const isHidden = (!isGameOver) && counter === 0;

      return div(".the-puzzle__game-over", {
        props: {
          hidden: isHidden,
        },
      }, [
        h3(".u-capitalize", ["Game over"]),
        p([
          "moves: ",
          strong([String(counter)]),
        ]),
      ]);
    });

  return {
    DOM,
  };
}
