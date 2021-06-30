import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./msgReducer";

export default combineReducers({
  auth,
  message,
});