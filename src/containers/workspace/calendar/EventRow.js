import React, { useState } from "react";

import moment from "moment";
import { Grid, Box } from "@material-ui/core";

import * as _ from "underscore";

import Event from "components/dashboard/Event";
import { DAY } from "containers/workspace/others/constants";
import { isWeekend } from "../others/buildCalendar";
import { useStyles } from "../style";

const Events = ({
  day,
  resource,
  view,
  handleDeleteBooking,
  handleOpenDialog,
}) => {
  return _.isEmpty(resource)
    ? null
    : resource.bookings.map((rowBooking, index) =>
        rowBooking
          .filter((col) => day.isSame(moment(col.startDate), DAY))
          .map((event) => (
            <Event
              key={index}
              index={index}
              booking={event}
              view={view}
              resource={resource}
              handleDeleteBooking={handleDeleteBooking}
              handleOpenDialog={handleOpenDialog}
            />
          ))
      );
};

export default function EventRow({
  calendar = [],
  view = 1,
  resource = {},
  handleDeleteBooking,
  handleOpenDialog,
}) {
  const classes = useStyles({ view });
  const [startDate, setStartDate] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const handleOpenAddDialog = (day) => {
    if (startDate)
      handleOpenDialog(startDate, resource.id, null, day, selectedDays);
    setStartDate(null);
  };
  const handleMouseMove = (day, index) => {
    if (startDate) {
      if (selectedDays.indexOf(`${index}-${resource.id}`) === -1)
        setSelectedDays([...selectedDays, `${index}-${resource.id}`]);
      document.getElementById(
        `${index}-${resource.id}`
      ).style.backgroundColor = `#9BB7FA`;
    }
  };

  return _.isEmpty(calendar)
    ? null
    : calendar.map((day, index) => (
        <Grid
          item
          key={day}
          id={`${index}-${resource.id}`}
          className={`${classes.calendarDay} ${classes.listBooking} ${
            isWeekend(day) ? classes.weekend : null
          }`}
          onMouseUp={() => {
            handleOpenAddDialog(day);
          }}
          onMouseMove={() => {
            handleMouseMove(day, index);
          }}
        >
          <Box
            className={`${classes.silbingGrid} ${
              isWeekend(day) ? classes.weekend : null
            }`}
            onMouseDown={() => {
              setStartDate(day);
              setSelectedDays([...selectedDays, `${index}-${resource.id}`]);
              document.getElementById(
                `${index}-${resource.id}`
              ).style.backgroundColor = `#9BB7FA`;
            }}
          ></Box>

          <Events
            day={day}
            view={view}
            resource={resource}
            handleDeleteBooking={handleDeleteBooking}
            handleOpenDialog={handleOpenDialog}
          />
        </Grid>
      ));
}
