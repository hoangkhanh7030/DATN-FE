import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./msgReducer";
import workspaces from "./workspaceReducer";
import projects from "./projectReducer";
import resources from "./resourceReducer";
import teams from "./teamReducer";
import positions from "./positionReducer";
import dashboard from "./dashboardReducer";
import booking from "./bookingReducer";

export default combineReducers({
  auth,
  message,
  workspaces,
  projects,
  resources,
  teams,
  positions,
  dashboard,
  booking
});
