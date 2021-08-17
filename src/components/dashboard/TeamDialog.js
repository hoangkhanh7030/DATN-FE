import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

import { HelperText } from "components/common/HelperText";
import { DialogTitle } from "components/projects/form_dialog/DialogTitle";
import { DialogInput } from "components/projects/form_dialog/DialogInput";
import { useStyles } from "components/projects/form_dialog/style";

import * as _ from "underscore";

const NAME_TEAM = "name";
const ID_TEAM = "id";
const TITLE = "RENAME TEAM";

export default function TeamDialog({
  team = {},
  isOpenDialog = false,
  setOpenDialog,
  handleRenameTeam,
}) {
  const classes = useStyles();

  const [invalidName, setInvalidName] = useState(false);
  const [name, setName] = useState(_.get(team, NAME_TEAM));

  const getInvalidNameValue = (nameValue) => {
    return Boolean(!nameValue);
  };

  const handleTextChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    setInvalidName(getInvalidNameValue(nameValue));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setName(_.get(team, NAME_TEAM));
    setInvalidName("");
  };

  const handleSubmitDialog = () => {
    if (name) {
      handleCloseDialog();
      handleRenameTeam(_.get(team, ID_TEAM), name);
    }
    return;
  };

  return (
    <Dialog
      open={isOpenDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title" onClose={handleCloseDialog}>
        {TITLE}
      </DialogTitle>
      <DialogContent>
        <DialogInput
          title="TEAM NAME"
          invalidStyle={invalidName}
          inputName={NAME_TEAM}
          inputValue={name}
          handleTextChange={handleTextChange}
        />
        <HelperText errorName={true} errorValue={invalidName} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleCloseDialog} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmitDialog}
          color="primary"
          variant="contained"
          disableElevation
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
