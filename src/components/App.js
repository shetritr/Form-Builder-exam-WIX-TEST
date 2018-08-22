import React from "react";
import Header from "./Header";
import ContestList from "./ContestList";

class App extends React.Component {
  state = {
    pageHeader: "Hello world 9",
    contests: this.props.init
  };

  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />

        <ContestList contests={this.state.contests} />
      </div>
    );
  }
}

export default App;
