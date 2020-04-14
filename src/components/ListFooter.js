import React from 'react';
import PropTypes from 'prop-types';

const ListFooter = ({
  completedNumber,
  handleClear,
  activeNumber,
  handleAll,
  handleActive,
  handleComplete,
}) => {
  let clearButton = null;
  if (completedNumber > 0) {
    clearButton = (
      <button className="clear-completed" onClick={handleClear}>
        Clear Completed
      </button>
    );
  }

  let itemsLeft = (
    <p id="todo-number-display">
      {activeNumber} item{activeNumber > 1 ? 's' : ''} left
    </p>
  );

  return (
    <div className="list-footer">
      {itemsLeft}
      <div className="toggleButtons">
        <a id="all" href="#/all" onClick={handleAll}>
          All
        </a>
        <a href="#/active" onClick={handleActive}>
          Active
        </a>
        <a href="#/completed" onClick={handleComplete}>
          Completed
        </a>
      </div>
      {clearButton}
    </div>
  );
};

ListFooter.propTypes = {
  completedNumber: PropTypes.number.isRequired,
  activeNumber: PropTypes.number.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleAll: PropTypes.func.isRequired,
  handleActive: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
};

export default ListFooter;
