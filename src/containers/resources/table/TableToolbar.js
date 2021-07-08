import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { theme } from "assets/css/Common";
import { ACTIVE, ARCHIVED } from "constants/index";
import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";
import { MenuProps, useToolbarStyles } from "./style";
const statuses = [ACTIVE, ARCHIVED];
export default function TableToolbar(props) {
  const classes = useToolbarStyles();

  // handle menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Toolbar className={classes.root}>
        <Box className={classes.leftToolbar}>
          <SearchBar value={""} className={classes.searchbar} />
          <FormControl variant="outlined" className={classes.selectInput}>
            <Select
              value={""}
              displayEmpty
              MenuProps={MenuProps}
              input={<OutlinedInput classes={{ input: classes.input }} />}
            >
              <MenuItem value="">STATUS</MenuItem>
              {statuses.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button
            onClick={handleClick}
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            className={classes.moreBtn}
          >
            More
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            elevation={5}
          >
            <MenuItem>Settings</MenuItem>
            <MenuItem>Export</MenuItem>
            <MenuItem>Import</MenuItem>
          </Menu>
          <Button variant="contained" color="primary" disableElevation>
            New resource
          </Button>
        </Box>
      </Toolbar>
    </ThemeProvider>
  );
}
