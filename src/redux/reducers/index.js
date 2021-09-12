import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./msgReducer";
import workspaces from "./workspaceReducer";
import projects from "./projectReducer";
import resources from "./resourceReducer";
import teams from "./teamReducer";
import positions from "./positionReducer";
import emails from "./emailReducer";
import users from "./userReducer";
import reports from "./reportReducer";
import dashboard from "./dashboardReducer";

export default combineReducers({
  auth,
  message,
  workspaces,
  projects,
  resources,
  teams,
  positions,
  emails,
  users,
  reports,
  dashboard,
});
