import React from 'react';

const Todo = ({ todo, index, handleClick, destroy }) => {
  const completedStyle = {
    color: '#cdcdcd',
    textDecoration: 'line-through',
  };

  return (
    <div className="container" key={index}>
      <label className="checkbox-container">
        <p
          style={todo.completed ? completedStyle : null}
          className="todo-title"
        >
          {todo.text}
        </p>
        <input
          type="checkbox"
          onChange={() => handleClick(todo.text)}
          checked={todo.completed}
          className="newCheckbox"
        />
        <span className="checkmark" />
        <button className="deleteBtn" onClick={() => destroy(todo)}>
          X
        </button>
      </label>
    </div>
  );
};

export default Todo;
