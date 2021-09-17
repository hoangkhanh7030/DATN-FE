import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Resource from "components/dashboard/Resource";
import * as _ from "underscore";
import { useStyles } from "../style";

const rscStyles = makeStyles({
  rscList: {
    minHeight: ({ rowHeight }) => 62 + (rowHeight - 1) * 50,
    border: "1px solid #E0E0E0",
    borderTop: 0,
    padding: 8,
    display: "flex",
    alignItems: "center",
  },
  rscEmpty: {
    borderBottom: 0,
    background: "#F5F5F5",
  },

  rscLastEmpty: {
    borderBottom: "1px solid #E0E0E0",
  },
});

export default function ResourceCell({
  resource = {},
  team = {},
  lastRsc = false,
}) {
  const isEmptyRsc = _.isEmpty(resource);
  const rowHeight = isEmptyRsc ? 1 : _.size(_.get(resource, "bookings"));

  const classes = useStyles();
  const rscClasses = rscStyles({ rowHeight });
  const isEmptyRscStyle = isEmptyRsc ? rscClasses.rscEmpty : null;
  const isLastEmptyRscStyle =
    lastRsc && isEmptyRsc ? rscClasses.rscLastEmpty : null;

  return (
    <>
      <Grid
        item
        className={`${classes.leftWidth} 
                ${rscClasses.rscList} 
                ${isEmptyRscStyle} 
                ${isLastEmptyRscStyle}`}
      >
        {isEmptyRsc ? null : <Resource resource={resource} team={team} />}
      </Grid>
    </>
  );
}
