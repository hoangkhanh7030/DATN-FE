import React, { useState } from "react";

import { Button, Box } from "@material-ui/core";

import SearchBar from "material-ui-search-bar";
import { StatusFilter } from "components/projects/toolbar/StatusFilter";
import { MoreOptions } from "components/projects/toolbar/MoreOptions";
import { FormDialog } from "components/projects/form_dialog/FormDiaLog";

import { STATUS } from "constants/index";
import { useStyles } from "./style";

const DIALOGTITLE = "New Project";
const BUTTONTEXT = "CONFIRM";

export default function ProjectsHeader({
  searched = "",
  status = STATUS,
  setSearched,
  cancelSearch,
  handleChangeDropdown,
  project,
  setProject,
  isOpenDialog,
  setOpenDialog,
  handleOpenDialog,
  handleCreateProject,
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
          onChange={(newValue) => setSearched(newValue)}
        />
        <StatusFilter
          status={status}
          handleChangeDropdown={handleChangeDropdown}
        />
      </Box>

      <Box>
        <MoreOptions
          anchorEl={anchorEl}
          handleClickOption={handleClickOption}
          handleCloseOption={handleCloseOption}
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

      <FormDialog
        project={project}
        setProject={setProject}
        isOpenDialog={isOpenDialog}
        setOpenDialog={setOpenDialog}
        handleActionDialog={handleCreateProject}
        dialogTitle={DIALOGTITLE}
        buttonText={BUTTONTEXT}
      />
    </Box>
  );
}
