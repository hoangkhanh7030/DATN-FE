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
  IS_PENDING,
  STATUS_NAME,
  RE_INVITE,
  EMAIL,
  ACTIVE,
  CREATED_DATE,
  ROLE,
  WORKSPACES_URL,
} from "constants/index";
import * as _ from "underscore";
import moment from "moment";
import { useParams } from "react-router-dom";

export default function UserRow({
  user = {},
  handleArchiveUser,
  handleDeleteUser,
  handleReInviteUser,
}) {
  const classes = useStyles();
  const commonClasses = commonStyle();
  const { id } = useParams();
  const [openArchive, setOpenArchive] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const role = _.get(user, ROLE).toLowerCase();
  const date = _.get(user, CREATED_DATE);
  const status = _.get(user, STATUS_NAME);
  const isActive = role !== "inactive";
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

  const handleOnAction = (type) => {
    type === RE_INVITE
      ? handleReInviteUser({
          id: _.get(user, "id"),
          email: _.get(user, EMAIL),
          url: `${process.env.REACT_APP_URL}${WORKSPACES_URL}/${id}`,
        }, handleCloseArchiveDialog)
      : handleArchiveUser(_.get(user, "id"), handleCloseArchiveDialog);
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{_.get(user, EMAIL)}</StyledTableCell>

      <StyledTableCell align="center">
        <Button
          disabled
          className={`${classes.status}  ${
            isPending
              ? classes.inactive
              : isActive
              ? classes.active
              : classes.inactive
          }`}
        >
          {status === IS_PENDING
            ? IS_PENDING
            : role === "inactive"
            ? "INACTIVE"
            : ACTIVE}
        </Button>
      </StyledTableCell>

      <StyledTableCell align="center">Viewer</StyledTableCell>
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
        handelActionDialog={() => handleOnAction(optionToolTip)}
        btnText={optionToolTip}
      />

      <AlertDialog
        open={openDelete}
        content={`Do you really want to delete the user with email ${_.get(
          user,
          EMAIL
        )} ?`}
        handleCloseDialog={handleCloseDeleteDialog}
        handelActionDialog={() =>
          handleDeleteUser(_.get(user, "id"), handleCloseDeleteDialog)
        }
        btnText={"delete"}
      />
    </StyledTableRow>
  );
}
