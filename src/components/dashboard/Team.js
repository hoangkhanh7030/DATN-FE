import React, { useState } from "react";
import { Typography, Box, IconButton } from "@material-ui/core";
import * as _ from "underscore";
import { makeStyles } from "@material-ui/core/styles";
import { TEAM_ID, ID } from "constants/index";

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

export default function Team({ team = {}, resources = [] }) {
  const classes = useStyles();

  const rscAmount = resources.filter(
    (resource) => _.get(resource, TEAM_ID) === _.get(team, ID)
  ).length;

  return (
    <Box className={classes.container}>
      <Box className={classes.left}>
        <IconButton
          className={`fas fa-chevron-up ${classes.icon}`}
        ></IconButton>
        <Typography noWrap className={classes.text}>
          {team.name}
        </Typography>
        <Typography className={classes.text}>{`(${rscAmount})`}</Typography>
      </Box>

      <IconButton className={`fas fa-ellipsis-h ${classes.icon}`}></IconButton>
    </Box>
  );
}
