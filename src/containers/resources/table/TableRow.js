import { Avatar, Button, IconButton, Tooltip } from "@material-ui/core";
import AlertDialog from "components/common/AlertDialog";
import {
  IS_ARCHIVED,
  ACTIVE,
  ARCHIVED,
  ARCHIVE,
  ENABLE,
} from "constants/index";
import React, { useState } from "react";
import * as _ from "underscore";
import { StyledTableRow, StyledTableCell, useStyles } from "./style";
export default function EnhancedTableRow(props) {
  const { row, handleOpenDialog, handleDeleteProject, handleArchiveProject } =
    props;
  const classes = useStyles();

  const isArchived = _.get(row, IS_ARCHIVED);
  const isArchivedText = isArchived ? ARCHIVED : ACTIVE;
  const isArchivedStyle = isArchived ? `fas fa-undo` : `fas fa-inbox`;
  const isArchivedToolTip = isArchived ? ENABLE : ARCHIVE;

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
    <StyledTableRow key={row.id}>
      <StyledTableCell align="center">
        <Avatar className={classes.avatar} alt="" src={_.get(row, "avatar")} />
      </StyledTableCell>
      <StyledTableCell>{_.get(row, "name")}</StyledTableCell>
      <StyledTableCell align="center">
        {_.get(row, ["positionDTO", "teamDTO", "name"])}
      </StyledTableCell>
      <StyledTableCell align="center">
        {_.get(row, ["positionDTO", "name"])}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          disabled
          className={`${classes.status}  ${
            isArchived ? classes.inactive : classes.active
          }`}
        >
          {isArchivedText}
        </Button>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="edit">
          <IconButton
            className={`fas fa-pencil-alt`}
            onClick={() => handleOpenDialog(row)}
          ></IconButton>
        </Tooltip>
        <Tooltip title={isArchivedToolTip} arrow>
          <IconButton
            className={`${isArchivedStyle}`}
            onClick={() => handleOpenArchiveDialog(_.get(row, "id"))}
          ></IconButton>
        </Tooltip>
        <Tooltip title="delete">
          <IconButton
            className={`far fa-trash-alt`}
            onClick={() => handleOpenDeleteDialog(_.get(row, "id"))}
          ></IconButton>
        </Tooltip>
      </StyledTableCell>
      <AlertDialog
        open={openDeleteDialog}
        content={`Do you really want to delete this resource?`}
        handleCloseDialog={handleCloseDeleteDialog}
        handelActionDialog={() => handleDeleteProject(_.get(row, "id"))}
      />
      <AlertDialog
        open={openArchiveDialog}
        content={`Do you really want to ${isArchivedToolTip} this resource?`}
        handleCloseDialog={handleCloseArchiveDialog}
        handelActionDialog={() =>
          handleArchiveProject(_.get(row, "id"), handleCloseArchiveDialog)
        }
        btnText={isArchivedToolTip}
      />
    </StyledTableRow>
  );
}
