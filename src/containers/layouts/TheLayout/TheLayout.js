import React from "react";
import TheHeader from "../TheHeader/TheHeader";
import { Container } from "@material-ui/core";
import { useStyles } from "./style";

export default function TheLayout(Component) {
  const classes = useStyles();
  return (props) => {
    return (
      <>
        <TheHeader />
        <Container maxWidth={false} className={classes.root}>
          <Component {...props} />
        </Container>
      </>
    );
  };
}
