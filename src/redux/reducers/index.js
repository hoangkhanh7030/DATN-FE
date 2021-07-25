import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./msgReducer";
import workspaces from "./workspaceReducer";
import projects from "./projectReducer";
import resources from "./resourceReducer";

export default combineReducers({
  auth,
  message,
  workspaces,
  projects,
  resources,
});
