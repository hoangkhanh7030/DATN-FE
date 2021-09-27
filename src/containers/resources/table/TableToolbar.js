import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { theme } from "assets/css/Common";
import { STATUS, STATUSES } from "constants/index";
import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";
import { MenuProps, useToolbarStyles } from "./style";
import { ResetBtn } from "components/common/ResetBtn";

export default function TableToolbar(props) {
  const {
    searched = "",
    setSearched,
    // keyword = "",
    status = STATUS,
    keyUp,
    cancelSearch,
    handleChangeDropdown,
    handleOpenDialog,
    handleReset,
    handleExportResources,
    handleImportResources,
    handleSettingsDialog,
  } = props;
  const classes = useToolbarStyles();

  // handle menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onFileSelect = (e) => {
    const file = e.target.files[0];

    setAnchorEl(null);
    handleImportResources(file);
  };

  return (
    <ThemeProvider theme={theme}>
      <Toolbar className={classes.root}>
        <Box className={classes.leftToolbar}>
          <SearchBar
            value={searched}
            className={classes.searchbar}
            onCancelSearch={cancelSearch}
            onKeyUp={keyUp}
            onChange={(newValue) => setSearched(newValue)}
          />
          <FormControl variant="outlined" className={classes.selectInput}>
            <Select
              value={status}
              name={"status"}
              displayEmpty
              MenuProps={MenuProps}
              input={<OutlinedInput classes={{ input: classes.input }} />}
              onChange={handleChangeDropdown}
            >
              {STATUSES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ResetBtn resetBtn={classes.resetBtn} onClick={handleReset} />
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
            <MenuItem>
              <Button
                component="span"
                onClick={() => {
                  handleSettingsDialog();
                  handleClose();
                }}
              >
                Settings
              </Button>
            </MenuItem>

            <MenuItem style={{ paddingLeft: "0px !important" }}>
              <label htmlFor="btn-upload">
                <TextField
                  type="file"
                  id="btn-upload"
                  name="btn-upload"
                  onChange={onFileSelect}
                  className={classes.import}
                />
                <Button component="span">Import</Button>
              </label>
            </MenuItem>

            <MenuItem>
              <Button component="span" onClick={handleExportResources}>
                Export
              </Button>
            </MenuItem>
          </Menu>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => handleOpenDialog()}
          >
            New resource
          </Button>
        </Box>
      </Toolbar>
    </ThemeProvider>
  );
}
