import Workspaces from "containers/workspaces/Workspaces";
import Workspace from "containers/workspace/Workspace";
import * as constants from "constants/index";
import Projects from "containers/projects/Projects";

const routes = [
  { path: constants.WORKSPACES_URL, component: Workspaces, exact: true },
  { path: constants.WORKSPACE_URL, component: Workspace, exact: true },
  {
    path: constants.WORKSPACE_URL + constants.PROJECTS_URL,
    component: Projects,
    exact: true,
  },
];

export default routes;
