import React from "react";

const Todo = props => {
  const completedStyle = {
    color: "#cdcdcd",
    textDecoration: "line-through"
  };

  return (
    <div className="container" key={props.index}>
      <label className="checkbox-container">
        <p
          style={props.todo.completed ? completedStyle : null}
          className="todo-title"
        >
          {props.todo.text}
        </p>
        <input
          type="checkbox"
          onChange={() => props.handleClick(props.todo.text)}
          checked={props.todo.completed}
          className="newCheckbox"
        />
        <span className="checkmark" />
        <button
          className="deleteBtn"
          onClick={props.delete.bind(this, props.todo)}
        >
          X
        </button>
      </label>
    </div>
  );
};

export default Todo;
