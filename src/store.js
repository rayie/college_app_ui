import { connectRouter, routerMiddleware } from "connected-react-router";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { landing, me } from "./ar/me.red.js";
const createHistory = require("history").createBrowserHistory;
const enhancers = [];

export const history = createHistory();

const rootReducer = combineReducers({ me, landing });
const initialState = {
  me: { note: "initial note state in store" },
  landing: {},
};
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
);
