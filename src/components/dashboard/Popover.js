import React from "react";
import { Popover, Typography, Box } from "@material-ui/core";
import * as _ from "underscore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: "10px 20px",
    borderRadius: 8,
  },
  box: {
    display: "flex",
    alignItems: "center",
    margin: 5,
  },
  title: {
    width: 60,
    marginRight: 10,
    color: "#929292",
    fontSize: 11,
    textTransform: "uppercase",
  },
  detail: {
    fontSize: 13,
    fontWeight: 600,
    padding: 0,
  },
}));

export default function PopoverHover({
  anchorEl = null,
  handlePopoverClose,
  content = [],
}) {
  const classes = useStyles();

  const open = Boolean(anchorEl);

  return (
    <Popover
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: _.size(content) === 3 ? "center" : "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      {content.map((el) =>
        el.map((info, index) => (
          <Box key={index} className={classes.box}>
            <Typography align="right" className={classes.title}>
              {info.title}
            </Typography>
            <Typography className={classes.detail}>{info.detail}</Typography>
          </Box>
        ))
      )}
    </Popover>
  );
}
