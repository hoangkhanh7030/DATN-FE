import React from "react";

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
    fontSize: 10,
    paddingRight: 5,
    flex: 7,
  },
  textPercentage: {
    fontSize: 10,
    flex: 4,
  },
});

export default function Resource({ resource = {} }) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Avatar
        src="https://i.pravatar.cc/300"
        className={classes.avatar}
      ></Avatar>

      <Box className={classes.textBox}>
        <Typography noWrap className={classes.textName}>
          {resource.name}
        </Typography>
        <Box className={classes.textPosBox}>
          <Typography noWrap className={classes.textPosition}>
            {resource.position}
          </Typography>
          <Typography className={classes.textPercentage}>| 100%</Typography>
        </Box>
      </Box>
    </Container>
  );
}
