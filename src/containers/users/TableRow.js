import React, { useState } from "react";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import {
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "containers/projects/style";
import AlertDialog from "components/common/AlertDialog";
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

export default function UserRow({
  user = {},
  handleArchiveUser,
  handleDeleteUser,
}) {
  const classes = useStyles();
  const commonClasses = commonStyle();
  const [openArchive, setOpenArchive] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const role = _.get(user, ROLE).toLowerCase();
  const date = _.get(user, CREATED_DATE);
  const status = _.get(user, STATUS_NAME);
  const isActive = status === IS_ACTIVE;
  const isPending = status === IS_PENDING;
  const optionStyle = isPending
    ? `far fa-paper-plane`
    : isActive
    ? `fas fa-archive`
    : `fas fa-undo`;

  const optionToolTip = isPending ? RE_INVITE : isActive ? ARCHIVE : ENABLE;

  const handleOpenArchiveDialog = () => {
    setOpenArchive(true);
  };
  const handleCloseArchiveDialog = () => {
    setOpenArchive(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

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
        open={openArchive}
        content={`Do you really want to ${optionToolTip} the user with email ${_.get(
          user,
          EMAIL
        )} ?`}
        handleCloseDialog={handleCloseArchiveDialog}
        handelDeleteWorkspace={() => handleArchiveUser(_.get(user, "id"))}
        btnText={optionToolTip}
      />

      <AlertDialog
        open={openDelete}
        content={`Do you really want to delete the user with email ${_.get(
          user,
          EMAIL
        )} ?`}
        handleCloseDialog={handleCloseDeleteDialog}
        handelDeleteWorkspace={() => handleDeleteUser(_.get(user, "id"))}
        btnText={"delete"}
      />
    </StyledTableRow>
  );
}
