export const EMAIL = "email";
export const PASSWORD = "password";
export const EMAIL_REGEX =
  /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
export const EMAIL_ERROR = "email is invalid";
export const PASSWORD_ERROR = "password is required";
export const EMPTY_ERROR = "this field is required";
export const EMAIL_SUFFIX_REGEX = /^([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
export const EMAIL_SUFFIX_ERROR = "please enter a valid email suffix !";
export const INVITED_EMAIL_ERROR = "this email is invited before!";
export const WORKING_DAYS_ERROR =
  "please choose number of working days at least 2 days !";
export const WORKSPACE_NAME_ERROR = "this workspace name is already existed ! ";

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
export const DEFAULT_RESOURCE = {
  avatar: "",
  name: "",
  teamId: "",
  positionId: "",
};

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
export const DASHBOARD_URL = "/bookings";
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
export const REPORTS_URL = "/report";
export const BOOKINGS_URL = "/bookings";
export const EXPORT_URL = "/export";
export const IMPORT_URL = "/import";

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

export const VIEWS = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

export const DAY = "day";
export const DAYS = "days";
export const WEEK = "week";

export const DAY_FMT = "ddd";
export const DATE_FMT = "DD";
export const DMY = "DD MMM YYYY";
export const Y_M_D = "YYYY-MM-DD";

export const SUN = "Sun";
export const WEEKENDS = ["Sat", "Sun"];

export const PROJECT_ID = "projectId";
export const RESOURCE_ID = "resourceId";

export const START_DATE = "START DATE";
export const END_DATE = "END DATE";

export const PERCENTAGE = "PERCENTAGE";
export const DURATION = "DURATION";

export const DOWNLOAD = "download";
export const RESPONSE_TYPE = "blob";
export const RESOURCES_CSV = "Resources.csv";
