import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ThemeProvider, Grid, Box } from "@material-ui/core";
import * as _ from "underscore";

import Header from "./header/Header";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarBody from "./calendar/CalendarBody";
import buildCalendar, { isToday, isWeekend } from "./others/buildCalendar";

import { getBookings } from "redux/actions/dashboardAction";

import { VIEWS } from "./others/constants";

import { theme } from "assets/css/Common";

import BookingDialog from "./dialog/BookingDialog";
import { useStyles } from "./style";
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
  const storeDashboard = useSelector((state) => state.dashboard);

  const [teams, setTeams] = useState([]);
  const [resources, setResources] = useState([]);

  const [calendar, setCalendar] = useState([]);
  const [today, setToday] = useState(moment());

  const [searched, setSearch] = useState("");
  const [view, setView] = useState(VIEWS[0].value);

  const classes = useStyles({ view });

  const setParams = (searched, startDate, endDate) => {
    return { startDate, endDate, searchName: searched };
  };
  const fetchBookings = (params) => {
    console.log(params);
    dispatch(getBookings(id, params));
  };

  useEffect(() => {
    const thisCalendar = buildCalendar(today, view);
    const params = setParams(
      searched,
      _.first(thisCalendar).format("YYYY-MM-DD"),
      _.last(thisCalendar).format("YYYY-MM-DD")
    );

    setCalendar(thisCalendar);
    fetchBookings(params);
  }, [today, view]);

  useEffect(() => {
    if (!storeDashboard.data) {
      return;
    }
    setResources(_.get(storeDashboard, ["data", "resources"]));
    setTeams(_.get(storeDashboard, ["data", "teams"]));
  }, [storeDashboard]);

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
            teamAmount={_.size(teams)}
            rscAmount={_.size(resources)}
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
