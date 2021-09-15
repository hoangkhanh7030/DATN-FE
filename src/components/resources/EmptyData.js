import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "350px",
  },
  title: {
    fontSize: 20,
    color: "#84878f",
    fontWeight: "bold",
  },
});

export const EmptyData = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1" className={classes.title}>
        {/* Start setting teams and positions to manage resources. */}
        No data
      </Typography>
    </Box>
  );
};
