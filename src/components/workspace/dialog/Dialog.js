import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  ThemeProvider,
} from "@material-ui/core";

import { theme } from "assets/css/Common";
import { useStyles } from "./style";
import { DialogTitle } from "./DialogTitle";
import { DialogInput } from "./DialogInput";
import * as _ from "underscore";
import { WorkingDays } from "./WorkingDays";
import { EmailSuffix } from "./EmailSuffix";
import {
  EMAIL_SUFFIX_REGEX,
  EMPTY_ERROR,
  EMAIL_SUFFIX_ERROR,
  WORKING_DAYS_ERROR,
  WORKSPACE_NAME_ERROR,
} from "constants/index";

const WORKSPACE_NAME = "name";
const EMAIL_SUFFIXES = "emailSuffixes";
const WORK_DAYS = "workDays";

export default function WorkspaceDialog(props) {
  const classes = useStyles();
  const {
    open = false,
    workspace = {},
    workspaces = [],
    setWorkspace,
    handleCloseDialog,
    handleAdd,
    handleEdit,
  } = props;

  const [errName, setErrName] = useState("");
  const [errSuffix, setErrSuffix] = useState("");
  const [errWorkDays, setErrWorkDays] = useState("");

  const isSubmit = () => {
    return (
      _.get(workspace, WORKSPACE_NAME) &&
      _.get(workspace, WORK_DAYS).filter(Boolean).length > 1
    );
  };

  const isExisted = () => {
    return (
      workspaces.findIndex(
        (item) =>
          item.name === _.get(workspace, WORKSPACE_NAME) &&
          item.id !== _.get(workspace, "id")
      ) + 1
    );
  };

  const handleChangeName = (e) => {
    setErrName(!e.target.value ? EMPTY_ERROR : "");
    setWorkspace({ ...workspace, name: e.target.value });
  };

  const handleAddChip = (chip) => {
    setErrSuffix("");
    const newData = [..._.get(workspace, EMAIL_SUFFIXES), chip];
    EMAIL_SUFFIX_REGEX.test(chip)
      ? setWorkspace({ ...workspace, emailSuffixes: newData })
      : setErrSuffix(EMAIL_SUFFIX_ERROR);
  };

  const handleDeleteChip = (chip, id) => {
    const newData = _.get(workspace, EMAIL_SUFFIXES).filter(
      (chip, i) => i !== id
    );
    if (!newData.length) setErrSuffix("");
    setWorkspace({ ...workspace, emailSuffixes: newData });
  };

  const handleUpdateInput = (e) => {
    !e.target.value || EMAIL_SUFFIX_REGEX.test(e.target.value)
      ? setErrSuffix("")
      : setErrSuffix(EMAIL_SUFFIX_ERROR);
  };

  const toggleDay = (index) => {
    const newWorkDays = _.get(workspace, WORK_DAYS).slice();
    newWorkDays[index] = !newWorkDays[index];
    setErrWorkDays(
      newWorkDays.filter(Boolean).length < 2 ? WORKING_DAYS_ERROR : ""
    );
    setWorkspace({ ...workspace, workDays: newWorkDays });
  };

  // handle submit dialog
  const handleSubmitDialog = () => {
    if (isExisted()) {
      setErrName(WORKSPACE_NAME_ERROR);
      return;
    }

    workspace.id ? handleEdit(workspace.id, workspace) : handleAdd(workspace);
    handleCloseDialog();
  };
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle onClose={handleCloseDialog}>
          {_.get(workspace, "id") ? "Edit workspace" : "Create new workspace"}
        </DialogTitle>
        <DialogContent>
          <DialogInput
            inputValue={_.get(workspace, WORKSPACE_NAME)}
            handleChangeName={handleChangeName}
            errMsg={errName}
          />
          <EmailSuffix
            emailSuffixes={_.get(workspace, EMAIL_SUFFIXES)}
            handleAddChip={handleAddChip}
            handleDeleteChip={handleDeleteChip}
            handleUpdateInput={handleUpdateInput}
            errMsg={errSuffix}
          />
          <WorkingDays
            workDays={_.get(workspace, WORK_DAYS)}
            toggleDay={toggleDay}
            errMsg={errWorkDays}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button
            onClick={handleSubmitDialog}
            variant="contained"
            color="primary"
            disableElevation
            disabled={!isSubmit()}
          >
            {_.get(workspace, "id") ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
