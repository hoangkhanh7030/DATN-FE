import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./msgReducer";
import workspaces from "./workspaceReducer";

export default combineReducers({
  auth,
  message,
  workspaces,
});
