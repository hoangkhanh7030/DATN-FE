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
    setWorkspace,
    handleCloseDialog,
    handleAdd,
    handleEdit,
  } = props;
  const [invalidValue, setInvalidValue] = useState({
    name: "",
    emailSuffix: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const isSubmit = () => {
    return (
      workspace.name &&
      emailSuffixRegex.test(workspace.emailSuffix) &&
      workspace.workDays.filter(Boolean).length > 1
    );
  };

  const handleTextChange = (e) => {
    setInvalidValue({
      ...invalidValue,
      [e.target.name]: !e.target.value ? e.target.name : "",
    });
    if (e.target.name === EMAIL_SUFFIX_NAME) {
      setErrMsg(
        !emailSuffixRegex.test(e.target.value)
          ? "Please enter a valid email suffix !"
          : ""
      );
    }
    setWorkspace({ ...workspace, [e.target.name]: e.target.value });
  };

  // handle submit dialog
  const handleSubmitDialog = () => {
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
            invalidStyle={invalidValue.name === WORKSPACE_NAME}
            inputName={WORKSPACE_NAME}
            invalidName={invalidValue.name}
            inputValue={_.get(workspace, WORKSPACE_NAME)}
            handleTextChange={handleTextChange}
          />
          <DialogInput
            title={"Email Suffix"}
            invalidStyle={invalidValue.emailSuffix === EMAIL_SUFFIX_NAME}
            inputName={EMAIL_SUFFIX_NAME}
            invalidName={invalidValue.emailSuffix}
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
