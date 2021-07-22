import React from "react";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { StyledTableCell, StyledTableRow, useStyles } from "./style";
import { commonStyle } from "../../assets/css/Common";
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

export default function ProjectRow({ project = {} }) {
  const projectColor = _.get(project, "color");
  const classes = useStyles({ projectColor });
  const commonClasses = commonStyle();

  const isActivated = _.get(project, IS_ACTIVATED);
  const isActivatedText = isActivated ? ACTIVE : ARCHIVED;
  const isActivatedStyle = isActivated ? `fas fa-inbox` : `fas fa-undo`;
  const isActivatedToolTip = isActivated ? ARCHIVE : ENABLE;

  return (
    <StyledTableRow key={_.get(project, "id")}>
      <StyledTableCell component="th" scope="row">
        <i
          className={`fas fa-circle ${commonClasses.icon}  ${classes.color}`}
        ></i>
        {_.get(project, PROJECT_NAME)}
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
          ></IconButton>
        </Tooltip>
        <Tooltip title={isActivatedToolTip} arrow>
          <IconButton
            className={`${commonClasses.action} ${classes.midIcon} ${isActivatedStyle}`}
          ></IconButton>
        </Tooltip>
        <Tooltip title="delete" arrow>
          <IconButton
            className={`far fa-trash-alt ${commonClasses.action}`}
          ></IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
}
