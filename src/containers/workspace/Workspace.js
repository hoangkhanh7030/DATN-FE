import { Grid, ThemeProvider, Typography, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import { theme } from "../../assets/css/Common";
import BookingDialog from "./dialog/BookingDialog";
import { useStyles } from "./style";
import * as _ from "underscore";
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
  const classes = useStyles();
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
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);

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

    setResources(storeResources.data);
  }, [storeResources.data]);

  useEffect(() => {
    if (!storeProjects.data) {
      return;
    }

    setProjects(storeProjects.data);
  }, [storeProjects.data]);

  const handleOpenDialog = (
    startDate = null,
    resourceId = null,
    booking = null
  ) => {
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

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Typography variant="h1">Workspace {id}</Typography>
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
      </Grid>
      {openDialog && storeProjects.data && storeResources.data ? (
        <BookingDialog
          openDialog={openDialog}
          booking={booking}
          setOpenDialog={setOpenDialog}
          projects={projects}
          resources={resources}
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
