import React, { useState } from "react";
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import { useStyles } from "./style";
import { HelperText } from "components/common/HelperText";

export const WorkingDays = ({ title = "", workspace = {}, setWorkspace }) => {
  const classes = useStyles();

  const dayInWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const [dayMsg, setDayMsg] = useState("");

  const toggleDay = (index) => {
    const temp = workspace.workDays.slice();
    temp[index] = !temp[index];
    setDayMsg(
      temp.filter(Boolean).length < 2
        ? "Please choose number of working days at least 2 days !"
        : ""
    );
    setWorkspace({ ...workspace, workDays: temp });
  };

  return (
    <>
      <Paper
        className={`${classes.paper} ${dayMsg ? classes.invalidBorder : null}`}
        elevation={0}
      >
        <Typography variant="h4">
          {title} <span className={classes.obligatedText}>*</span>
        </Typography>
        <Grid container style={{ margin: 12 }}>
          {workspace.workDays?.map((day, index) => (
            <Grid item xs key={index}>
              <Button
                className={classes.btnCircle}
                variant="contained"
                color={day ? "primary" : "default"}
                onClick={() => toggleDay(index)}
                disableElevation
              >
                {dayInWeek[index]}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <HelperText message={dayMsg} />
    </>
  );
};
