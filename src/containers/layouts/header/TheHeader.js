import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  ThemeProvider,
  Popover,
} from "@material-ui/core";

import { useStyles } from "./style";
import logo from "assets/icons/app-logo.svg";
import { commonStyle, theme } from "assets/css/Common";
import avatar from "assets/images/avatar.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "redux/actions/authAction";
import {
  DASHBOARD_URL,
  PROJECTS_URL,
  PEOPLE_URL,
  REPORT_URL,
  LOGIN_URL,
} from "constants/index";

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
  const classes = useStyles();
  const commonClasses = commonStyle();

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
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
        <AppBar className={classes.root}>
          <Toolbar className={classes.toolbar}>
            {appLogo}
            {<div> {getMenuButtons()}</div>}
            <Avatar alt="Avatar" src={avatar} onClick={handleOpenLogout} />
            {logoutButton}
          </Toolbar>
        </AppBar>
      </header>
    </ThemeProvider>
  );
}
