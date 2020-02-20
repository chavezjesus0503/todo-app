import React from "react";
import "./App.css";

import Todo from "./components/Todo.component";
import ListFooter from "./components/ListFooter.component";
import TodoForm from "./components/TodoForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo: "",
      todoCount: 0,
      showActive: false,
      showComplete: false,
      showAll: true
    };
  }

  componentDidMount() {
    const todos = localStorage.getItem("todos");
    if (todos) {
      const next = JSON.parse(todos);

      this.setState({
        todos: next
      });
    }
  }

  handleKeyDown = event => {
    const enterKey = 13;
    if (event.keyCode === enterKey) {
      this.handleSubmit(event);
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { todos, todo, todoCount } = this.state;
    todos.push({ text: todo, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    this.setState({
      todos,
      todo: "",
      todoCount: todoCount + 1
    });
  };

  handleChange = event => {
    this.setState({
      todo: event.target.value
    });
  };

  todosList = () => {
    return this.state.todos.map((currenttodo, index) => {
      return (
        <Todo
          todo={currenttodo}
          key={index}
          delete={this.delete}
          handleClick={this.handleClick}
        />
      );
    });
  };

  completeTodosList = () => {
    const completedTodos = this.state.todos.filter(todo => {
      return todo.completed === true;
    });

    return completedTodos.map((todo, index) => {
      return (
        <Todo
          todo={todo}
          key={index}
          delete={this.delete}
          handleClick={this.handleClick}
        />
      );
    });
  };

  activeTodosList = () => {
    const activeTodos = this.state.todos.filter(todo => {
      return todo.completed === false;
    });

    return activeTodos.map((todo, index) => {
      return (
        <Todo
          todo={todo}
          key={index}
          delete={this.delete}
          handleClick={this.handleClick}
        />
      );
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
    this.setState({
      showAll: !this.state.showAll
    });
  };

  handleActive = () => {
    this.setState({
      showActive: true,
      showComplete: false
    });
  };

  handleAll = () => {
    this.setState({
      showComplete: false,
      showActive: false
    });
  };

  handleComplete = () => {
    this.setState({
      showComplete: true,
      showActive: false
    });
  };

  clearComplete = () => {
    let clearData = this.state.todos.filter(todo => {
      return todo.completed === false;
    });
    localStorage.setItem("todos", JSON.stringify(clearData));
    this.setState({
      todos: clearData,
      showAll: true
    });
  };

  selectAll = () => {
    if (this.state.showAll) {
      this.setState(prevState => {
        const selectData = prevState.todos.map(todo => {
          todo.completed = true;

          return todo;
        });
        return {
          todos: selectData,
          showAll: false
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
          showAll: true
        };
      });
    }
  };

  delete = todo => {
    var deletedList = this.state.todos.filter(candidate => {
      return candidate !== todo;
    });

    localStorage.setItem("todos", JSON.stringify(deletedList));

    setTimeout(
      () =>
        this.setState({
          todos: deletedList
        }),
      1
    );
  };

  render() {
    return (
      <div className="list">
        <TodoForm
          handleChange={this.handleChange}
          todo={this.state.todo}
          handleKeyDown={this.handleKeyDown}
          selectAll={this.selectAll}
          activeTodosList={this.activeTodosList}
          todos={this.state.todos}
        />
        {this.state.showActive
          ? this.activeTodosList()
          : this.state.showComplete
          ? this.completeTodosList()
          : this.todosList()}
        {this.state.todos.length > 0 ? (
          <ListFooter
            activeNumber={this.activeTodosList().length}
            completedNumber={this.completeTodosList().length}
            handleActive={this.handleActive}
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
