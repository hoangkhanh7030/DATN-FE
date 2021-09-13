import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@material-ui/core";
import { HelperText } from "components/common/HelperText";
import { CustomizedDatePicker } from "components/dashboard/dialog/CustomizedDatePicker";
import { CustomizedSelect } from "components/dashboard/dialog/CustomizedSelect";
import { DialogTitle } from "components/dashboard/dialog/DialogTitle";
import CustomizedTab from "components/dashboard/dialog/Tab";
import { FormDialog } from "components/projects/form_dialog/FormDiaLog";
import {
  DEFAULT_PROJECT,
  END_DATE,
  IMAGES_URL,
  PROJECT_ID,
  RESOURCE_ID,
  START_DATE,
} from "constants/index";
import ResourceDialog from "containers/resources/dialog/ResourceDialog";
import { storage } from "firebase/index";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProject, getProjectsBooking } from "redux/actions/projectAction";
import { addResource, getResourcesBooking } from "redux/actions/resourceAction";
import { getTeams } from "redux/actions/teamAction";
import { SET_MESSAGE } from "redux/constants";
import { useStyles } from "./style";

const DIALOGTITLE = "New Project";
const BUTTONTEXT = "CONFIRM";

const DEFAULT_RESOURCE = {
  avatar: "",
  name: "",
  teamId: "",
  positionId: "",
};
export default function BookingDialog(props) {
  const {
    openDialog = false,
    booking = {},
    setBooking,
    handleCloseDialog,
    projects = [],
    resources = [],
    projectSearch = "",
    setProjectSearch,
    resourceSearch = "",
    setResourceSearch,
    handleAddBooking,
    handleEditBooking,
  } = props;

  const btnLoading = useSelector((state) => state.booking.isLoading);

  const oldPercentage = booking.percentage;
  const oldDuration = booking.duration;
  const { id } = useParams();
  const dispatch = useDispatch();

  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const [dateMessage, setDateMessage] = useState("");

  const [openPrj, setOpenPrj] = useState(false);
  const [openRsc, setOpenRsc] = useState(false);
  const [project, setProject] = useState(DEFAULT_PROJECT);
  const [resource, setResource] = useState(DEFAULT_RESOURCE);
  const [resourceId, setResourceId] = useState(null);

  const storeTeams = useSelector((state) => state.teams);

  const handleOpenPrjDialog = () => {
    setOpenPrj(!openPrj);
  };

  const handleOpenRscDialog = () => {
    dispatch(getTeams(id));
    setResourceId("");

    setOpenRsc(!openRsc);
  };

  //
  const [invalidValue, setInvalidValue] = useState({
    projectId: "",
    resourceId: "",
  });

  const handleStartDateChange = (value) => {
    setBooking({ ...booking, startDate: value });
    setDateMessage(
      booking.endDate.isBefore(value)
        ? "Start date must not be after end date"
        : ""
    );
  };

  const handleEndDateChange = (value) => {
    setBooking({ ...booking, endDate: value });
    setDateMessage(
      value.isBefore(booking.startDate, "day")
        ? "Start date must not be after end date"
        : ""
    );
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    tabValue === 0
      ? setBooking({
          ...booking,
          duration: booking.id ? oldDuration : 8,
        })
      : setBooking({
          ...booking,
          percentage: booking.id ? oldPercentage : 100,
        });
  };

  const handleChangeSelectItem = (value, name) => {
    setBooking({ ...booking, [name]: value });
    setInvalidValue({ ...invalidValue, [name]: "" });
    name === PROJECT_ID ? setProjectSearch("") : setResourceSearch("");
  };

  const handleChangeTabInput = (event) => {
    tabValue === 0
      ? setBooking({
          ...booking,
          percentage: parseFloat(event.target.value),
        })
      : setBooking({
          ...booking,
          duration: parseFloat(event.target.value),
        });
  };

  // const cancelSearch = (e) => {
  //   console.log("cancelSearch");
  //   setSearchName("");
  // };

  // handle submit dialog
  const handleSubmitDialog = () => {
    if (!Boolean(booking.projectId && booking.resourceId && !dateMessage)) {
      setInvalidValue({
        ...invalidValue,
        projectId: !booking.projectId ? PROJECT_ID : "",
        resourceId: !booking.resourceId ? RESOURCE_ID : "",
      });

      return;
    }
    const data = {
      ...booking,
      startDate: booking.startDate.format("YYYY-MM-DD"),
      endDate: booking.endDate.format("YYYY-MM-DD"),
      percentage: tabValue === 0 ? booking.percentage : "",
      duration: tabValue === 1 ? booking.duration : "",
    };
    booking.id ? handleEditBooking(data) : handleAddBooking(data);
  };

  const handleCreateProject = (project) => {
    dispatch(addProject(id, project)).then(() => {
      dispatch(getProjectsBooking(id, projectSearch));
    });
  };

  const callApiAddResource = (id, resource) => {
    dispatch(addResource(id, resource)).then(() => {
      dispatch(getResourcesBooking(id, projectSearch));
    });
  };

  const getUploadedImageUrl = async (avatarFile) => {
    return new Promise((resolve, reject) => {
      const uploadTask = storage
        .ref(`${IMAGES_URL}${avatarFile.name}`)
        .put(avatarFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          dispatch({
            type: SET_MESSAGE,
            payload: error,
          });
          reject(error);
        },
        async () => {
          const imgURL = await uploadTask.snapshot.ref.getDownloadURL();
          resolve(imgURL);
          return imgURL;
        }
      );
    });
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle onClose={handleCloseDialog}>
          {booking.id ? "Edit Booking" : "New Booking"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <CustomizedDatePicker
                classes={classes}
                title={START_DATE}
                dateValue={booking.startDate}
                handleDateChange={handleStartDateChange}
                dateMessage={dateMessage}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomizedDatePicker
                classes={classes}
                title={END_DATE}
                dateValue={booking.endDate}
                startDate={booking.startDate}
                handleDateChange={handleEndDateChange}
              />
            </Grid>
            {!dateMessage ? (
              <></>
            ) : (
              <Grid item xs={12} className={classes.errorText}>
                {
                  <HelperText
                    dateError={classes.dateError}
                    message={dateMessage}
                  />
                }
              </Grid>
            )}
          </Grid>

          <CustomizedTab
            classes={classes}
            tabValue={tabValue}
            percentage={booking.percentage}
            duration={booking.duration}
            startDate={booking.startDate}
            endDate={booking.endDate}
            handleChangeTab={handleChangeTab}
            handleChangeTabInput={handleChangeTabInput}
          />

          <CustomizedSelect
            classes={classes}
            name={PROJECT_ID}
            selectValue={booking.projectId}
            items={projects}
            searchName={projectSearch}
            setSearchName={setProjectSearch}
            handleChangeSelectItem={handleChangeSelectItem}
            invalidStyle={invalidValue.projectId === PROJECT_ID}
            errorName={PROJECT_ID}
            errorValue={invalidValue.projectId}
            handleOpenDialog={handleOpenPrjDialog}
          />

          <CustomizedSelect
            classes={classes}
            name={RESOURCE_ID}
            selectValue={booking.resourceId}
            items={resources}
            searchName={resourceSearch}
            setSearchName={setResourceSearch}
            handleChangeSelectItem={handleChangeSelectItem}
            invalidStyle={invalidValue.resourceId === RESOURCE_ID}
            errorName={RESOURCE_ID}
            errorValue={invalidValue.resourceId}
            handleOpenDialog={handleOpenRscDialog}
          />
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={handleSubmitDialog}
            disabled={btnLoading}
          >
            {booking.id ? "Update" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
      <FormDialog
        project={project}
        setProject={setProject}
        isOpenDialog={openPrj}
        setOpenDialog={handleOpenPrjDialog}
        dialog={{
          dialogTitle: DIALOGTITLE,
          buttonText: BUTTONTEXT,
          actionDialog: handleCreateProject,
        }}
        dialogStyle={true}
      />

      <ResourceDialog
        isOpenDialog={openRsc}
        resource={resource}
        resourceId={resourceId}
        teams={storeTeams.data || []}
        setResource={setResource}
        setIsOpenDialog={handleOpenRscDialog}
        callApiAddResource={callApiAddResource}
        getUploadedImageUrl={getUploadedImageUrl}
      />
    </>
  );
}
