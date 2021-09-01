import React from "react";
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import { useStyles } from "./style";
import { HelperText } from "components/common/HelperText";

const DAY_IN_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

export const WorkingDays = ({ workDays = [], toggleDay, errMsg = "" }) => {
  const classes = useStyles();
 
  return (
    <>
      <Paper
        className={`${classes.paper} ${errMsg ? classes.invalidBorder : null}`}
        elevation={0}
      >
        <Typography variant="h4">
          Working Days <span className={classes.obligatedText}>*</span>
        </Typography>
        <Grid container className={classes.workDays}>
          {workDays?.map((day, index) => (
            <Grid item xs key={index}>
              <Button
                className={classes.btnCircle}
                variant="contained"
                color={day ? "primary" : "default"}
                onClick={() => toggleDay(index)}
                disableElevation
              >
                {DAY_IN_WEEK[index]}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <HelperText message={errMsg} />
    </>
  );
};
