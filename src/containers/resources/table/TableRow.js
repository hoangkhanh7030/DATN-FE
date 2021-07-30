import { Avatar, Button, IconButton, Tooltip } from "@material-ui/core";
import {
  IS_ARCHIVED,
  ACTIVE,
  ARCHIVED,
  ARCHIVE,
  ENABLE,
} from "constants/index";
import React from "react";
import * as _ from "underscore";
import { StyledTableRow, StyledTableCell, useStyles } from "./style";
export default function EnhancedTableRow(props) {
  const { row, handleOpenDialog, handleOpenDeleteDialog } = props;
  const classes = useStyles();

  const isArchived = _.get(row, IS_ARCHIVED);
  const isArchivedText = isArchived ? ARCHIVED : ACTIVE;
  const isArchivedStyle = isArchived ? `fas fa-undo` : `fas fa-inbox`;
  const isArchivedToolTip = isArchived ? ENABLE : ARCHIVE;

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
        <Tooltip title="Edit resource">
          <IconButton
            className={`fas fa-pencil-alt`}
            onClick={() => handleOpenDialog(row)}
          ></IconButton>
        </Tooltip>
        <Tooltip title={isArchivedToolTip} arrow>
          <IconButton className={`${isArchivedStyle}`}></IconButton>
        </Tooltip>
        <Tooltip title="Delete resource">
          <IconButton
            className={`far fa-trash-alt`}
            onClick={() => handleOpenDeleteDialog(_.get(row, "id"))}
          ></IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
}
