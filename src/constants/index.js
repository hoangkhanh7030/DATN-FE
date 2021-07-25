export const EMAIL = "email";
export const PASSWORD = "password";
export const EMAIL_REGEX =
  /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
export const EMAIL_ERROR = "email is invalid";
export const PASSWORD_ERROR = "password is required";
export const EMPTY_ERROR = "this field is required";

export const USER = "user";

/* ----------------------- table ----------------------- */
export const STATUS_OPTION = "status";
export const SIZE_OPTION = "size";
export const ASC = "ASC";
export const DESC = "DESC";
export const INITIAL_PAGE = 1;
export const INITIAL_ROWS_PER_PAGE = 5;
export const SIZES = [5, 10, 15];
export const STATUS = "STATUS";
export const ACTIVE = "active";
export const ARCHIVED = "archived";
export const STATUSES = [STATUS, ACTIVE, ARCHIVED];
export const IS_ACTIVATED = "isActivate";
export const ENABLE = "enable";
export const ARCHIVE = "archive";

/* --------------------- resources ---------------------- */
export const RESOURCE_NAME = "name";
export const TEAM_NAME = "team";
export const POSITION_NAME = "position";
export const STATUS_NAME = "status";

/* ----------------------- paths ----------------------- */
export const HOMEPAGE = "/";
export const LOGIN_URL = "/login";
export const WORKSPACES_URL = "/workspaces";
export const DASHBOARD_URL = "/dashboard";
export const PROJECTS_URL = "/projects";
export const RESOURCES_URL = "/resources";
export const REPORT_URL = "/report";
export const WORKSPACE_URL = "/workspaces/:id";

/* ----------------------- projects ----------------------- */
export const PROJECT_NAME = "name";
export const CLIENT_NAME = "clientName";
