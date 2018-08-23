import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";

ReactDom.render(
  <App initData={window.initData} />,
  document.getElementById("root")
);
