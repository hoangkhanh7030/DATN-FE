import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@material-ui/core";
import { DialogTitle } from "components/projects/form_dialog/DialogTitle";
import { WORKSPACES_URL } from "constants/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmails } from "redux/actions/emailAction";
import InviteRow from "./InviteRow";
import { useStyles } from "./style";

const INITIAL_ROW = { email: "", error: false, isInvited: false };
export default function InviteDialog(props) {
  const {
    workspaceId = "",
    isOpen = false,
    handleCloseDialog,
    setOpenOption,
  } = props;

  const dispatch = useDispatch();
  const classes = useStyles();
  const [data, setData] = useState([INITIAL_ROW]);
  const storeEmails = useSelector((state) => state.emails.data);

  useEffect(() => {
    dispatch(getEmails(workspaceId));
  }, [workspaceId]);

  const isDisabled = () => {
    return (
      Boolean(data.findIndex((e) => !e.email || e.error || e.isInvited) + 1) ||
      data.length === 0
    );
  };

  const isInvitedEmails = () => {
    const newData = data.map((e) =>
      storeEmails?.emails.includes(e.email) ? { ...e, isInvited: true } : e
    );
    setData(newData);
    return Boolean(newData.findIndex((e) => e.isInvited) + 1);
  };

  const handleAddRow = () => {
    setData([...data, INITIAL_ROW]);
  };

  const handleDeleteRow = (index) => {
    const newData = [...data.filter((item, i) => i !== index)];
    setData(newData);
  };

  const handleChangeRow = (row = INITIAL_ROW, index) => {
    const updatedData = [...data.map((item, i) => (i === index ? row : item))];
    setData(updatedData);
  };

  const handleSubmitDialog = () => {
    if (isInvitedEmails()) {
      return;
    }

    const submittedData = {
      email: data.map((e) => e.email),
      url: `${process.env.REACT_APP_URL}${WORKSPACES_URL}/${workspaceId}`,
    };

    setOpenOption(false);
  };

  const handleClose = () => {
    handleCloseDialog(false);
    setOpenOption(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle onClose={handleClose}>Invite to your workspace</DialogTitle>
      <DialogContent>
        <Grid container>
          {data.map((item, index) => (
            <InviteRow
              key={index}
              data={item}
              index={index}
              handleDeleteRow={handleDeleteRow}
              handleChangeRow={handleChangeRow}
              emailSuffix={storeEmails?.emailSuffix}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleAddRow}
            className={classes.addBtn}
          >
            Add more
          </Button>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleClose} variant="outlined">
          Later
        </Button>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleSubmitDialog}
          disabled={isDisabled()}
        >
          Send Invitations
        </Button>
      </DialogActions>
    </Dialog>
  );
}
