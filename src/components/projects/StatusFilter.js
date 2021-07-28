import React from "react";

import { TextField, MenuItem, FormControl } from "@material-ui/core";

import { STATUSES, STATUS } from "constants/index";
import { useStyles } from "containers/projects/style";

export const StatusFilter = ({ status = STATUS, handleChangeDropdown }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root} noValidate autoComplete="off">
      <TextField
        select
        value={status}
        name={"status"}
        onChange={handleChangeDropdown}
        variant="outlined"
        margin="dense"
      >
        {STATUSES.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};
