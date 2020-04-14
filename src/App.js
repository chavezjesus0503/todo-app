import React, { useState, useEffect } from 'react';
import './App.css';

import Todo from './components/Todo';
import ListFooter from './components/ListFooter';
import TodoForm from './components/TodoForm';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  addTodo,
  getTodos,
  deleteTodo,
  clearComplete,
  clickBox,
  checkAll,
  uncheckAll,
} from './actions/todoActions';

const App = ({
  getTodos,
  todos,
  addTodo,
  clickBox,
  clearComplete,
  uncheckAll,
  deleteTodo,
}) => {
  const [todo, setTodo] = useState('');
  const [todoCount, setTodoCount] = useState(0);
  const [showActive, setShowActive] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const todos = localStorage.getItem('todos');
    if (todos) {
      const loadTodos = JSON.parse(todos);

      getTodos(loadTodos);
    }
  }, []);

  const handleKeyDown = (event) => {
    const enterKey = 13;
    if (event.keyCode === enterKey) {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    todos.push({ text: todo, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));

    addTodo(todos);

    setTodo('');
    setTodoCount(todoCount + 1);
  };

  const handleChange = (e) => setTodo(e.target.value);

  const todosList = () => {
    return todos.map((currenttodo, index) => {
      return (
        <Todo
          todo={currenttodo}
          key={index}
          destroy={destroy}
          handleClick={handleClick}
        />
      );
    });
  };

  const completeTodosList = () => {
    const completedTodos = todos.filter((todo) => {
      return todo.completed === true;
    });

    return completedTodos.map((todo, index) => {
      return (
        <Todo
          todo={todo}
          key={index}
          destroy={destroy}
          handleClick={handleClick}
        />
      );
    });
  };

  const activeTodosList = () => {
    const activeTodos = todos.filter((todo) => {
      return todo.completed === false;
    });

    return activeTodos.map((todo, index) => {
      return (
        <Todo
          todo={todo}
          key={index}
          destroy={destroy}
          handleClick={handleClick}
        />
      );
    });
  };

  const handleClick = (text) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.text === text) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    clickBox(updatedTodos);

    changeAll();
  };

  const changeAll = () => {
    setShowAll(!showAll);
  };

  const handleActive = () => {
    setShowActive(true);
    setShowComplete(false);
  };

  const handleAll = () => {
    setShowComplete(false);
    setShowActive(false);
  };

  const handleComplete = () => {
    setShowComplete(true);
    setShowActive(false);
  };

  const clearCompleteTodos = () => {
    let clearData = todos.filter((todo) => {
      return todo.completed === false;
    });
    localStorage.setItem('todos', JSON.stringify(clearData));

    setShowAll(true);

    clearComplete(clearData);
  };

  const selectAll = () => {
    if (showAll) {
      const selectData = todos.map((todo) => {
        todo.completed = true;

        return todo;
      });
      setShowAll(false);
      checkAll(selectData);
    } else {
      const selectData = todos.map((todo) => {
        todo.completed = false;

        return todo;
      });
      setShowAll(true);
      uncheckAll(selectData);
    }
  };

  const destroy = (todo) => {
    var deletedList = todos.filter((candidate) => {
      return candidate !== todo;
    });

    localStorage.setItem('todos', JSON.stringify(deletedList));

    deleteTodo(deletedList);
  };

  return (
    <div className="list">
      <TodoForm
        handleChange={handleChange}
        todo={todo}
        handleKeyDown={handleKeyDown}
        selectAll={selectAll}
        activeTodosList={activeTodosList}
        todos={todos}
      />
      {showActive
        ? activeTodosList()
        : showComplete
        ? completeTodosList()
        : todosList()}
      {todos.length > 0 && (
        <ListFooter
          activeNumber={activeTodosList().length}
          completedNumber={completeTodosList().length}
          handleActive={handleActive}
          handleAll={handleAll}
          handleComplete={handleComplete}
          handleClear={clearCompleteTodos}
        />
      )}
    </div>
  );
};

App.propTypes = {
  todos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
});

export default connect(mapStateToProps, {
  addTodo,
  getTodos,
  deleteTodo,
  clearComplete,
  clickBox,
  checkAll,
  uncheckAll,
})(App);
