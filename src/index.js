import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";

ReactDom.render(
  <App init={window.initData.contests} />,
  document.getElementById("root")
);
