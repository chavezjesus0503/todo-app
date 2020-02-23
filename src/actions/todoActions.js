import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  CLEAR_COMPLETE,
  CLICK_BOX,
  CHECK_ALL,
  UNCHECK_ALL
} from "./types";

export const getTodos = todos => dispatch => {
  dispatch({
    type: GET_TODOS,
    payload: todos
  });
};

export const addTodo = todos => dispatch => {
  dispatch({
    type: ADD_TODO,
    payload: todos
  });
};

export const deleteTodo = todos => dispatch => {
  //  setTimeout(
  // () =>
  // this.setState({
  // todos: deletedList
  //   }),
  // 1
  // );
  dispatch({
    type: DELETE_TODO,
    payload: todos
  });
};

export const clearComplete = todos => dispatch => {
  dispatch({
    type: CLEAR_COMPLETE,
    payload: todos
  });
};

export const clickBox = todos => dispatch => {
  dispatch({
    type: CLICK_BOX,
    payload: todos
  });
};

export const checkAll = todos => dispatch => {
  dispatch({
    type: CHECK_ALL,
    payload: todos
  });
};

export const uncheckAll = todos => dispatch => {
  dispatch({
    type: UNCHECK_ALL,
    payload: todos
  });
};
