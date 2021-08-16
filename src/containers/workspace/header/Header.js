import React from "react";
import * as _ from "underscore";
import moment from "moment";
import {
  Typography,
  IconButton,
  Box,
  Button,
  FormControl,
  TextField,
  MenuItem,
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";

import { VIEWS, DMY, WEEK } from "../others/constants";
import { useStyles } from "../style";

export default function Header({
  calendar = [],
  view = 1,
  today = moment(),
  setView,
  setToday,
  searched = "",
  setSearched,
  keyUp,
  cancelSearch,
}) {
  const classes = useStyles();

  const startDay = _.isEmpty(calendar) ? "" : _.first(calendar).format(DMY);
  const endDay = _.isEmpty(calendar) ? "" : _.last(calendar).format(DMY);
  const rangeDays = `${startDay} - ${endDay}`;

  function prevWeek() {
    return today.clone().subtract(view, WEEK);
  }

  function nextWeek() {
    return today.clone().add(view, WEEK);
  }

  const handleChangeDropdown = (e) => {
    setView(e.target.value);
  };

  return (
    <Box className={`${classes.header} ${classes.flexBasic}`}>
      <Box className={classes.searchBox}>
        <SearchBar
          value={searched}
          className={classes.searchBar}
          onCancelSearch={cancelSearch}
          onKeyUp={keyUp}
          onChange={(newValue) => setSearched(newValue)}
        />
      </Box>

      <Box className={`${classes.flexBasic}`}>
        <IconButton
          className={`fas fa-angle-left ${classes.moveIcon}`}
          onClick={() => setToday(prevWeek())}
        ></IconButton>

        <Typography variant="h3">{rangeDays}</Typography>

        <IconButton
          className={`fas fa-angle-right ${classes.moveIcon}`}
          onClick={() => setToday(nextWeek())}
        ></IconButton>
      </Box>

      <Box className={classes.actionBox}>
        <Button
          variant="outlined"
          margin="dense"
          className={classes.todayButton}
          onClick={() => setToday(moment())}
        >
          <i className={`fas fa-sun ${classes.todayIcon}`}></i>TODAY
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
      </Box>
    </Box>
  );
}
