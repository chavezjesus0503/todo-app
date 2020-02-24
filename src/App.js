import React from "react";
import "./App.css";

import Todo from "./components/Todo.component";
import ListFooter from "./components/ListFooter.component";
import TodoForm from "./components/TodoForm";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  addTodo,
  getTodos,
  deleteTodo,
  clearComplete,
  clickBox,
  checkAll,
  uncheckAll
} from "./actions/todoActions";

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
      const loadTodos = JSON.parse(todos);

      this.props.getTodos(loadTodos);
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

    const { todo, todoCount } = this.state;
    const { todos } = this.props;

    todos.push({ text: todo, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));

    this.props.addTodo(todos);

    this.setState({
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
    return this.props.todos.map((currenttodo, index) => {
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
    const completedTodos = this.props.todos.filter(todo => {
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
    const activeTodos = this.props.todos.filter(todo => {
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
    const updatedTodos = this.props.todos.map(todo => {
      if (todo.text === text) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.props.clickBox(updatedTodos);

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
    let clearData = this.props.todos.filter(todo => {
      return todo.completed === false;
    });
    localStorage.setItem("todos", JSON.stringify(clearData));

    this.setState({
      showAll: true
    });

    this.props.clearComplete(clearData);
  };

  selectAll = () => {
    if (this.state.showAll) {
      const selectData = this.props.todos.map(todo => {
        todo.completed = true;

        return todo;
      });
      this.setState({
        showAll: false
      });
      this.props.checkAll(selectData);
    } else {
      const selectData = this.props.todos.map(todo => {
        todo.completed = false;

        return todo;
      });
      this.setState({
        showAll: true
      });
      this.props.uncheckAll(selectData);
    }
  };

  delete = todo => {
    var deletedList = this.props.todos.filter(candidate => {
      return candidate !== todo;
    });

    localStorage.setItem("todos", JSON.stringify(deletedList));

    this.props.deleteTodo(deletedList);
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
        {this.props.todos.length > 0 ? (
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

App.propTypes = {
  todos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  todos: state.todo.todos
});

export default connect(mapStateToProps, {
  addTodo,
  getTodos,
  deleteTodo,
  clearComplete,
  clickBox,
  checkAll,
  uncheckAll
})(App);
