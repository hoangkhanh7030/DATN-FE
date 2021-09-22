import React, { useState } from "react";

import { Button, Box } from "@material-ui/core";

import SearchBar from "material-ui-search-bar";
import { StatusFilter } from "components/projects/toolbar/StatusFilter";
import { MoreOptions } from "components/projects/toolbar/MoreOptions";

import { STATUS } from "constants/index";
import { useStyles } from "./style";
import { ResetBtn } from "components/common/ResetBtn";

export default function ProjectsHeader({
  searched = "",
  status = STATUS,
  keyUp,
  setSearched,
  cancelSearch,
  handleChangeDropdown,
  handleOpenDialog,
  handleReset,
  handleImportProjects,
  handleExportProjects,
}) {
  const classes = useStyles();

  /* handle popup 'MORE' options */
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOption = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOption = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={`${classes.container} ${classes.header} ${classes.flex}`}>
      <Box className={classes.flex}>
        <SearchBar
          value={searched}
          className={classes.searchbar}
          onCancelSearch={cancelSearch}
          onKeyUp={keyUp}
          onChange={(newValue)=> setSearched(newValue)}
        />
        <StatusFilter
          status={status}
          handleChangeDropdown={handleChangeDropdown}
        />
        <ResetBtn onClick={handleReset} />
      </Box>

      <Box>
        <MoreOptions
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleClickOption={handleClickOption}
          handleCloseOption={handleCloseOption}
          handleImportProjects={handleImportProjects}
          handleExportProjects={handleExportProjects}
        />

        <Button
          color="primary"
          variant="contained"
          disableElevation
          className={classes.button}
          onClick={() => handleOpenDialog()}
        >
          New Project
        </Button>
      </Box>
    </Box>
  );
}
