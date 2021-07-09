import {
  AppBar,
  Avatar,
  Button,
  FormControl,
  MenuItem,
  Popover,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { commonStyle, theme } from "assets/css/Common";
import logo from "assets/icons/app-logo.svg";
import avatar from "assets/images/avatar.png";
import { Message } from "components/common/Message";
import { Progress } from "components/common/Progress";
import WorkspaceDialog from "components/workspace/dialog/Dialog";
import * as constants from "constants/index";
import {
  DASHBOARD_URL,
  LOGIN_URL,
  PEOPLE_URL,
  PROJECTS_URL,
  REPORT_URL,
  WORKSPACES_URL,
} from "constants/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import { logout } from "redux/actions/authAction";
import { clearMessage } from "redux/actions/msgAction";
import { addWorkspace, getWorkspaces } from "redux/actions/workspaceAction";
import { MenuProps, useStyles } from "./style";

const headersData = [
  {
    label: "Dashboard",
    href: DASHBOARD_URL,
  },
  {
    label: "Projects",
    href: PROJECTS_URL,
  },
  {
    label: "People",
    href: PEOPLE_URL,
  },
  {
    label: "Report",
    href: REPORT_URL,
  },
];

export default function TheHeader() {
  const pathname = useLocation().pathname;

  const { id } = useParams();
  const [workspaceId, setWorkspaceId] = useState(id ? id : "");

  const classes = useStyles();
  const commonClasses = commonStyle();

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const workspaces = useSelector((state) => state.workspaces).data;
  const { status, isLoading } = useSelector((state) => state.workspaces);
  const { message } = useSelector((state) => state.message);
  const [hasMessage, setOpenMessage] = useState(false);

  const [name, setName] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [dialogError, setDialogError] = useState("");

  // handle workspace dialog
  const createContent = {
    title: "Create new workspace",
    btnTitle: "Create",
  };

  const handleOpenCreateDialog = () => {
    setOpenCreate(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreate(false);
    setName("");
  };

  const handleInputName = (e) => {
    if (!e.target.value.trim()) {
      setDialogError(constants.EMPTY_ERROR);
    } else {
      setDialogError("");
    }
    setName(e.target.value);
  };

  // handle create workspace
  const handleCreateWorkspace = () => {
    if (!name) return;
    const data = {
      name,
    };
    dispatch(addWorkspace(data))
      .then(() => {
        dispatch(getWorkspaces()).catch(() => {
          setOpenMessage(true);
        });
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });

    setName("");
    setOpenCreate(false);
  };

  useEffect(() => {
    if (!workspaceId) return;
    dispatch(clearMessage);

    dispatch(getWorkspaces()).catch(() => setOpenMessage(true));
  }, [dispatch, workspaceId]);

  const handleChange = (event) => {
    if (!event.target.value) {
      setOpenCreate(true);
    } else {
      setWorkspaceId(event.target.value);
    }
  };

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleOpenLogout = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const logoutButton = (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleCloseLogout}
      className={classes.popover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Button style={{ textTransform: "none" }}>
        <ExitToAppIcon className={commonClasses.icon} />
        <a href={LOGIN_URL} className={commonClasses.a} onClick={handleLogout}>
          Log out
        </a>
      </Button>
    </Popover>
  );

  const appLogo = (
    <div className={classes.logoApp}>
      <img src={logo} alt="Logo" width={30} />
      <Typography variant="h1" className={classes.logo}>
        JuggleFish
      </Typography>
    </div>
  );

  const workspaceSelect = (
    <FormControl
      margin="dense"
      variant="outlined"
      className={classes.formControl}
    >
      <Select
        id="demo-simple-select-outlined"
        MenuProps={MenuProps}
        value={workspaceId}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" component={RouterLink} to="/workspaces">
          <span className={classes.select}>
            <DesktopWindowsIcon className={classes.selectIcon} />
            Workspaces
          </span>
        </MenuItem>
        {workspaces &&
          workspaces.map((workspace) => (
            <MenuItem
              key={workspace.id}
              value={workspace.id}
              component={RouterLink}
              to={`${WORKSPACES_URL}/${workspace.id}`}
              className={classes.overflowWithDots}
            >
              {workspace.name}
            </MenuItem>
          ))}
        <div style={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            className={classes.newBtn}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleOpenCreateDialog}
          >
            NEW WORKSPACE
          </Button>
        </div>
      </Select>
      <WorkspaceDialog
        open={openCreate}
        content={createContent}
        name={name}
        handleCloseDialog={handleCloseCreateDialog}
        handleInputName={handleInputName}
        onHandleSubmit={handleCreateWorkspace}
        error={dialogError}
      />
    </FormControl>
  );
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: `${pathname}${href}`,
            component: RouterLink,
            className: classes.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppBar className={classes.root} >
          <Toolbar className={classes.toolbar}>
            <div style={{ display: "flex" }}>
              {appLogo}
              {workspaceSelect}
            </div>
            {workspaceId && <div>{getMenuButtons()}</div>}
            <Avatar alt="Avatar" src={avatar} onClick={handleOpenLogout} />
            {logoutButton}
          </Toolbar>
        </AppBar>
      </header>
      {message && (
        <Message
          message={message}
          isOpen={hasMessage}
          handleCloseMessage={handleCloseMessage}
          type={status === 200 ? "success" : "error"}
        />
      )}
      <Progress isOpen={isLoading} />
    </ThemeProvider>
  );
}
