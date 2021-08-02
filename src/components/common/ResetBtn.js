import { makeStyles, Tooltip, IconButton } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  btn: {
    padding: "10px",
    border: "1px solid #C4C4C4",
    borderRadius: "4px",
    fontSize: "18px",
  },
});

export const ResetBtn = ({ resetBtn = "", onClick }) => {
  const classes = useStyles();
  return (
    <Tooltip title="reset" arrow>
      <IconButton className={`${classes.btn} ${resetBtn}`} onClick={onClick}>
        <i class="fas fa-undo-alt"></i>
      </IconButton>
    </Tooltip>
  );
};
