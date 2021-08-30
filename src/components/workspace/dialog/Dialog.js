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

const WORKSPACE_NAME = "name";
const EMAIL_SUFFIX_NAME = "emailSuffix";

export const emailSuffixRegex = /^([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

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

  const [errMsgName, setErrMsgName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const isSubmit = () => {
    return (
      workspace.name &&
      ((workspace.emailSuffix &&
        emailSuffixRegex.test(workspace.emailSuffix)) ||
        !workspace.emailSuffix) &&
      workspace.workDays.filter(Boolean).length > 1
    );
  };

  const handleTextChange = (e) => {
    if (e.target.name === EMAIL_SUFFIX_NAME) {
      setErrMsg(
        e.target.value && !emailSuffixRegex.test(e.target.value)
          ? "Please enter a valid email suffix !"
          : ""
      );
    } else {
      setErrMsgName(!e.target.value ? "This field is required !" : "");
    }
    setWorkspace({ ...workspace, [e.target.name]: e.target.value });
  };

  const isExisted = () => {
    return workspaces.findIndex((item) => item.name === workspace.name) + 1;
  };

  // handle submit dialog
  const handleSubmitDialog = () => {
    if (isExisted()) {
      setErrMsgName("This workspace name is already existed ! ");
      return;
    }
    workspace.id ? handleEdit(workspace.id, workspace) : handleAdd(workspace);
    handleCloseDialog();
  };
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle onClose={handleCloseDialog}>
          {workspace.id ? "Edit workspace" : "Create new workspace"}
        </DialogTitle>
        <DialogContent>
          <DialogInput
            title={"Name"}
            inputName={WORKSPACE_NAME}
            inputValue={_.get(workspace, WORKSPACE_NAME)}
            handleTextChange={handleTextChange}
            errMsg={errMsgName}
          />
          <DialogInput
            title={"Email Suffix"}
            inputName={EMAIL_SUFFIX_NAME}
            inputValue={_.get(workspace, EMAIL_SUFFIX_NAME)}
            handleTextChange={handleTextChange}
            errMsg={errMsg}
          />

          <WorkingDays
            title="Working Days"
            workspace={workspace}
            setWorkspace={setWorkspace}
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
            {workspace.id ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
