import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./type";

export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload: payload,
  };
};

export const deleteTodos = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

export const updateTodos = (payload) => {
  return {
    type: UPDATE_TODO,
    payload,
  };
};
