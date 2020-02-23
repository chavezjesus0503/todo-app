import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  CLICK_BOX,
  CLEAR_COMPLETE,
  CHECK_ALL,
  UNCHECK_ALL
} from "../actions/types";

const initialState = {
  todos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECK_ALL:
    case UNCHECK_ALL:
    case CLEAR_COMPLETE:
    case DELETE_TODO:
    case ADD_TODO:
    case GET_TODOS:
    case CLICK_BOX:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}
