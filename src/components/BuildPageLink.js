import React, { Component } from "react";

export default class BuildPageLink extends Component {
  handleClick = () => {
    this.props.BuilderClick(0);
  };
  render() {
    return (
      <div className="Builder">
        <div className="pure-button" onClick={this.handleClick}>
          Build Form
        </div>
      </div>
    );
  }
}
