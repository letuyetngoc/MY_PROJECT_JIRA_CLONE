import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import GobalStyle from "./gobalStyle/index.js";

ReactDOM.render(
  <React.StrictMode>
    <GobalStyle>
      <App />
    </GobalStyle>
  </React.StrictMode>,
  document.getElementById("root")
);
