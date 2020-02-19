import React, { Fragment } from "react";

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

export default TodoForm;
