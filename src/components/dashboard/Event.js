import React, { useState } from "react";
import moment from "moment";
import { Typography, Box } from "@material-ui/core";

import * as _ from "underscore";

import PopoverHover from "components/dashboard/Popover";
import { makeStyles } from "@material-ui/core/styles";

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
});

const PROJECT_TITLE = "project";
const CLIENT_TITLE = "client";

export default function Event({
  index = 0,
  booking = {},
  view = 1,
  resource = {},
  handleOpenDialog,
}) {
  const days = _.isEmpty(booking)
    ? 0
    : moment(_.get(booking, "endDate")).diff(
        moment(_.get(booking, "startDate")),
        "days"
      );

  const isHiddenHour = view === 4 && days === 0;

  const projectColor = _.get(booking, ["projectDTO", "color"]);
  const textColor = _.get(booking, ["projectDTO", "textColor"]);

  const classes = useStyles({ days, view, index, projectColor, textColor });

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const content = [
    [{ title: PROJECT_TITLE, detail: _.get(booking, ["projectDTO", "name"]) }],
    [
      {
        title: CLIENT_TITLE,
        detail: _.get(booking, ["projectDTO", "clientName"]),
      },
    ],
  ];

  const handleOpenEdit = (booking) => {
    console.log("YOU JUST CLICKED", booking);
    console.log(resource);
  };

  return _.isEmpty(booking) ? null : (
    <Box
      className={classes.container}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      onClick={() => handleOpenDialog(booking.startDate, resource.id, booking)}
    >
      {isHiddenHour ? null : (
        <Box className={classes.side}>
          <i className="fas fa-laptop-code"></i>
          <Typography className={classes.textHour}>
            {_.get(booking, "hourTotal")}
          </Typography>
        </Box>
      )}

      <Box className={classes.textBox}>
        <Typography noWrap className={classes.textProject}>
          {_.get(booking, ["projectDTO", "name"])}
        </Typography>
        <Typography noWrap className={classes.textClient}>
          {_.get(booking, ["projectDTO", "clientName"])}
        </Typography>
      </Box>

      <PopoverHover
        handlePopoverClose={handlePopoverClose}
        anchorEl={anchorEl}
        content={content}
      />
    </Box>
  );
}
