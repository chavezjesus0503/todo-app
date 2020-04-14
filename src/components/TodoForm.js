import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TodoForm = ({
  handleChange,
  handleKeyDown,
  activeTodosList,
  todos,
  todo,
  selectAll,
}) => {
  return (
    <Fragment>
      <h1 className="title">to-do</h1>

      <div className="todo-form">
        <input
          id="todo-input"
          type="text"
          placeholder="What needs to be done?"
          onChange={handleChange}
          value={todo}
          onKeyDown={handleKeyDown}
        />
        {todos[0] && (
          <label className="arrow-container">
            <input
              type="checkbox"
              onChange={selectAll}
              className="select-all"
              checked={activeTodosList().length === 0}
            />
            <span className="arrow-checkmark"></span>
          </label>
        )}
      </div>
    </Fragment>
  );
};

TodoForm.propTypes = {
  todos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
});

export default connect(mapStateToProps, {})(TodoForm);
