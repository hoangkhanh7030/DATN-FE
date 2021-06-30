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
import logo from "../../../assets/icons/app-logo.svg";
import { commonStyle, theme } from "../../../assets/css/Common";
import avatar from "../../../assets/images/avatar.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../../redux/actions/authAction";

const headersData = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "People",
    href: "/people",
  },
  {
    label: "Report",
    href: "/report",
  },
];

export default function TheHeader() {
  const classes = useStyles();
  const commonClasses = commonStyle();

  const dispatch = useDispatch();
  const navbar = true;
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
      <Button style={{textTransform:"none"}}>
        <ExitToAppIcon className={commonClasses.icon} />
        <a href="/login" className={commonClasses.a} onClick={handleLogout}>
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
            {navbar && <div>{getMenuButtons()}</div>}
            <Avatar alt="Avatar" src={avatar} onClick={handleOpenLogout} />
            {logoutButton}
          </Toolbar>
        </AppBar>
      </header>
    </ThemeProvider>
  );
}
