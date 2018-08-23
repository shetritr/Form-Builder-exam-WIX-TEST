import React from "react";

export default class ContestPreview extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.id);
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
