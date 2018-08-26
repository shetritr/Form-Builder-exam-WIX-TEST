import React from "react";
import Header from "./Header";
import FormList from "./FormList";
import Form from "./Form";
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
        currentFormId: (event.state || {}).currentFormId,
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
        currentSubmissionsPageId: Page.Name,
        currentFormId: PageId,
        currentSubmissionsPage: Page
      });
    });
  };

  fetchForm = formId => {
    if (formId > 0) {
      pushState(
        {
          currentFormId: formId
        },
        "/form/" + formId
      );
      api.fetchForm(formId).then(form => {
        this.setState({
          currentFormId: form.id,
          forms: {
            ...this.state.forms,
            [form.id]: form
          }
        });
      });
    } else {
      pushState(
        {
          currentFormId: formId
        },
        "/formbuilder"
      );
      this.setState({
        currentFormId: formId
      });
    }
  };

  fetchFormsList = () => {
    pushState(
      {
        currentFormId: null,
        currentSubmissionsPageId: null
      },
      "/"
    );
    api.fetchFormsList().then(forms => {
      this.setState({
        currentFormId: null,
        currentSubmissionsPageId: null,
        forms
      });
    });
  };

  currentContenst() {
    if (this.state.currentFormId == 0) return { Name: "Form Builder" };
    return this.state.forms[this.state.currentFormId];
  }

  pageHeader() {
    if (this.state.currentSubmissionsPageId)
      return "Submissions Page :" + this.currentContenst().Name;
    if (this.state.currentFormId != undefined) {
      return this.currentContenst().Name;
    }

    return "Forms List Page";
  }

  currentContent() {
    if (this.state.currentSubmissionsPageId != undefined) {
      return [<Form SubPage="1" {...this.state.currentSubmissionsPage} />, ""];
    }

    if (this.state.currentFormId != undefined) {
      if (this.state.currentFormId < 1) {
        return [
          <BuildF addForm={this.addForm} formListClick={this.fetchFormsList} />,
          ""
        ];
      }
      return [
        <Form
          onSubmissionsClick={this.addSubmission}
          formListClick={this.fetchFormsList}
          {...this.currentContenst()}
        />,
        ""
      ];
    }
    return [
      <FormList
        onFormClick={this.fetchForm}
        onSubmissionsClick={this.fetchSubmissions}
        forms={this.state.forms}
      />,
      <BuildPageLink BuilderClick={this.fetchForm} />
    ];
  }

  addForm = (name, fields) => {
    api.addForm(name, fields).then(
      api.fetchFormsList().then(forms => {
        this.setState({
          forms
        });
      })
    );
    this.fetchFormsList();
    this.fetchFormsList();
  };

  addSubmission = (id, fields) => {
    api.addSubmission(id, fields).then(
      api.fetchFormsList().then(forms => {
        this.setState({
          forms
        });
      })
    );
  };

  switchState() {
    if (this.state.currentSubmissionsPageId != undefined) {
      {
        return (
          <div>
            <button className="pure-button" onClick={this.fetchFormsList}>
              Form List
            </button>
            <table className="SubmissionsPage">
              <thead>
                <Table head={this.currentContenst().fields} />
              </thead>
              {this.currentContent()[0]}
            </table>
          </div>
        );
      }
    }

    if (this.state.currentFormId != undefined) {
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
        <div className="BF">{this.currentContent()[1]}</div>
        {this.switchState()}
      </div>
    );
  }
}

export default App;
