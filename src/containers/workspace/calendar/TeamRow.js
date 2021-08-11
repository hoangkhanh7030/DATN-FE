import React from "react";
import { Grid } from "@material-ui/core";

import Team from "components/dashboard/Team";

import * as _ from "underscore";

import { useStyles } from "../style";

export default function TeamRow({ calendar = [], team = {}, view = 1 }) {
  const classes = useStyles({ view });
  return (
    <>
      <Grid
        item
        className={`${classes.team} ${classes.leftWidth} ${
          classes.calendarDay
        } ${_.isEmpty(team) ? classes.emptyTeam : null}`}
      >
        {_.isEmpty(team) ? null : <Team team={team} />}
      </Grid>

      {calendar.length > 0
        ? calendar.map(() => (
            <Grid
              item
              className={`${classes.calendarDay} ${classes.team}`}
            ></Grid>
          ))
        : null}
    </>
  );
}
