import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ThemeProvider, Grid, Box } from "@material-ui/core";
import * as _ from "underscore";
import { Progress } from "components/common/Progress";

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
  const dispatch = useDispatch();
  const storeDashboard = useSelector((state) => state.dashboard);

  const [openDialog, setOpenDialog] = useState(false);
  const [booking, setBooking] = useState(null);

  const storeResources = useSelector((state) => state.resources);
  const storeProjects = useSelector((state) => state.projects);
  const [prjList, setPrjList] = useState([]);
  const [rscList, setRscList] = useState([]);

  const [projectSearch, setProjectSearch] = useState("");
  const [resourceSearch, setResourceSearch] = useState("");

  useEffect(() => {
    fetchProjects(projectSearch);
  }, [dispatch, id]);

  useEffect(() => {
    fetchResources(resourceSearch);
  }, [dispatch, id]);

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

  const fetchProjects = (projectSearch) => {
    dispatch(getProjectsBooking(id, projectSearch));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProjects(projectSearch);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [projectSearch]);

  const fetchResources = (resourceSearch) => {
    dispatch(getResourcesBooking(id, resourceSearch));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchResources(resourceSearch);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [resourceSearch]);

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
            projectId: _.get(booking, ["projectDTO", "id"]),
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

  const [searched, setSearched] = useState("");
  const [view, setView] = useState(VIEWS[0].value);

  const classes = useStyles({ view });

  const setParams = (searchName = searched, startDate, endDate) => {
    return { startDate, endDate, searchName };
  };
  const fetchBookings = (params) => {
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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = _.isEmpty(calendar)
        ? setParams(
            searched,
            moment().startOf("week").format("YYYY-MM-DD"),
            moment().startOf("week").format("YYYY-MM-DD")
          )
        : setParams(
            searched,
            _.first(calendar).format("YYYY-MM-DD"),
            _.last(calendar).format("YYYY-MM-DD")
          );
      fetchBookings(params);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searched]);

  const cancelSearch = () => {
    setSearched("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Header
        calendar={calendar}
        today={today}
        setToday={setToday}
        view={view}
        setView={setView}
        searched={searched}
        setSearched={setSearched}
        cancelSearch={cancelSearch}
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
      )}{" "}
      <Progress isOpen={storeDashboard.isLoading} />
    </ThemeProvider>
  );
}
