import React from "react";
import Header from "./Header";
import ContestList from "./ContestList";
import Contest from "./Contest";
import * as api from "../api";
import Table from "./Table";
import BuildPageLink from "./BuildPageLink";
import BuildF from "./BuildF";

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
        currentContestId: (event.state || {}).currentContestId,
        currentSubmissionsPageId: (event.state || {}).currentSubmissionsPageId
      });
    });
  }
  componentWillUnmount() {
    onPopState(null);
  }

  fetchSubmissions = (SubmissionsPageId, PageId) => {
    pushState(
      {
        currentSubmissionsPageId: SubmissionsPageId
      },
      "/Submissions/" + SubmissionsPageId
    );
    api.fetchSubmissions(PageId).then(Page => {
      this.setState({
        currentSubmissionsPageId: Page.name,
        currentContestId: PageId,
        currentSubmissionsPage: Page
      });
    });
  };

  fetchContest = contestId => {
    if (contestId > 0) {
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
    } else {
      pushState(
        {
          currentContestId: contestId
        },
        "/formbuilder"
      );
      this.setState({
        currentContestId: contestId
      });
    }
  };

  fetchContestsList = () => {
    pushState(
      {
        currentContestId: null,
        currentSubmissionsPageId: null
      },
      "/"
    );
    api.fetchContestsList().then(contests => {
      this.setState({
        currentContestId: null,
        currentSubmissionsPageId: null,
        contests
      });
    });
  };

  currentContenst() {
    if (this.state.currentContestId == 0) return { Name: "Form Builder" };
    return this.state.contests[this.state.currentContestId];
  }

  pageHeader() {
    if (this.state.currentSubmissionsPageId)
      return "Submissions Page :" + this.currentContenst().Name;
    if (this.state.currentContestId != undefined) {
      console.log(this.currentContenst());

      return this.currentContenst().Name;
    }

    return "Forms List Page";
  }

  currentContent() {
    if (this.state.currentSubmissionsPageId != undefined) {
      return [
        <Contest
          contestListClick={this.fetchContestsList}
          SubPage="1"
          {...this.state.currentSubmissionsPage}
        />,
        ""
      ];
    }

    if (this.state.currentContestId != undefined) {
      if (this.state.currentContestId < 1) {
        return [<BuildF addForm={this.addForm} />, ""];
      }
      return [
        <Contest
          onSubmissionsClick={this.addSubmission}
          formId={this.state.currentContestId}
          contestListClick={this.fetchContestsList}
          {...this.currentContenst()}
        />,
        ""
      ];
    }
    return [
      <ContestList
        onFormClick={this.fetchContest}
        onSubmissionsClick={this.fetchSubmissions}
        contests={this.state.contests}
      />,
      <BuildPageLink BuilderClick={this.fetchContest} />
    ];
  }

  addForm = (name, fields) => {
    api.addForm(name, fields).then(
      api.fetchContestsList().then(contests => {
        this.setState({
          contests
        });
      })
    );
    this.fetchContestsList();
    this.fetchContestsList();
  };

  addSubmission = (id, fields) => {
    api.addSubmission(id, fields).then(api.fetchContestsList());
  };

  switchState() {
    if (this.state.currentSubmissionsPageId != undefined) {
      {
        return (
          <table className="SubmissionsPage">
            <thead>
              <Table head={this.currentContenst().fields} />
            </thead>
            {this.currentContent()[0]}
          </table>
        );
      }
    }

    if (this.state.currentContestId != undefined) {
      {
        return this.currentContent()[0];
      }
    }

    return (
      <table className="Table">
        <thead>
          <Table />
        </thead>
        {this.currentContent()[0]}
      </table>
    );
  }

  render() {
    return (
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()[1]}
        {this.switchState()}
      </div>
    );
  }
}

export default App;
