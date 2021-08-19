import React from "react";
import { Typography, InputBase, Paper, Box } from "@material-ui/core";

import { useStyles } from "./style";

const InputTitle = ({ classes, title }) => {
  return (
    <Box className={classes.inputTitle}>
      <Typography variant="h4">{title}</Typography>
      <Typography className={classes.required}>*</Typography>
    </Box>
  );
};

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
      <InputTitle classes={classes} title={title} />
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
