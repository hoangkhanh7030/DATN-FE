import React from "react";

import { Typography, IconButton } from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "black",
  },
  dialogStyle: {
    marginTop: 10,
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, dialogStyle, ...other } = props;

  return (
    <MuiDialogTitle
      disableTypography
      className={`${classes.root} ${dialogStyle ? classes.dialogStyle : ""}`}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
