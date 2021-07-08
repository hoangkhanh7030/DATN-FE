import Workspaces from "containers/workspaces/Workspaces";
import Workspace from "containers/workspace/Workspace";
import * as constants from "constants/index";

const routes = [
  { path: constants.WORKSPACES_URL, component: Workspaces, exact: true },
  { path: constants.WORKSPACE_URL, component: Workspace, exact: true },
];

export default routes;
