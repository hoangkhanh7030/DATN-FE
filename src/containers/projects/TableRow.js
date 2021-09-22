import React, { useState } from "react";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { StyledTableCell, StyledTableRow, useStyles } from "./style";
import { commonStyle } from "../../assets/css/Common";
import AlertDialog from "components/common/AlertDialog";
import {
  PROJECT_NAME,
  CLIENT_NAME,
  IS_ACTIVATED,
  ACTIVE,
  ARCHIVED,
  ENABLE,
  ARCHIVE,
} from "constants/index";
import * as _ from "underscore";

export default function ProjectRow({
  project = {},
  handleOpenDialog,
  handleDeleteProject,
  handleArchiveProject,
}) {
  const projectName = _.get(project, PROJECT_NAME);
  const projectColor = _.get(project, "color");
  const classes = useStyles({ projectColor });
  const commonClasses = commonStyle();

  const isActivated = _.get(project, IS_ACTIVATED);
  const isActivatedText = isActivated ? ACTIVE : ARCHIVED;
  const isActivatedStyle = isActivated ? `fas fa-inbox` : `fas fa-undo`;
  const isActivatedToolTip = isActivated ? ARCHIVE : ENABLE;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const [openArchiveDialog, setOpenArchiveDialog] = useState(false);
  const handleOpenArchiveDialog = () => {
    setOpenArchiveDialog(true);
  };
  const handleCloseArchiveDialog = () => {
    setOpenArchiveDialog(false);
  };

  return (
    <StyledTableRow key={_.get(project, "id")}>
      <StyledTableCell component="th" scope="row">
        <i
          className={`fas fa-circle ${commonClasses.icon}  ${classes.color}`}
        ></i>
        {projectName}
      </StyledTableCell>
      <StyledTableCell align="center">
        {_.get(project, CLIENT_NAME)}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          disabled
          className={`${classes.status}  ${
            isActivated ? classes.active : classes.inactive
          }`}
        >
          {isActivatedText}
        </Button>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="edit" arrow>
          <IconButton
            className={`fas fa-pencil-alt ${commonClasses.action}`}
            onClick={() => handleOpenDialog(project)}
          ></IconButton>
        </Tooltip>
        <Tooltip title={isActivatedToolTip} arrow>
          <IconButton
            className={`${commonClasses.action} ${classes.midIcon} ${isActivatedStyle}`}
            onClick={handleOpenArchiveDialog}
          ></IconButton>
        </Tooltip>
        <Tooltip title="delete" arrow>
          <IconButton
            className={`far fa-trash-alt ${commonClasses.action}`}
            onClick={handleOpenDeleteDialog}
          ></IconButton>
        </Tooltip>
      </StyledTableCell>

      <AlertDialog
        open={openDeleteDialog}
        content={`Do you really want to delete ${projectName} project?`}
        handleCloseDialog={handleCloseDeleteDialog}
        handelActionDialog={() => handleDeleteProject(_.get(project, "id"))}
      />
      <AlertDialog
        open={openArchiveDialog}
        content={`Do you really want to ${isActivatedToolTip} ${projectName} project?`}
        handleCloseDialog={handleCloseArchiveDialog}
        handelActionDialog={() => handleArchiveProject(_.get(project, "id"),handleCloseArchiveDialog)}
        btnText={isActivatedToolTip}
      />
    </StyledTableRow>
  );
}
