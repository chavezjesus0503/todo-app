import { GET_TODOS, ADD_TODOS, DELETE_TODOS } from "./types";

export const getTodos = () => {
  return {
    type: GET_TODOS
  };
};
