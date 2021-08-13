import React, { useState } from "react";

import { Typography, Box, IconButton } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import * as _ from "underscore";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 8,
  },
  icon: {
    fontSize: 10,
    color: "black",
  },
  text: {
    fontSize: 12,
    fontWeight: 600,
    padding: 2,
  },
});

export default function Team({ team = {}, resources = {} }) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  return (
    <Box
      className={classes.container}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Box className={classes.left}>
        <IconButton
          className={`fas fa-chevron-up ${classes.icon}`}
        ></IconButton>
        <Typography noWrap className={classes.text}>
          {team.name}
        </Typography>
        <Typography className={classes.text}>
          ({
            resources.filter(
              (resource) => _.get(resource, "teamId") === _.get(team, "id")
            ).length
          })
        </Typography>
      </Box>

      {show ? (
        <IconButton
          className={`fas fa-ellipsis-h ${classes.icon}`}
        ></IconButton>
      ) : null}
    </Box>
  );
}
