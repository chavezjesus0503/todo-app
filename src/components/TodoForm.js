import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const TodoForm = props => {
  return (
    <Fragment>
      <h1 className="title">to-do</h1>

      <div className="todo-form">
        <input
          id="todo-input"
          type="text"
          placeholder="What needs to be done?"
          onChange={props.handleChange}
          value={props.todo}
          onKeyDown={props.handleKeyDown}
        />
        {props.todos.length ? (
          <label className="arrow-container">
            <input
              type="checkbox"
              onChange={props.selectAll}
              className="select-all"
              checked={props.activeTodosList().length === 0}
            />
            <span className="arrow-checkmark"></span>
          </label>
        ) : null}
      </div>
    </Fragment>
  );
};

TodoForm.propTypes = {
  todos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  todos: state.todo.todos
});

export default connect(mapStateToProps, {})(TodoForm);
