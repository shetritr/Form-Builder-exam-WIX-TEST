import React from "react";

export default class FormPreview extends React.Component {
  SubmitPage = () => {
    this.props.onFormClick(this.props.id);
  };
  SubmissionsPage = () => {
    this.props.onSubmissionsClick(this.props.Name, this.props.id);
  };
  render() {
    return (
      <tr>
        <th className="id" key={1}>
          {this.props.id}
        </th>
        <th className="Name" key={2}>
          {this.props.Name}
        </th>
        <th className="Submissions" key={3}>
          {this.props.Submissions}
        </th>
        <th className="temp2" key={4} onClick={this.SubmitPage}>
          <a className="link"> View </a>
        </th>
        <th className="temp" key={5} onClick={this.SubmissionsPage}>
          <a className="link">View </a>
        </th>
      </tr>
    );
  }
}
