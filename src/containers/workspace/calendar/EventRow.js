import React from "react";

import moment from "moment";
import { Grid, Box } from "@material-ui/core";

import * as _ from "underscore";

import Event from "components/dashboard/Event";
import { DAY } from "containers/workspace/others/constants";
import { isWeekend } from "../others/buildCalendar";
import { useStyles } from "../style";

const Events = ({ day, resource, view }) => {
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
            />
          ))
      );
};

export default function EventRow({ calendar = [], view = 1, resource = {} }) {
  const classes = useStyles({ view });
  const handleOpenAdd = (date) => {};

  return _.isEmpty(calendar)
    ? null
    : calendar.map((day) => (
        <Grid
          item
          key={day}
          className={`${classes.calendarDay} ${classes.listBooking} ${
            isWeekend(day) ? classes.weekend : null
          }`}
        >
          <Box
            className={`${classes.silbingGrid} ${
              isWeekend(day) ? classes.weekend : null
            }`}
            onClick={() => handleOpenAdd(day)}
          ></Box>

          <Events day={day} view={view} resource={resource} />
        </Grid>
      ));
}
