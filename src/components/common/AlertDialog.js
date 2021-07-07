import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { commonStyle } from "assets/css/Common";

export default function AlertDialog({
  open,
  content,
  handleCloseDialog,
  handelDeleteWorkspace,
}) {
  const commonClasses = commonStyle();
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <i
            className={`${commonClasses.warning} fas fa-exclamation-triangle`}
          ></i>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${content}This process cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handelDeleteWorkspace}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
