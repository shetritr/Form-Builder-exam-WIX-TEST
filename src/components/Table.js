import React, { Component } from "react";

export default class Table extends Component {
  state = {
    dataColumns: [
      { index: 1, id: "Form id" },
      { index: 2, id: "Form Name" },
      { index: 3, id: "# Submissions" },
      { index: 4, id: "Submit Page	" },
      { index: 5, id: "Submissions Page" }
    ]
  };

  render() {
    if (this.props.head) {
      return (
        <tr>
          {this.props.head.map(column => {
            return (
              <th className="a" key={column.id}>
                {column.Label}
              </th>
            );
          })}
        </tr>
      );
    }
    return (
      <tr>
        {this.state.dataColumns.map(column => {
          return (
            <th className="a" key={column.index}>
              {column.id}
            </th>
          );
        })}
      </tr>
    );
  }
}
