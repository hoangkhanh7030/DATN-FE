import React, { useState } from "react";

import moment from "moment";
import { Grid, Box } from "@material-ui/core";

import * as _ from "underscore";

import Event from "components/dashboard/Event";
import { D_M_Y } from "containers/workspace/others/constants";
import { isWeekend } from "../others/buildCalendar";
import { useStyles } from "../style";
import { forEach } from "underscore";

export default function EventRow({
  calendar = [],
  view = 1,
  resource = {},
  handleOpenDialog,
}) {
  const [startDate, setStartDate] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);

  const classes = useStyles({ view });

  const handleMouseMove = (day, index) => {
    if (startDate) {
      console.log(
        "🚀 ~ file: EventRow.js ~ line 26 ~ handleMouseMove ~ day",
        day
      );
      if (selectedDays.indexOf(`${index}-${resource.id}`) === -1)
        setSelectedDays([...selectedDays, `${index}-${resource.id}`]);
      document.getElementById(
        `${index}-${resource.id}`
      ).style.backgroundColor = `#9BB7FA`;
    }
  };
  
  const handleOpenAddDialog = (day) => {
    handleOpenDialog(startDate, resource.id, null, day, selectedDays);
    setStartDate(null);
  };

  return calendar.length > 0
    ? calendar.map((day, index) => (
        <Grid
          item
          id={`${index}-${resource.id}`}
          className={`${classes.calendarDay} ${classes.listBooking} ${
            isWeekend(day) ? classes.weekend : null
          }`}
          onMouseMove={() => {
            handleMouseMove(day, index);
          }}
          onMouseDown={() => {
            setStartDate(day);
          }}
          onMouseUp={() => handleOpenAddDialog(day)}
        >
          <Box
            className={`${classes.silbingGrid} ${
              isWeekend(day) ? classes.weekend : null
            }`}
          ></Box>
          {_.isEmpty(resource)
            ? null
            : resource.bookings.map((rowBooking, index) =>
                rowBooking
                  .filter(
                    (col) =>
                      moment(col.startDate).format(D_M_Y) === day.format(D_M_Y)
                  )
                  .map((event) => (
                    <Event
                      index={index}
                      booking={event}
                      view={view}
                      resource={resource}
                      handleOpenDialog={handleOpenDialog}
                    />
                  ))
              )}
        </Grid>
      ))
    : null;
}
