import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ThemeProvider, Grid, Box } from "@material-ui/core";
import * as _ from "underscore";

import { Progress } from "components/common/Progress";
import { Message } from "components/common/Message";
import Header from "./header/Header";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarBody from "./calendar/CalendarBody";
import buildCalendar from "./others/buildCalendar";

import { VIEWS, Y_M_D, DATA, TEAMS, RESOURCES } from "./others/constants";
import {
  getBookings,
  deleteBooking,
  renameTeam,
} from "redux/actions/dashboardAction";

import { theme } from "assets/css/Common";
import { useStyles } from "./style";
import { addResource } from "redux/actions/resourceAction";

export default function Workspace() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const storeDashboard = useSelector((state) => state.dashboard);
  const status = _.get(storeDashboard, ["data", "status"]);
  const [isUploading, setUploading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const [hasMessage, setOpenMessage] = useState(false);

  const [teams, setTeams] = useState([]);
  const [resources, setResources] = useState([]);

  const [calendar, setCalendar] = useState([]);
  const [today, setToday] = useState(moment());
  const [view, setView] = useState(VIEWS[0].value);
  const [searched, setSearched] = useState("");

  const classes = useStyles({ view });

  const fetchBookings = (thisCalendar = [], searchValue = "") => {
    const params = {
      startDate: _.first(thisCalendar).format(Y_M_D),
      endDate: _.last(thisCalendar).format(Y_M_D),
      searchName: searchValue,
    };

    dispatch(getBookings(id, params));
  };

  useEffect(() => {
    const thisCalendar = buildCalendar(today, view);

    setCalendar(thisCalendar);
    fetchBookings(thisCalendar);
  }, [today, view, id]);

  useEffect(() => {
    if (!storeDashboard.data) {
      return;
    }
    setResources(_.get(storeDashboard, [DATA, RESOURCES]));
    setTeams(_.get(storeDashboard, [DATA, TEAMS]));
  }, [storeDashboard]);

  const keyUp = (event) => {
    if (event.keyCode === 13 || searched === "") {
      fetchBookings(calendar, searched);
    }
  };

  const cancelSearch = () => {
    setSearched("");
    fetchBookings(calendar, "");
  };

  const handleRenameTeam = (teamId, name) => {
    const params = { teamId, name };
    dispatch(renameTeam(id, params))
      .then(() => {
        setOpenMessage(true);
        fetchBookings(calendar);
      })
      .catch(() => {
        setOpenMessage(false);
      });
  };

  const handleDeleteBooking = (bookingId) => {
    dispatch(deleteBooking(id, bookingId))
      .then(() => {
        setOpenMessage(true);
        fetchBookings(calendar);
      })
      .catch(() => {
        setOpenMessage(false);
      });
  };

  const handleAddResource = (id, resource) => {
    console.log(resource);
    dispatch(addResource(id, resource))
      .then(() => {
        setOpenMessage(true);
        fetchBookings(calendar);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
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
        keyUp={keyUp}
        cancelSearch={cancelSearch}
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
            handleRenameTeam={handleRenameTeam}
            handleDeleteBooking={handleDeleteBooking}
            handleAddResource={handleAddResource}
            setUploading={setUploading}
          />
        </Grid>
      </Box>
      {message ? (
        <Message
          message={message}
          isOpen={hasMessage}
          handleCloseMessage={handleCloseMessage}
          type={status === 200 ? "success" : "error"}
        />
      ) : (
        <></>
      )}
      <Progress isOpen={storeDashboard.isLoading || isUploading} />
    </ThemeProvider>
  );
}
