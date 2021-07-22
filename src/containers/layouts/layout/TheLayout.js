import React, { Fragment } from "react";
import TheHeader from "../header/TheHeader";
import { Container } from "@material-ui/core";
import { useStyles } from "./style";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LOGIN_URL } from "constants/index";
import Workspaces from "containers/workspaces/Workspaces";

export default function TheLayout(Component = Workspaces) {
  const classes = useStyles();

  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn
    ? (props) => (
        <Fragment>
          <TheHeader />
          <Container maxWidth={false} className={classes.root}>
            <Component {...props} />
          </Container>
        </Fragment>
      )
    : () => <Redirect to={LOGIN_URL} />;
}
