import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { theme } from "../../../assets/css/Common";

export default function WorkspaceDialog(props) {
  const useStyles = makeStyles({
    createBtn: {
      marginRight: "15px",
    },
  });
  const {
    open,
    content,
    name,
    handleCloseDialog,
    handleInputName,
    onHandleSubmit,
    error,
  } = {
    ...props,
  };
  const classes = useStyles();
  useEffect(() => {}, []);
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>{content.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            defaultValue={name}
            margin="dense"
            label="Name"
            name="name"
            type="text"
            fullWidth
            onChange={handleInputName}
            autoComplete="off"
            required
            {...(error && {
              error: true,
              helperText: error,
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            className={classes.createBtn}
            onClick={onHandleSubmit}
            variant="contained"
            color="primary"
            disabled={!name}
          >
            {content.btnTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
