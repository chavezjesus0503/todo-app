import { GET_TODOS, ADD_TODOS, DELETE_TODOS } from "../actions/types";

const initialState = {
  todos: [],
  value: "",
  todoCount: 0,
  active: false,
  complete: false,
  all: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state
      };
    default:
      return state;
  }
}
