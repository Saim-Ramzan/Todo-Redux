import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./type";

const initialState = {
  todos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const payload = action.payload;
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    case DELETE_TODO:
      const newTods = state.todos.filter((todo) => todo.id !== action.id);
      return {
        ...state,
        todos: newTods,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};
