import React from "react";

export default class ContestPreview extends React.Component {
  handleClick = () => {
    console.log(this.props.contestName);
  };
  render() {
    return (
      <div className="link ContestPreview">
        <div className="category-name" onClick={this.handleClick}>
          {this.props.categoryName}
        </div>
        <div className="contest-name">{this.props.contestName}</div>
      </div>
    );
  }
}
