import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  ThemeProvider,
} from "@material-ui/core";
import { useStyles } from "./style";
import logo from "../../../assets/icons/app-logo.svg";
import { theme } from "../../../assets/css/Common";
import avatar from "../../../assets/images/avatar.png";
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
  const navbar = true;

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
            <Avatar alt="Avatar" src={avatar} />
          </Toolbar>
        </AppBar>
      </header>
    </ThemeProvider>
  );
}
