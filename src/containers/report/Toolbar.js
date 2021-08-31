import React from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  MenuItem,
  Typography,
  IconButton,
} from "@material-ui/core";
import { VIEWS, DMY } from "constants/index";
import { useStyles } from "./style";

export default function Toolbar({
  view,
  startDate,
  endDate,
  handleChangeDropdown,
  today,
  setToday,
}) {
  const classes = useStyles();

  function prev() {
    return today.clone().subtract(1, view);
  }
  function next() {
    return today.clone().add(1, view);
  }

  return (
    <Box className={classes.actionBox}>
      <Button variant="outlined" margin="dense" className={classes.todayButton}>
        REPORT
      </Button>

      <FormControl className={classes.select} noValidate autoComplete="off">
        <TextField
          select
          value={view}
          name={"view"}
          onChange={handleChangeDropdown}
          variant="outlined"
          margin="dense"
        >
          {VIEWS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <Typography>
        {startDate.format(DMY)} - {endDate.format(DMY)}
      </Typography>
      <IconButton
        className={`fas fa-angle-left ${classes.moveIcon}`}
        onClick={() => setToday(prev())}
      ></IconButton>
      <IconButton
        className={`fas fa-angle-right ${classes.moveIcon}`}
        onClick={() => setToday(next())}
      ></IconButton>
    </Box>
  );
}
