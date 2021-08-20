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
import { Message } from "components/common/Message";
import { addBooking, editBooking } from "redux/actions/bookingAction";

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

  const { message } = useSelector((state) => state.message);
  const [openMessage, setOpenMessage] = useState(false);
  const { status } = useSelector((state) => state.booking);

  const [selectedDays, setSelectedDays] = useState([]);

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  useEffect(() => {
    fetchProjects(projectSearch);
    fetchResources(resourceSearch);
  }, [dispatch, id]);

  useEffect(() => {
    if (!storeResources.data && !storeProjects.data) {
      return;
    }

    setRscList(storeResources.data);
    setPrjList(storeProjects.data);
  }, [storeResources.data, storeProjects.data]);

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

  const handleCloseDialog = () => {
    selectedDays?.forEach((element) => {
      document.getElementById(`${element}`).style.backgroundColor = `white`;
    });
    setOpenDialog(false);
  };

  const handleOpenDialog = (
    startDate = null,
    resourceId = "",
    booking = null,
    endDate = null,
    selectedDays = []
  ) => {
    setSelectedDays(selectedDays);
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
            startDate: startDate.isBefore(endDate) ? startDate : endDate,
            endDate: endDate.isAfter(startDate) ? endDate : startDate,
            resourceId,
          }
    );

    setOpenDialog(true);
  };

  const handleAddBooking = (data) => {
    dispatch(addBooking(id, data))
      .then(() => {
        handleCloseDialog();
        setOpenMessage(true);
        fetchBookings(calendar);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };
  const handleEditBooking = (data) => {
    dispatch(editBooking(id, data))
      .then(() => {
        setOpenDialog(false);
        setOpenMessage(true);
        fetchBookings(calendar);
      })
      .catch(() => {
        setOpenMessage(true);
      });
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

  const fetchBookings = (thisCalendar = [], searchValue = "") => {
    const params = {
      startDate: _.first(thisCalendar).format("YYYY-MM-DD"),
      endDate: _.last(thisCalendar).format("YYYY-MM-DD"),
      searchName: searchValue,
    };

    dispatch(getBookings(id, params));
  };

  useEffect(() => {
    const thisCalendar = buildCalendar(today, view);
    setCalendar(thisCalendar);
    fetchBookings(thisCalendar);
  }, [today, view]);

  useEffect(() => {
    if (!storeDashboard.data) {
      return;
    }
    setResources(_.get(storeDashboard, ["data", "resources"]));
    setTeams(_.get(storeDashboard, ["data", "teams"]));
  }, [storeDashboard]);

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
      </Box>
      {openDialog && storeProjects.data && storeResources.data ? (
        <BookingDialog
          openDialog={openDialog}
          booking={booking}
          setBooking={setBooking}
          handleCloseDialog={handleCloseDialog}
          projects={prjList}
          resources={rscList}
          handleAddBooking={handleAddBooking}
          handleEditBooking={handleEditBooking}
          projectSearch={projectSearch}
          setProjectSearch={setProjectSearch}
          resourceSearch={resourceSearch}
          setResourceSearch={setResourceSearch}
        />
      ) : (
        <></>
      )}
      <Progress isOpen={storeDashboard.isLoading} />
      {message ? (
        <Message
          message={message}
          isOpen={openMessage}
          handleCloseMessage={handleCloseMessage}
          type={status === 200 ? "success" : "error"}
        />
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}
