import React from "react";

import { Box, Button, Menu, MenuItem, TextField } from "@material-ui/core";
import { useStyles } from "containers/projects/style";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export const MoreOptions = ({
  anchorEl = null,
  setAnchorEl,
  handleClickOption,
  handleCloseOption,
  handleImportProjects,
}) => {
  const classes = useStyles();
  const onFileSelect = (e) => {
    const file = e.target.files[0];

    setAnchorEl(null);
    handleImportProjects(file);
  };

  return (
    <Box component="span">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClickOption}
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
        onClose={handleCloseOption}
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
        <MenuItem key="export" value="export">
          Export
        </MenuItem>
      </Menu>
    </Box>
  );
};
