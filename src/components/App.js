import React from "react";
import Header from "./Header";
import ContestList from "./ContestList";
import Contest from "./Contest";
import * as api from "../api";
import Table from "./Table";

const pushState = (obj, url) => {
  window.history.pushState(obj, "", url);
};

const onPopState = handler => {
  window.onpopstate = handler;
};

class App extends React.Component {
  state = this.props.initData;

  componentDidMount() {
    onPopState(event => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      });
    });
  }
  componentWillUnmount() {
    onPopState(null);
  }

  fetchContest = contestId => {
    pushState(
      {
        currentContestId: contestId
      },
      "/contest/" + contestId
    );
    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest.id,
        contests: {
          ...this.state.contests,
          [contest.id]: contest
        }
      });
    });
  };

  fetchContestsList = () => {
    pushState(
      {
        currentContestId: null
      },
      "/"
    );
    api.fetchContestsList().then(contests => {
      this.setState({
        currentContestId: null,
        contests
      });
    });
  };

  currentContenst() {
    return this.state.contests[this.state.currentContestId];
  }

  pageHeader() {
    if (this.state.currentContestId) {
      return this.currentContenst().contestName;
    }

    return "Forms List Page";
  }

  currentContent() {
    if (this.state.currentContestId) {
      return (
        <Contest
          contestListClick={this.fetchContestsList}
          {...this.currentContenst()}
        />
      );
    }
    return (
      <ContestList
        onContestClick={this.fetchContest}
        contests={this.state.contests}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <Header message={this.pageHeader()} />
        <Table />
        {/* {this.currentContent()} */}
      </div>
    );
  }
}

export default App;
