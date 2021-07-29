import React from "react";
import { Typography, InputBase, Paper } from "@material-ui/core";

import { useStyles } from "./style";

export const DialogInput = ({
  title = "",
  invalidStyle = "",
  inputName = "",
  inputValue = "",
  handleTextChange,
}) => {
  const classes = useStyles();
  return (
    <Paper
      className={`${classes.paper} ${
        invalidStyle ? classes.invalidBorder : null
      }`}
      elevation={0}
    >
      <Typography variant="h4">{title} *</Typography>
      <InputBase
        name={inputName}
        defaultValue={inputValue}
        margin="dense"
        placeholder={title.toLowerCase()}
        onChange={handleTextChange}
        fullWidth
        autoComplete="off"
      />
    </Paper>
  );
};
