import { Avatar, Button, IconButton, Tooltip } from "@material-ui/core";
import { IS_ACTIVATED, ACTIVE, ARCHIVED } from "constants/index";
import React from "react";
import * as _ from "underscore";
import { StyledTableRow, StyledTableCell, useStyles } from "./style";
export default function EnhancedTableRow(props) {
  const { row, handleOpenDialog } = props;
  const classes = useStyles();
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
            _.get(row, IS_ACTIVATED) ? classes.active : classes.inactive
          }`}
        >
          {_.get(row, IS_ACTIVATED) ? ACTIVE : ARCHIVED}
        </Button>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="Edit resource">
          <IconButton
            className={`fas fa-pencil-alt`}
            onClick={() => handleOpenDialog(row)}
          ></IconButton>
        </Tooltip>
        <Tooltip title="Archive resource">
          <IconButton className={`fas fa-inbox`}></IconButton>
        </Tooltip>
        <Tooltip title="Delete resource">
          <IconButton className={`far fa-trash-alt`}></IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
}
