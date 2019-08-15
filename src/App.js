import React from "react";
import "./App.css";

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  handleKeyDown(event) {
    if (event.keyCode === enterKey) {
      this.handleSubmit(event);
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var todos = this.state.todos;
    todos.push({ text: this.refs.newText.value, completed: false });
    this.setState({
      todos: todos,
      value: "",
      todoCount: this.state.todoCount + 1
    });
  }

  handleClick(text) {
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
  }

  changeAll() {
    if (this.state.all) {
      this.setState({
        all: false
      });
    } else {
      this.setState({
        all: true
      });
    }
  }

  handleActive() {
    this.setState({
      active: true,
      complete: false
    });
  }

  handleAll() {
    this.setState({
      complete: false,
      active: false
    });
  }

  handleComplete() {
    this.setState({
      complete: true,
      active: false
    });
  }

  clearComplete() {
    let clearData = this.state.todos.filter(todo => {
      return todo.completed === false;
    });
    this.setState({
      todos: clearData,
      all: true
    });
  }

  selectAll() {
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
  }

  destroy(todo) {
    var destroy = this.state.todos.filter(candidate => {
      return candidate !== todo;
    });
    console.log(destroy);

    setTimeout(
      () =>
        this.setState({
          todos: destroy
        }),
      1
    );
  }

  render() {
    const completedStyle = {
      color: "#cdcdcd",
      textDecoration: "line-through"
    };

    const activeItemsData = this.state.todos.filter(todo => {
      return todo.completed === false;
    });
    const activeItems = activeItemsData.map(todo => {
      return (
        <div className="container">
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
    const completeItems = completeItemsData.map(todo => {
      return (
        <div className="container">
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

    const todoItems = this.state.todos.map(todo => (
      <div className="container">
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
            <input
              type="checkbox"
              onChange={this.selectAll}
              className="select-all"
              checked={activeItemsData.length === 0}
            />
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

    var itemsLeft;
    if (this.props.activeNumber !== 1) {
      itemsLeft = (
        <p id="todo-number-display">{this.props.activeNumber} items left</p>
      );
    } else {
      itemsLeft = (
        <p id="todo-number-display">{this.props.activeNumber} item left</p>
      );
    }

    return (
      <div className="list-footer">
        {itemsLeft}
        <div className="toggleButtons">
          <a href="#" onClick={this.props.handleAll}>
            All
          </a>
          <a href="#" onClick={this.props.handleClick}>
            Active
          </a>
          <a href="#" onClick={this.props.handleComplete}>
            Completed
          </a>
        </div>
        {clearButton}
      </div>
    );
  }
}

export default App;
