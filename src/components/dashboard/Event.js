import React, { useState } from "react";
import { Typography, Box, IconButton } from "@material-ui/core";
import * as _ from "underscore";

import AlertDialog from "components/common/AlertDialog";
import { diffDays } from "containers/workspace/others/buildCalendar";
import PopoverHover from "components/dashboard/Popover";
import { makeStyles } from "@material-ui/core/styles";
import {
  STARTDATE,
  ENDDATE,
  PROJECT,
  HOUR_TOTAL,
  MAX_VIEW,
  MIN_DAY,
} from "containers/workspace/others/constants";
import { PROJECT_NAME, CLIENT_NAME, TEXT_COLOR, COLOR } from "constants/index";

const PROJECT_TITLE = "project";
const CLIENT_TITLE = "client";
const ID = "id";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    left: 10,
    top: ({ index }) => 8 + index * 50,
    zIndex: 1,
    display: "flex",
    width: ({ days, view }) =>
      `calc(89% + ${days * 100.5}% - ${(view - 1) * 10}%)`,
    minHeight: "44px",
    background: ({ projectColor }) => projectColor,
    color: "white",
    borderRadius: 8,
  },
  side: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 8px 4px",
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "8px 0 0 8px",
  },
  textBox: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  textHour: {
    fontSize: 10,
  },
  textProject: {
    fontSize: 12,
    padding: "4px 8px",
    paddingBottom: 0,
  },
  textClient: {
    fontSize: 10,
    padding: "4px 8px",
    textTransform: "uppercase",
  },
  icon: {
    fontSize: 16,
    color: "white",
    position: "absolute",
    right: 2,
    top: 2,
  },
});

const HourTotal = ({ classes, isHiddenHour, booking }) => {
  return isHiddenHour ? null : (
    <Box className={classes.side}>
      <i className="fas fa-clock"></i>
      <Typography className={classes.textHour}>
        {_.get(booking, HOUR_TOTAL)}
      </Typography>
    </Box>
  );
};

export default function Event({
  index = 0,
  booking = {},
  view = 1,
  resource = {},
  handleDeleteBooking,
}) {
  const days = _.isEmpty(booking)
    ? 0
    : diffDays(_.get(booking, ENDDATE), _.get(booking, STARTDATE));
  const projectColor = _.get(booking, [PROJECT, COLOR]);
  const textColor = _.get(booking, [PROJECT, TEXT_COLOR]);
  const isHiddenHour = view === MAX_VIEW && days === MIN_DAY;

  const classes = useStyles({ days, view, index, projectColor, textColor });

  const [openDelete, setOpenDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShow(true);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShow(false);
  };

  const content = [
    [{ title: PROJECT_TITLE, detail: _.get(booking, [PROJECT, PROJECT_NAME]) }],
    [{ title: CLIENT_TITLE, detail: _.get(booking, [PROJECT, CLIENT_NAME]) }],
  ];

  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  function HourTotal() {
    return isHiddenHour ? null : (
      <Box className={classes.side}>
        <i className="fas fa-clock"></i>
        <Typography className={classes.textHour}>
          {_.get(booking, HOUR_TOTAL)}
        </Typography>
      </Box>
    );
  }

  const handleOpenEdit = (booking) => {};

  return _.isEmpty(booking) ? null : (
    <Box
      className={classes.container}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      onClick={() => handleOpenEdit(booking)}
    >
      <HourTotal
        classes={classes}
        isHiddenHour={isHiddenHour}
        booking={booking}
      />

      <Box className={classes.textBox}>
        <Typography noWrap className={classes.textProject}>
          {_.get(booking, [PROJECT, PROJECT_NAME])}
        </Typography>
        <Typography noWrap className={classes.textClient}>
          {_.get(booking, [PROJECT, CLIENT_NAME])}
        </Typography>
      </Box>

      {show ? (
        <IconButton
          className={`fas fa-times ${classes.icon}`}
          onClick={handleOpenDeleteDialog}
        />
      ) : null}

      <PopoverHover
        handlePopoverClose={handlePopoverClose}
        anchorEl={anchorEl}
        content={content}
      />
      <AlertDialog
        open={openDelete}
        content={`Do you really want to delete this booking?`}
        handleCloseDialog={handleCloseDeleteDialog}
        handelDeleteWorkspace={() => handleDeleteBooking(_.get(booking, ID))}
      />
    </Box>
  );
}
