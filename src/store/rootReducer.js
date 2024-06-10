import { combineReducers } from "redux";
import todoData from "../redux/reduce";

const RootReducer = combineReducers({
  todoData,
});

export default RootReducer;
