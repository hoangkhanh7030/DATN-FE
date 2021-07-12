import React, { useState } from "react";

import {
  Button,
  TextField,
  Menu,
  MenuItem,
  FormControl,
  Box,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchBar from "material-ui-search-bar";

import * as constants from "constants/index";
import { useStyles } from "./style";

const statuses = [
  { label: constants.STATUS, value: constants.STATUS },
  { label: constants.ACTIVE, value: constants.ACTIVE },
  { label: constants.ARCHIVED, value: constants.ARCHIVED },
];

export default function Projects({
  searched = "",
  status = constants.STATUS,
  handleChangeDropdown,
}) {
  const classes = useStyles();

  /* handle popup 'MORE' options */
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={`${classes.container} ${classes.header} ${classes.flex}`}>
      <Box className={classes.flex}>
        <SearchBar value={searched} className={classes.searchbar} />
        <FormControl className={classes.root} noValidate autoComplete="off">
          <TextField
            select
            value={status}
            name={"status"}
            onChange={handleChangeDropdown}
            variant="outlined"
            margin="dense"
          >
            {statuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Box>

      <Box>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="outlined"
          className={`${classes.button} ${classes.dropdown}`}
          endIcon={<ArrowDropDownIcon />}
        >
          MORE
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          elevation={5}
        >
          <MenuItem key="import" value="import">
            Import
          </MenuItem>
          <MenuItem key="export" value="export">
            Export
          </MenuItem>
        </Menu>

        <Button
          color="primary"
          variant="contained"
          disableElevation
          className={classes.button}
        >
          New Project
        </Button>
      </Box>
    </Box>
  );
}
