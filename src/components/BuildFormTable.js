import React, { Component } from "react";

export default class BuildFormTable extends Component {
  render() {
    return (
      <tr>
        <th>{this.props.field.name}</th>
        <th>{this.props.field.Label}</th>
        <th>{this.props.field.type}</th>
      </tr>
    );
  }
}
