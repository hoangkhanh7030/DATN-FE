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
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { commonStyle, theme } from "assets/css/Common";
import logo from "assets/icons/app-logo.svg";
import avatar from "assets/images/avatar.png";
import { CREATE_WORKSPACE_DIALOG } from "components/common/Dialog";
import { Message } from "components/common/Message";

import WorkspaceDialog from "components/workspace/dialog/Dialog";
import * as constants from "constants/index";
import {
  LOGIN_URL,
  RESOURCES_URL,
  PROJECTS_URL,
  REPORT_URL,
  WORKSPACES_URL,
} from "constants/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import { logout } from "redux/actions/authAction";
import { clearMessage } from "redux/actions/msgAction";
import { addWorkspace, getWorkspaces } from "redux/actions/workspaceAction";
import { MenuProps, useStyles } from "./style";

export default function TheHeader() {
  const history = useHistory();
  const page = history.location.pathname.split("/").splice(-1)[0];
  const { id } = useParams();
  const [workspaceId, setWorkspaceId] = useState(id ? id : "");

  const classes = useStyles();
  const commonClasses = commonStyle();

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const workspaces = useSelector((state) => state.workspaces).data;
  const { status } = useSelector((state) => state.workspaces);
  const { message } = useSelector((state) => state.message);
  const [isOpenMessage, setIsOpenMessage] = useState(false);

  const [name, setName] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [dialogError, setDialogError] = useState("");

  const tabs = [
    { name: "DASHBOARD", style: `${commonClasses.icon} far fa-calendar` },
    { name: "PROJECTS", style: `${commonClasses.icon} far fa-map` },
    { name: "RESOURCES", style: `${commonClasses.icon} far fa-user` },
    { name: "REPORT", style: `${commonClasses.icon} far fa-file-alt` },
  ];

  const tabNameToIndex = {
    0: `${WORKSPACES_URL}/${id}`,
    1: `${WORKSPACES_URL}/${id}${PROJECTS_URL}`,
    2: `${WORKSPACES_URL}/${id}${RESOURCES_URL}`,
    3: `${WORKSPACES_URL}/${id}${REPORT_URL}`,
  };

  const indexToTabName = {
    [id]: 0,
    projects: 1,
    resources: 2,
    report: 3,
  };

  const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);

  // handle workspace dialog
  const handleCreateDialogState = () => {
    setOpenCreate(!openCreate);
    setName("");
    setDialogError("");
  };

  const handleInputName = (e) => {
    setDialogError(!e.target.value.trim() ? constants.EMPTY_ERROR : "");
    setName(e.target.value);
  };

  // handle create workspace
  const handleCreateWorkspace = () => {
    if (!name) {
      setDialogError(constants.EMPTY_ERROR);
      return;
    }
    const data = {
      name,
    };
    dispatch(addWorkspace(data))
      .then(() => {
        dispatch(getWorkspaces()).catch(() => {
          setIsOpenMessage(true);
        });
        setIsOpenMessage(true);
      })
      .catch(() => {
        setIsOpenMessage(true);
      });

    setName("");
    setOpenCreate(false);
  };

  useEffect(() => {
    if (!workspaceId) return;
    dispatch(clearMessage);

    dispatch(getWorkspaces()).catch(() => setIsOpenMessage(true));
  }, [dispatch, workspaceId]);

  const handleChange = (event) => {
    !event.target.value
      ? setOpenCreate(true)
      : setWorkspaceId(event.target.value);
  };

  const handlePathChange = (id) => {
    let paths = window.location.pathname.split("/");
    paths[2] = id;
    return paths.join("/").trim();
  };

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenMessage(false);
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
      <Button>
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
        <MenuItem value="" component={RouterLink} to={WORKSPACES_URL}>
          {" "}
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
              to={() => handlePathChange(workspace.id)}
            >
              {workspace.name}
            </MenuItem>
          ))}
        <div className={classes.center}>
          <Button
            variant="outlined"
            className={classes.newBtn}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleCreateDialogState}
          >
            NEW WORKSPACE
          </Button>
        </div>
      </Select>
      <WorkspaceDialog
        open={openCreate}
        content={CREATE_WORKSPACE_DIALOG}
        name={name}
        handleCloseDialog={handleCreateDialogState}
        handleInputName={handleInputName}
        onHandleSubmit={handleCreateWorkspace}
        error={dialogError}
      />
    </FormControl>
  );

  const handleTabChange = (event, newValue) => {
    history.push(`${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  function StyledTabs() {
    return (
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="simple tabs example"
        indicatorColor="primary"
      >
        {tabs.map((tab) => (
          <Tab
            label={
              <Typography variant="h5">
                <i className={tab.style}></i>
                {tab.name}
              </Typography>
            }
          />
        ))}
      </Tabs>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppBar className={classes.root} elevation={0}>
          <Toolbar className={classes.toolbar}>
            <Box className={classes.flex}>
              {appLogo}
              {workspaceSelect}
            </Box>

            {workspaceId ? (
              <Box className={classes.tabs}>
                <StyledTabs />
              </Box>
            ) : (
              <></>
            )}

            <Box className={classes.avatar}>
              <Avatar alt="Avatar" src={avatar} onClick={handleOpenLogout} />
            </Box>
            {logoutButton}
          </Toolbar>
        </AppBar>
      </header>
      {message ? (
        <Message
          message={message}
          isOpen={isOpenMessage}
          handleCloseMessage={handleCloseMessage}
          type={status === 200 ? "success" : "error"}
        />
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}
