import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ThemeProvider, Grid, Box } from "@material-ui/core";
import * as _ from "underscore";

import Header from "./header/Header";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarBody from "./calendar/CalendarBody";
import buildCalendar, { isToday, isWeekend } from "./others/buildCalendar";

import {
  EMPTY_TEAMS,
  EMPTY_RESOURCES,
  TEAMS,
  RESOURCES,
  VIEWS,
} from "./others/constants";

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
    setTeams(TEAMS);
    setResources(RESOURCES);
    // setTeams(EMPTY_TEAMS);
    // setResources(EMPTY_RESOURCES);
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
            isToday={isToday}
            isWeekend={isWeekend}
            view={view}
            teamAmount={teams.length}
            rscAmount={resources.length}
          />

          <CalendarBody
            calendar={calendar}
            isWeekend={isWeekend}
            view={view}
            teams={teams}
            resources={resources}
          />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
