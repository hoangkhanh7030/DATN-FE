import React from "react";
import { Typography, InputBase, Paper } from "@material-ui/core";

import { useStyles } from "./style";
import { HelperText } from "components/common/HelperText";

export const DialogInput = ({
  inputValue = "",
  handleChangeName,
  errMsg = "",
}) => {
  const classes = useStyles();
  return (
    <>
      <Paper
        className={`${classes.paper} ${errMsg ? classes.invalidBorder : null}`}
        elevation={0}
      >
        <Typography variant="h4">
          Name <span className={classes.obligatedText}>*</span>
        </Typography>
        <InputBase
          defaultValue={inputValue}
          margin="dense"
          placeholder={"name"}
          onChange={handleChangeName}
          fullWidth
          autoComplete="off"
        />
      </Paper>
      <HelperText message={errMsg} />
    </>
  );
};
