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
  Grid,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { commonStyle, theme } from "assets/css/Common";
import logo from "assets/icons/app-logo.svg";
import avatar from "assets/images/avatar.png";
import AlertDialog from "components/common/AlertDialog";
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
import {
  addWorkspace,
  deleteWorkspace,
  getWorkspaces,
  updateWorkspace,
} from "redux/actions/workspaceAction";
import { MenuProps, useStyles } from "./style";
import { WorkspaceItem } from "./WorkspaceItem";

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

  const [openDialog, setOpenDialog] = useState(false);
  const [workspace, setWorkspace] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // handle workspace dialog
  const handleDialog = (workspace = null) => {
    setWorkspace(
      !openDialog && workspace ? workspace : constants.DEFAULT_WORKSPACE
    );
    setOpenDialog(!openDialog);
  };

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

  // handle create workspace
  const handleCreateWorkspace = (data) => {
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
  };

  // handle edit workspace
  const handleEditWorkspace = (id, data) => {
    dispatch(updateWorkspace(data, id))
      .then(() => {
        dispatch(getWorkspaces()).catch(() => {
          setIsOpenMessage(true);
        });
        setIsOpenMessage(true);
      })
      .catch(() => {
        setIsOpenMessage(true);
      });
  };

  const handelOpenDelete = (id) => {
    setSelectedItem(id);
    setOpenDelete(true);
  };
  const handelDeleteWorkspace = (workspaceId) => {
    dispatch(deleteWorkspace(workspaceId))
      .then(() => {
        if (+workspaceId === +id) history.push("/workspaces");
        dispatch(getWorkspaces()).catch(() => {
          setIsOpenMessage(true);
        });
        setIsOpenMessage(true);
      })
      .catch(() => {
        setIsOpenMessage(true);
      });

    setOpenDelete(false);
  };
  useEffect(() => {
    if (!workspaceId) return;
    dispatch(clearMessage);

    dispatch(getWorkspaces()).catch(() => setIsOpenMessage(true));
  }, [dispatch, workspaceId]);

  const handleChange = (event) => {
    !event.target.value ? setOpenDialog(true) : setWorkspaceId(event);
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
        renderValue={
          !id
            ? () => (
                <Typography className={classes.select}>
                  <DesktopWindowsIcon className={classes.selectIcon} />
                  Workspaces
                </Typography>
              )
            : () => (
                <Grid item xs zeroMinWidth className={classes.flexGrid}>
                  <DesktopWindowsIcon className={classes.selectIcon} />
                  <Typography className={classes.selectedItem}>
                    {workspaces.filter((item) => +item.id === +id)[0]?.name}
                  </Typography>
                </Grid>
              )
        }
      >
        {workspaces.length ? (
          <MenuItem value="" component={RouterLink} to={WORKSPACES_URL}>
            <span className={classes.headItem}>Show all workspaces</span>
          </MenuItem>
        ) : (
          <></>
        )}
        {workspaces &&
          workspaces
            .filter((item) => item.role !== "INACTIVE")
            .map((workspace) => (
              <MenuItem
                key={workspace.id}
                value={workspace.id}
                component={RouterLink}
                to={() => handlePathChange(workspace.id)}
              >
                <WorkspaceItem
                  workspace={workspace}
                  hasIcon={+workspace.id === +id}
                  handleOpenDialog={handleDialog}
                  handleOpenDelete={handelOpenDelete}
                  handelDeleteWorkspace={handelDeleteWorkspace}
                />
              </MenuItem>
            ))}
        <div className={classes.center}>
          <Button
            variant="outlined"
            className={classes.newBtn}
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => handleDialog()}
          >
            NEW WORKSPACE
          </Button>
        </div>
      </Select>
      {openDialog ? (
        <WorkspaceDialog
          open={openDialog}
          workspace={workspace}
          workspaces={workspaces}
          setWorkspace={setWorkspace}
          handleCloseDialog={handleDialog}
          handleAdd={handleCreateWorkspace}
          handleEdit={handleEditWorkspace}
        />
      ) : (
        <></>
      )}
      <AlertDialog
        open={openDelete}
        content={`Do you really want to delete this workspace?`}
        handleCloseDialog={() => setOpenDelete(false)}
        handelActionDialog={() => handelDeleteWorkspace(selectedItem)}
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
              <Avatar
                alt="Avatar"
                src={
                  JSON.parse(localStorage.getItem("user")).accountDTO.avatar 
                }
                onClick={handleOpenLogout}
              />
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
