import _ from "lodash/fp";
import xs from "xstream";

export default function focusDriver(targets$) {
  targets$.addListener({
    next(element) {
      if (element) {
        element.focus();
      }
    },
    error: _.noop,
    complete: _.noop,
  });

  return xs.empty();
}
