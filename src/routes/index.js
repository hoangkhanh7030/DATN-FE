import Workspaces from "containers/workspaces/Workspaces";
import Workspace from "containers/workspace/Workspace";
import * as constants from "constants/index";
import Projects from "containers/projects/Projects";
import Resources from "containers/resources/Resources";
import Users from "containers/users/Users";
import Report from "containers/report/Report";

const routes = [
  { path: constants.WORKSPACES_URL, component: Workspaces, exact: true },
  { path: constants.WORKSPACE_URL, component: Workspace, exact: true },
  {
    path: constants.WORKSPACE_URL + constants.PROJECTS_URL,
    component: Projects,
    exact: true,
  },
  {
    path: constants.WORKSPACE_URL + constants.RESOURCES_URL,
    component: Resources,
    exact: true,
  },
  {
    path: constants.WORKSPACE_URL + constants.USERS_URL,
    component: Users,
    exact: true,
  },
  {
    path: constants.WORKSPACE_URL + constants.REPORT_URL,
    component: Report,
    exact: true,
  },
];

export default routes;
