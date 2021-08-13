import React from "react";

import moment from "moment";
import { Grid, Box } from "@material-ui/core";

import * as _ from "underscore";

import Event from "components/dashboard/Event";
import { D_M_Y } from "containers/workspace/others/constants";
import { isWeekend } from "../others/buildCalendar";
import { useStyles } from "../style";

export default function EventRow({
  calendar = [],
  view = 1,
  resource = {},
  handleOpenDialog,
}) {
  const classes = useStyles({ view });

  const handleOpenAdd = (date) => {
    console.log(date);
    console.log(resource);
  };
  return calendar.length > 0
    ? calendar.map((day) => (
        <Grid
          item
          className={`${classes.calendarDay} ${classes.listBooking} ${
            isWeekend(day) ? classes.weekend : null
          }`}
        >
          <Box
            className={`${classes.silbingGrid} ${
              isWeekend(day) ? classes.weekend : null
            }`}
            onClick={() => handleOpenDialog(day, resource.id)}
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
