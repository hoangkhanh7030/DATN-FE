import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ThemeProvider, Grid, Box } from "@material-ui/core";
import * as _ from "underscore";

import Header from "./header/Header";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarBody from "./calendar/CalendarBody";
import buildCalendar from "./others/buildCalendar";

import { VIEWS } from "./others/constants";

import { theme } from "assets/css/Common";
import { useStyles } from "./style";

export default function Workspace() {
  const { id } = useParams();

  const [teams, setTeams] = useState([]);
  const [resources, setResources] = useState([]);

  const [calendar, setCalendar] = useState([]);
  const [today, setToday] = useState(moment());
  const [view, setView] = useState(VIEWS[0].value);

  const classes = useStyles({ view });

  useEffect(() => {
    setCalendar(buildCalendar(today, view));
  }, [today, view]);

  return (
    <ThemeProvider theme={theme}>
      <Header
        calendar={calendar}
        today={today}
        setToday={setToday}
        view={view}
        setView={setView}
      />

      <Box className={classes.calendar}>
        <Grid container>
          <CalendarHeader
            calendar={calendar}
            view={view}
            teamAmount={_.size(teams)}
            rscAmount={_.size(resources)}
          />

          <CalendarBody
            calendar={calendar}
            view={view}
            teams={teams}
            resources={resources}
          />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
