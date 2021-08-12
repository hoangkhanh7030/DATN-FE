import { IconButton, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "black",
  },
  placeholder: {
    color: "#A2A2A2B5",
  },
}));

export const DialogTitle = (props) => {
  const { children, onClose } = props;
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
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
};

export const Placeholder = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.placeholder}>{children}</div>;
};
