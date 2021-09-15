import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import * as colors from "assets/css/Common";

const useStyles = makeStyles({
  root: {
    paddingBottom: `0 !important`,
    borderBottom: `1px solid ${colors.borderColor} `,
    marginBottom: 16,
    background: `${colors.bgColor}`,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export const SettingHeader = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={1} className={classes.root} align="center" />
      <Grid item xs={3} className={classes.root}>
        <Typography className={classes.title}>Team</Typography>
      </Grid>

      <Grid item xs={8} className={classes.root}>
        <Typography className={classes.title}>Positions</Typography>
      </Grid>
    </Grid>
  );
};
