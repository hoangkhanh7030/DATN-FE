import React from "react";
import { Typography, Box, Avatar, Container } from "@material-ui/core";
import * as _ from "underscore";
import { makeStyles } from "@material-ui/core/styles";

import { RESOURCE_NAME, POSITION_NAME } from "constants/index";
import { AVATAR, PERCENT } from "containers/workspace/others/constants";

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

const TextPercentage = ({ classes, workingPercent }) => {
  return (
    <Typography className={classes.textPercentage}>
      {"| "}
      <Box
        component="span"
        className={workingPercent < 100 ? null : classes.percentRed}
      >
        {`${workingPercent}%`}
      </Box>
    </Typography>
  );
};

export default function Resource({ resource = {} }) {
  const classes = useStyles();
  const workingPercent = _.get(resource, PERCENT);

  return (
    <Container className={classes.container}>
      <Avatar src={_.get(resource, AVATAR)} className={classes.avatar}></Avatar>

      <Box className={classes.textBox}>
        <Typography noWrap className={classes.textName}>
          {_.get(resource, RESOURCE_NAME)}
        </Typography>
        <Box className={classes.textPosBox}>
          <Typography noWrap className={classes.textPosition}>
            {_.get(resource, POSITION_NAME)}
          </Typography>

          <TextPercentage classes={classes} workingPercent={workingPercent} />
        </Box>
      </Box>
    </Container>
  );
}
