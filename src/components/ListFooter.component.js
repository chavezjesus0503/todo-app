import React from "react";

class ListFooter extends React.Component {
  render() {
    var clearButton = null;
    if (this.props.completedNumber > 0) {
      clearButton = (
        <button className="clear-completed" onClick={this.props.handleClear}>
          Clear Completed
        </button>
      );
    }

    var itemsLeft = (
      <p id="todo-number-display">
        {this.props.activeNumber} item{this.props.activeNumber > 1 ? "s" : ""}{" "}
        left
      </p>
    );

    return (
      <div className="list-footer">
        {itemsLeft}
        <div className="toggleButtons">
          <a id="all" href="#/all" onClick={this.props.handleAll}>
            All
          </a>
          <a href="#/active" onClick={this.props.handleActive}>
            Active
          </a>
          <a href="#/completed" onClick={this.props.handleComplete}>
            Completed
          </a>
        </div>
        {clearButton}
      </div>
    );
  }
}

export default ListFooter;
