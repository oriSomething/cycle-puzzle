import { run } from "@cycle/xstream-run";
import { makeDOMDriver } from "@cycle/dom";
import focusDriver from "./drivers/focus";
import App from "./components/app";

const drivers = {
  DOM: makeDOMDriver("#main"),
  Focus: focusDriver,
};

run(App, drivers);
