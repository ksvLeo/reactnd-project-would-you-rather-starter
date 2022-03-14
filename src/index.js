import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import usersReducer from "./reducers/users";
import questionsReducer from "./reducers/questions";
import sessionReducer from "./reducers/session";
import {
  loadingBarMiddleware,
  loadingBarReducer,
} from "react-redux-loading-bar";

const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    session: sessionReducer,
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
