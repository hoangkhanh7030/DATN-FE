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
import { END_DATE, PROJECT_ID, RESOURCE_ID, START_DATE } from "constants/index";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addBooking, editBooking } from "redux/actions/bookingAction";
import { useStyles } from "./style";

export default function BookingDialog(props) {
  const {
    openDialog = false,
    booking = {},
    setOpenDialog,
    projects = [],
    resources = [],
    projectSearch = "",
    setProjectSearch,
    resourceSearch = "",
    setResourceSearch,
  } = props;

  console.log(booking);
  const { id } = useParams();
  const dispatch = useDispatch();

  const classes = useStyles();

  const [bookingData, setBookingData] = useState(booking);

  const [tabValue, setTabValue] = useState(0);

  const [dateMessage, setDateMessage] = useState("");

  const [invalidValue, setInvalidValue] = useState({
    projectId: "",
    resourceId: "",
  });

  const handleStartDateChange = (value) => {
    setBookingData({ ...bookingData, startDate: value });
    setDateMessage(
      bookingData.endDate.isBefore(value)
        ? "Start date must not be after end date"
        : ""
    );
  };

  const handleEndDateChange = (value) => {
    setBookingData({ ...bookingData, endDate: value });
    setDateMessage(
      value.isBefore(bookingData.startDate, "day")
        ? "Start date must not be after end date"
        : ""
    );
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    // tabValue === 0
    //   ? setBookingData({ ...bookingData, duration: 8 })
    //   : setBookingData({ ...bookingData, percentage: 100 });
  };

  const handleChangeSelectItem = (value, name) => {
    setBookingData({ ...bookingData, [name]: value });
    setInvalidValue({ ...invalidValue, [name]: "" });
    name === PROJECT_ID ? setProjectSearch("") : setResourceSearch("");
  };

  const handleChangeTabInput = (event) => {
    tabValue === 0
      ? setBookingData({
          ...bookingData,
          percentage: parseFloat(event.target.value),
        })
      : setBookingData({
          ...bookingData,
          duration: parseFloat(event.target.value),
        });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const cancelSearch = (e) => {
  //   console.log("cancelSearch");
  //   setSearchName("");
  // };

  // handle submit dialog
  const handleSubmitDialog = () => {
    if (
      !Boolean(bookingData.projectId && bookingData.resourceId && !dateMessage)
    ) {
      setInvalidValue({
        ...invalidValue,
        projectId: !bookingData.projectId ? PROJECT_ID : "",
        resourceId: !bookingData.resourceId ? RESOURCE_ID : "",
      });

      return;
    }
    const data = {
      ...bookingData,
      startDate: bookingData.startDate.format("YYYY-MM-DD"),
      endDate: bookingData.endDate.format("YYYY-MM-DD"),
      percentage: tabValue === 0 ? bookingData.percentage : "",
      duration: tabValue === 1 ? bookingData.duration : "",
    };

    data.id
      ? dispatch(editBooking(id, data))
          .then(() => {
            console.log("edit success");
            // window.location.reload();
            setOpenDialog(false);
          })
          .catch(() => {
            // setOpenMessage(true);
          })
      : dispatch(
          addBooking(id,data)
        )
          .then(() => {
            console.log("add success");
            // window.location.reload();
            setOpenDialog(false);
          })
          .catch(() => {
            // setOpenMessage(true);
          });
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle onClose={handleCloseDialog}>
        {bookingData.id ? "Edit Booking" : "New Booking"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <CustomizedDatePicker
              classes={classes}
              title={START_DATE}
              dateValue={bookingData.startDate}
              handleDateChange={handleStartDateChange}
              dateMessage={dateMessage}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomizedDatePicker
              classes={classes}
              title={END_DATE}
              dateValue={bookingData.endDate}
              startDate={bookingData.startDate}
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
          percentage={bookingData.percentage}
          duration={bookingData.duration}
          startDate={bookingData.startDate}
          endDate={bookingData.endDate}
          handleChangeTab={handleChangeTab}
          handleChangeTabInput={handleChangeTabInput}
        />

        <CustomizedSelect
          classes={classes}
          name={PROJECT_ID}
          selectValue={bookingData.projectId}
          items={projects}
          searchName={projectSearch}
          setSearchName={setProjectSearch}
          handleChangeSelectItem={handleChangeSelectItem}
          invalidStyle={invalidValue.projectId === PROJECT_ID}
          errorName={PROJECT_ID}
          errorValue={invalidValue.projectId}
        />

        <CustomizedSelect
          classes={classes}
          name={RESOURCE_ID}
          selectValue={bookingData.resourceId}
          items={resources}
          searchName={resourceSearch}
          setSearchName={setResourceSearch}
          handleChangeSelectItem={handleChangeSelectItem}
          invalidStyle={invalidValue.resourceId === RESOURCE_ID}
          errorName={RESOURCE_ID}
          errorValue={invalidValue.resourceId}
        />
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenDialog(false);
          }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleSubmitDialog}
        >
          {bookingData.id ? "Update" : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
