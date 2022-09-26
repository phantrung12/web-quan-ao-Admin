import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Route } from "react-router-dom";

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Route>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Route>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
