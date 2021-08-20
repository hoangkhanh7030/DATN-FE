import React, { useState } from "react";

import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
} from "@material-ui/core";
import { ColorPicker } from "material-ui-color";

import { HelperText } from "components/common/HelperText";
import { DialogTitle } from "./DialogTitle";
import { DialogInput } from "./DialogInput";
import { useStyles } from "./style";
import {
  PROJECT_NAME,
  CLIENT_NAME,
  PALETTE,
  DEFAULT_PROJECT,
  COLOR,
  TEXT_COLOR,
} from "constants/index";

import * as _ from "underscore";

const PROJECT_TITLE = "PROJECT NAME";
const CLIENT_TITLE = "CLIENT NAME";
const CSS = "css";
const BACKGROUND_COLOR = "backgroundColor";
const DIALOG_TITLE = "dialogTitle";
const ACTION_DIALOG = "actionDialog";
const BUTTON_TEXT = "buttonText";

export const FormDialog = ({
  project = {},
  projectID = null,
  setProject,
  isOpenDialog = false,
  setOpenDialog,
  dialog,
}) => {
  const classes = useStyles();

  const [invalidName, setInvalidName] = useState("");
  const [invalidClient, setInvalidClient] = useState("");

  const getInvalidNameValue = ({ name, value }) => {
    return !value && [PROJECT_NAME, CLIENT_NAME].includes(name) ? name : "";
  };

  const handleTextChange = (e) => {
    setInvalidName(getInvalidNameValue(e.target));
    setInvalidClient(getInvalidNameValue(e.target));
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleColorChange = (value) => {
    setProject({ ...project, color: value });
  };

  const handleTextColorChange = (value) => {
    setProject({ ...project, textColor: value });
  };

  const checkValidForm = () => {
    const nameValue = _.get(project, PROJECT_NAME);
    const clientValue = _.get(project, CLIENT_NAME);
    if (!nameValue) setInvalidName(PROJECT_NAME);
    if (!clientValue) setInvalidClient(CLIENT_NAME);

    return Boolean(nameValue && clientValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProject(DEFAULT_PROJECT);
    setInvalidName("");
    setInvalidClient("");
  };

  const handleSubmitDialog = () => {
    if (checkValidForm()) {
      const thisProject = {
        ...project,
        color:
          _.get(project, [COLOR, CSS, BACKGROUND_COLOR]) ||
          _.get(project, COLOR),
        textColor:
          _.get(project, [TEXT_COLOR, CSS, BACKGROUND_COLOR]) ||
          _.get(project, TEXT_COLOR),
      };
      handleCloseDialog();
      _.get(dialog, ACTION_DIALOG)(thisProject, projectID);
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
        {_.get(dialog, DIALOG_TITLE)}
      </DialogTitle>
      <DialogContent>
        <DialogInput
          title={PROJECT_TITLE}
          invalidStyle={invalidName === PROJECT_NAME}
          inputName={PROJECT_NAME}
          inputValue={_.get(project, PROJECT_NAME)}
          handleTextChange={handleTextChange}
        />
        <HelperText errorName={PROJECT_NAME} errorValue={invalidName} />

        <DialogInput
          title={CLIENT_TITLE}
          invalidStyle={invalidClient === CLIENT_NAME}
          inputName={CLIENT_NAME}
          inputValue={_.get(project, CLIENT_NAME)}
          handleTextChange={handleTextChange}
        />
        <HelperText errorName={CLIENT_NAME} errorValue={invalidClient} />

        <Box className={classes.colorBox} elevation={0}>
          <Typography variant="h4">PROJECT COLOR</Typography>
          <ColorPicker
            palette={PALETTE}
            value={project.color}
            onChange={handleColorChange}
          />
        </Box>
        <Box className={classes.colorBox} elevation={0}>
          <Typography variant="h4">TEXT COLOR</Typography>
          <ColorPicker
            palette={PALETTE}
            value={project.textColor}
            onChange={handleTextColorChange}
          />
        </Box>
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
          {_.get(dialog, BUTTON_TEXT)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
