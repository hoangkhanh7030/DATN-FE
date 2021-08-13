import React from "react";
import * as _ from "underscore";
import { Typography, Box, Avatar, Container } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    padding: 0,
  },
  avatar: {
    marginRight: 5,
  },
  textBox: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  textName: {
    width: "95%",
    padding: 2,
    fontSize: 13,
    fontWeight: 600,
  },
  textPosBox: {
    display: "flex",
    alignItems: "center",
    color: "#929292",
  },
  textPosition: {
    fontSize: 11,
    paddingRight: 5,
    flex: 7,
  },
  textPercentage: {
    fontSize: 11,
    flex: 5,
  },
  percentRed: {
    color: "red",
  },
});

export default function Resource({ resource = {} }) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Avatar
        src={_.get(resource, "avatar")}
        className={classes.avatar}
      ></Avatar>

      <Box className={classes.textBox}>
        <Typography noWrap className={classes.textName}>
          {_.get(resource, "name")}
        </Typography>
        <Box className={classes.textPosBox}>
          <Typography noWrap className={classes.textPosition}>
            {_.get(resource, "position")}
          </Typography>
          <Typography className={classes.textPercentage}>
            |{" "}
            <Box
              component="span"
              className={
                _.get(resource, "percent") < 100 ? null : classes.percentRed
              }
            >
              {_.get(resource, "percent")}%
            </Box>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
