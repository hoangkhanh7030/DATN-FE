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

import BookingDialog from "./dialog/BookingDialog";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsBooking } from "redux/actions/projectAction";
import { getResourcesBooking } from "redux/actions/resourceAction";

const INITIAL_BOOKING = {
  id: "",
  startDate: "",
  endDate: "",
  projectId: "",
  resourceId: "",
  percentage: 100,
  duration: 8,
};

export default function Workspace() {
  const { id } = useParams();
  const mockBooking = {
    id: 12,
    startDate: "2021-08-09",
    endDate: "2021-08-19",
    percentage: 100.0,
    duration: 8.0,
    projectDTO: {
      id: 4,
      createdDate: "2021-08-06T04:18:10.292+00:00",
      createdBy: 3,
      modifiedDate: null,
      modifiedBy: null,
      name: "CES thesis",
      clientName: "CES",
      color: "#fff",
      textColor: "#000",
      colorPattern: "#ff00",
      isActivate: true,
    },
    hourTotal: 8.0,
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [booking, setBooking] = useState(null);

  const storeResources = useSelector((state) => state.resources);
  const storeProjects = useSelector((state) => state.projects);
  const [prjList, setPrjList] = useState([]);
  const [rscList, setRscList] = useState([]);

  const [projectSearch, setProjectSearch] = useState("");
  const [resourceSearch, setResourceSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectsBooking(id, projectSearch));
  }, [dispatch, id, projectSearch]);

  useEffect(() => {
    dispatch(getResourcesBooking(id, resourceSearch));
  }, [dispatch, id, resourceSearch]);

  useEffect(() => {
    if (!storeResources.data) {
      return;
    }

    setRscList(storeResources.data);
  }, [storeResources.data]);

  useEffect(() => {
    if (!storeProjects.data) {
      return;
    }

    setPrjList(storeProjects.data);
  }, [storeProjects.data]);

  const handleOpenDialog = (
    startDate = null,
    resourceId = "",
    booking = null
  ) => {
    console.log(startDate);
    console.log(resourceId);
    console.log(booking);
    setBooking(
      booking
        ? {
            id: _.get(booking, "id"),
            startDate: moment(_.get(booking, "startDate")),
            endDate: moment(_.get(booking, "endDate")),
            projectId: _.get(booking, ["project", "id"]),
            resourceId: resourceId,
            percentage: _.get(booking, "percentage"),
            duration: _.get(booking, "duration"),
          }
        : {
            ...INITIAL_BOOKING,
            startDate,
            endDate: startDate,
            resourceId,
          }
    );

    setOpenDialog(true);
  };

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
            handleOpenDialog={handleOpenDialog}
          />
        </Grid>
      </Box>{" "}
      {/* <Typography variant="h1">Workspace {id}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            onClick={() => handleOpenDialog(moment(), 97)}
          >
            xs=6
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            onClick={() => handleOpenDialog(null, 97, mockBooking)}
          >
            xs=6
          </Paper>
        </Grid>
      </Grid> */}
      {openDialog && storeProjects.data && storeResources.data ? (
        <BookingDialog
          openDialog={openDialog}
          booking={booking}
          setOpenDialog={setOpenDialog}
          projects={prjList}
          resources={rscList}
          projectSearch={projectSearch}
          setProjectSearch={setProjectSearch}
          resourceSearch={resourceSearch}
          setResourceSearch={setResourceSearch}
        />
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}
