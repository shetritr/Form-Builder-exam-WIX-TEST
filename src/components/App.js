import React from "react";
import Header from "./Header";

const App = props => {
  return (
    <div>
      <Header message="hello world 4" />
      <h2> {props.headerMessage}</h2>
      <div>fgdfgdfgdfgdfg</div>
    </div>
  );
};

export default App;
