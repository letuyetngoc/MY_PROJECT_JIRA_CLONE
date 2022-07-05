import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App.js";
import GobalStyle from "./gobalStyle/index.js";
import { store } from "./redux/saga/rootSaga.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GobalStyle >
        <App />
      </GobalStyle>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
