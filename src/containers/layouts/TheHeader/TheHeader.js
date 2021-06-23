import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "./style";

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
    <Typography variant="h1" className={classes.logo}>
      JuggleFish
    </Typography>
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
    <header>
      <AppBar className={classes.header}>
        <Toolbar className={classes.toolbar}>
          {appLogo}
          {navbar && <div>{getMenuButtons()}</div>}
          <Avatar alt="Avatar" src="https://via.placeholder.com/50" />
        </Toolbar>
      </AppBar>
    </header>
  );
}
