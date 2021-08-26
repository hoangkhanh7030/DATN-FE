import React from "react";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import {
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "containers/projects/style";
import { commonStyle } from "assets/css/Common";
import {
  ENABLE,
  ARCHIVE,
  IS_ACTIVE,
  IS_PENDING,
  STATUS_NAME,
  RE_INVITE,
  EMAIL,
  ACTIVE,
  CREATED_DATE,
  ROLE,
} from "constants/index";
import * as _ from "underscore";
import moment from "moment";

export default function UserRow({ user = {} }) {
  const classes = useStyles();
  const commonClasses = commonStyle();

  const role = _.get(user, ROLE).toLowerCase();
  const date = _.get(user, CREATED_DATE);
  const status = _.get(user, STATUS_NAME);
  const isActive = status === IS_ACTIVE;
  const isPending = status === IS_PENDING;
  const optionStyle = isPending
    ? `fas fa-redo`
    : isActive
    ? `fas fa-inbox`
    : `fas fa-undo`;

  const optionToolTip = isPending ? RE_INVITE : isActive ? ARCHIVE : ENABLE;
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{_.get(user, EMAIL)}</StyledTableCell>

      <StyledTableCell align="center">
        <Button
          disabled
          className={`${classes.status}  ${
            isActive ? classes.active : classes.inactive
          }`}
        >
          {status === IS_ACTIVE ? ACTIVE : status}
        </Button>
      </StyledTableCell>

      <StyledTableCell align="center">
        {role[0].toUpperCase() + role.slice(1)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {date ? moment(date).format("DD/MM/YYYY") : `--/--/----`}
      </StyledTableCell>

      <StyledTableCell align="center">
        <Tooltip title={optionToolTip} arrow>
          <IconButton
            className={`${commonClasses.action} ${classes.midIcon} ${optionStyle}`}
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
