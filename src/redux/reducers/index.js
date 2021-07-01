import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./msgReducer";
import workspaces from "./workspacesReducer";

export default combineReducers({
  auth,
  message,
  workspaces,
});
