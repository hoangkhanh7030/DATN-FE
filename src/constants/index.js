export const EMAIL = "email";
export const PASSWORD = "password";
export const EMAIL_REGEX =
  /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
export const EMAIL_ERROR = "email is invalid";
export const PASSWORD_ERROR = "password is required";
export const EMPTY_ERROR = "this field is required";

export const USER = "user";
export const ID = "id";
export const ACTION_STATUS = "status";
export const DATA = "data";
export const SUCCESS = "success";
export const ERROR = "error";
export const BTN_SAVE = "SAVE";
export const BTN_CONFIRM = "CONFIRM";

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
export const IS_ARCHIVED = "isArchived";
export const ENABLE = "enable";
export const ARCHIVE = "archive";

/* --------------------- resources ---------------------- */
export const RESOURCE_NAME = "name";
export const TEAM_NAME = "team";
export const POSITION_NAME = "position";
export const STATUS_NAME = "status";

export const TEAM_ID = "teamId";
export const POSITION_ID = "positionId";

/* ----------------------- paths ----------------------- */
export const HOMEPAGE = "/";
export const LOGIN_URL = "/login";
export const WORKSPACES_URL = "/workspaces";
export const DASHBOARD_URL = "/dashboard";
export const PROJECTS_URL = "/projects";
export const RESOURCES_URL = "/resources";
export const REPORT_URL = "/report";
export const WORKSPACE_URL = "/workspaces/:id";
export const TEAM_URL = "/team";
export const TEAMS_URL = "/teams";
export const POSITIONS_URL = "/position";
export const IMAGES_URL = "/images/";
export const EMAILS_URL = "/emails";
export const INVITE_URL = "/invitedemail";
export const USERS_URL = "/manageUsers";
export const RE_INVITE_URL = "/reinvited";

/* ----------------------- projects ----------------------- */
export const PROJECT_NAME = "name";
export const CLIENT_NAME = "clientName";
export const COLOR = "color";
export const TEXT_COLOR = "textColor";
export const COLOR_PATTERN = "colorPattern";

export const PALETTE = {
  red: "#ff0000",
  blue: "#0000ff",
  yellow: "yellow",
  lime: "lime",
  gray: "gray",
  orange: "orange",
  purple: "purple",
  black: "black",
  white: "white",
  pink: "pink",
};

export const DEFAULT_PROJECT = {
  name: "",
  clientName: "",
  color: "#fff",
  textColor: "#000",
  colorPattern: "#ff00",
};

/* ----------------------- users ----------------------- */
export const CREATED_DATE = "createdDate";
export const ROLE = "role";
export const IS_ACTIVE = "GOOGLE";
export const IS_PENDING = "PENDING";
export const RE_INVITE = "re-invite";
