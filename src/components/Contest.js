import React, { Component } from "react";
import Table from "./Table";

export default class Contest extends Component {
  SumbitForm = e => {
    e.preventDefault();
    let fields = [];
    for (var ref in this.refs) {
      fields.push(this.refs[ref].value);
    }
    console.log(this.props.id);

    // this.props.onSubmissionsClick(this.props.Id, fields);
  };

  userTable = user => {
    console.log(user);
  };

  switchSubOrSubS = SubPage => {
    if (SubPage) {
      return (
        <tbody>
          {this.props.Submissions.map(user => {
            <tr className="Contest">
              <th>{this.userTable(user)}</th>
            </tr>;
          })}
        </tbody>
      );
    }
    return (
      <div className="Contest">
        <div className="home-link" onClick={this.props.contestListClick}>
          Contest List
        </div>
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
