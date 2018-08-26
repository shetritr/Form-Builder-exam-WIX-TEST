import React, { Component } from "react";
import Table from "./Table";

export default class Form extends Component {
  SumbitForm = e => {
    e.preventDefault();
    let fields = [];
    for (var ref in this.refs) {
      fields.push(this.refs[ref].value);
    }

    this.props.onSubmissionsClick(this.props.id, fields);
    this.props.formListClick();
  };
  userTable = user => {
    let i = 0;
    return user.map(userAns => {
      i = i + 1;
      return (
        <th className="formUsers" key={i}>
          {userAns}
        </th>
      );
    });
  };

  switchSubOrSubS = SubPage => {
    if (SubPage) {
      return (
        <tbody>
          {this.props.Submissions.map(user => {
            return (
              <tr key={this.props.Submissions.indexOf(user)}>
                {this.userTable(user)}
              </tr>
            );
          })}
        </tbody>
      );
    }
    return (
      <div className="Form">
        <button className="pure-button" onClick={this.props.formListClick}>
          Form List
        </button>
        <form
          className="pure-form pure-form-aligned"
          onSubmit={this.SumbitForm}
        >
          <fieldset>
            {this.props.fields.map(field => {
              return (
                <div className="pure-control-group" key={field.id}>
                  <label htmlFor={field.type}>{field.Label}</label>
                  <input
                    ref={field.id}
                    id={field.name}
                    type={field.type}
                    placeholder={field.type}
                  />
                </div>
              );
            })}
            <button type="submit" className="pure-button pure-button-primary">
              Sumbit
            </button>
          </fieldset>
        </form>
      </div>
    );
  };

  render() {
    return this.switchSubOrSubS(this.props.SubPage);
  }
}
