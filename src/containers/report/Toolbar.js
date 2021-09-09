import React from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  ButtonGroup,
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
  handleExport,
  type,
  setType,
}) {
  const classes = useStyles();

  function prev() {
    return today.clone().subtract(1, view);
  }
  function next() {
    return today.clone().add(1, view);
  }

  return (
    <Box className={`${classes.flexBasic} ${classes.header}`}>
      <Box className={classes.actionBox}>
        <IconButton
          className={`fas fa-angle-left ${classes.moveIcon}`}
          onClick={() => setToday(prev())}
        ></IconButton>
        <Typography>
          {startDate.format(DMY)} - {endDate.format(DMY)}
        </Typography>

        <IconButton
          className={`fas fa-angle-right ${classes.moveIcon}`}
          onClick={() => setToday(next())}
        ></IconButton>
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

        <ButtonGroup>
          <Button
            className={type === "HOUR" ? classes.disable : classes.current}
            onClick={() => setType("DAY")}
          >
            DAYS
          </Button>
          <Button
            className={type === "DAY" ? classes.disable : classes.current}
            onClick={() => setType("HOUR")}
          >
            HOURS
          </Button>
        </ButtonGroup>
      </Box>

      <Button variant="outlined" margin="dense" onClick={handleExport}>
        EXPORT
      </Button>
    </Box>
  );
}
