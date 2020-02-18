import React from "react";
import "./App.css";

import ListFooter from "./components/ListFooter.component";

var enterKey = 13;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      value: "",
      todoCount: 0,
      active: false,
      complete: false,
      all: true
    };
  }

  handleKeyDown = event => {
    if (event.keyCode === enterKey) {
      this.handleSubmit(event);
    }
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    var todos = this.state.todos;
    todos.push({ text: this.refs.newText.value, completed: false });
    this.setState({
      todos: todos,
      value: "",
      todoCount: this.state.todoCount + 1
    });
  };

  handleClick = text => {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.text === text) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return {
        todos: updatedTodos
      };
    });
    this.changeAll();
  };

  changeAll = () => {
    if (this.state.all) {
      this.setState({
        all: false
      });
    } else {
      this.setState({
        all: true
      });
    }
  };

  handleActive = () => {
    this.setState({
      active: true,
      complete: false
    });
  };

  handleAll = () => {
    this.setState({
      complete: false,
      active: false
    });
  };

  handleComplete = () => {
    this.setState({
      complete: true,
      active: false
    });
  };

  clearComplete = () => {
    let clearData = this.state.todos.filter(todo => {
      return todo.completed === false;
    });
    this.setState({
      todos: clearData,
      all: true
    });
  };

  selectAll = () => {
    if (this.state.all) {
      this.setState(prevState => {
        const selectData = prevState.todos.map(todo => {
          todo.completed = true;

          return todo;
        });
        return {
          todos: selectData,
          all: false
        };
      });
    } else {
      this.setState(prevState => {
        const selectData = prevState.todos.map(todo => {
          todo.completed = false;

          return todo;
        });
        return {
          todos: selectData,
          all: true
        };
      });
    }
  };

  destroy = todo => {
    var destroy = this.state.todos.filter(candidate => {
      return candidate !== todo;
    });

    setTimeout(
      () =>
        this.setState({
          todos: destroy
        }),
      1
    );
  };

  render() {
    const completedStyle = {
      color: "#cdcdcd",
      textDecoration: "line-through"
    };

    const activeItemsData = this.state.todos.filter(todo => {
      return todo.completed === false;
    });
    const activeItems = activeItemsData.map((todo, index) => {
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
              onChange={() => this.handleClick(todo.text)}
              checked={todo.completed}
              className="newCheckbox"
            />
            <span className="checkmark" />
            <button
              className="destroyBtn"
              onClick={this.destroy.bind(this, todo)}
            >
              X
            </button>
          </label>
        </div>
      );
    });

    const completeItemsData = this.state.todos.filter(todo => {
      return todo.completed === true;
    });
    const completeItems = completeItemsData.map((todo, index) => {
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
              onChange={() => this.handleClick(todo.text)}
              checked={todo.completed}
              className="newCheckbox"
            />
            <span className="checkmark" />
            <button
              className="destroyBtn"
              onClick={this.destroy.bind(this, todo)}
            >
              X
            </button>
          </label>
        </div>
      );
    });

    const todoItems = this.state.todos.map((todo, index) => (
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
            onChange={() => this.handleClick(todo.text)}
            checked={todo.completed}
            className="newCheckbox"
          />
          <span className="checkmark" />
          <button
            className="destroyBtn"
            onClick={this.destroy.bind(this, todo)}
          >
            X
          </button>
        </label>
      </div>
    ));

    return (
      <div className="list">
        <h1 className="title">to-do</h1>

        <div className="todo-form">
          <input
            id="todo-input"
            type="text"
            ref="newText"
            placeholder="What needs to be done?"
            onChange={this.handleChange}
            value={this.state.value}
            onKeyDown={this.handleKeyDown}
          />
          {this.state.todos.length ? (
            <label className="arrow-container">
              <input
                type="checkbox"
                onChange={this.selectAll}
                className="select-all"
                checked={activeItemsData.length === 0}
              />
              <span className="arrow-checkmark"></span>
            </label>
          ) : null}
        </div>
        {this.state.active
          ? activeItems
          : this.state.complete
          ? completeItems
          : todoItems}
        {this.state.todos.length > 0 ? (
          <ListFooter
            activeNumber={activeItemsData.length}
            completedNumber={completeItemsData.length}
            handleClick={this.handleActive}
            handleAll={this.handleAll}
            handleComplete={this.handleComplete}
            handleClear={this.clearComplete}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
