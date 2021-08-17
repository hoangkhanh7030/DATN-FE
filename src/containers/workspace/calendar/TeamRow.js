import React from "react";
import { Grid } from "@material-ui/core";

import Team from "components/dashboard/Team";

import * as _ from "underscore";

import { useStyles } from "../style";

function TeamCell({ classes, calendar }) {
  return _.isEmpty(calendar)
    ? null
    : calendar.map((day) => (
        <Grid
          item
          key={day}
          className={`${classes.calendarDay} ${classes.team}`}
        ></Grid>
      ));
}

export default function TeamRow({
  calendar = [],
  team = {},
  resources = [],
  view = 1,
  handleRenameTeam,
}) {
  const classes = useStyles({ view });

  return (
    <>
      <Grid
        item
        className={`${classes.team} ${classes.leftWidth} ${
          classes.calendarDay
        } ${_.isEmpty(team) ? classes.emptyTeam : null}`}
      >
        {_.isEmpty(team) ? null : (
          <Team
            team={team}
            resources={resources}
            handleRenameTeam={handleRenameTeam}
          />
        )}
      </Grid>

      <TeamCell classes={classes} calendar={calendar} />
    </>
  );
}
