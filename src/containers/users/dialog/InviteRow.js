import { Box, Grid, IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { INVITED_EMAIL_ERROR } from "constants/index";
import React from "react";
import { useStyles } from "./style";

export default function InviteRow(props) {
  const {
    data = {},
    index = "",
    handleDeleteRow,
    handleChangeRow,
    emailSuffixes = [],
  } = props;

  const classes = useStyles();

  const onChangeRow = (e) => {
    handleChangeRow(
      {
        ...data,
        email: e.target.value,
        error:
          emailSuffixes.length &&
          !emailSuffixes.includes(e.target.value.split("@")[1]),
        isInvited: false,
      },
      index
    );
  };

  return (
    <Box className={classes.rowBox}>
      <Grid container spacing={2} className={classes.row}>
        <Grid item xs={10}>
          <TextField
            placeholder="Email"
            variant="outlined"
            margin="dense"
            fullWidth
            className={classes.emailCol}
            value={data.email}
            onChange={onChangeRow}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText,
              },
            }}
            {...(data.error && {
              error: true,
              helperText: `Email suffixes: ${emailSuffixes.join(", ")}`,
            })}
            {...(data.isInvited && {
              error: true,
              helperText: INVITED_EMAIL_ERROR,
            })}
          />
        </Grid>
        <Grid item xs={2} className={classes.deleteBtn}>
          <IconButton
            disabled={!data.email}
            onClick={() => handleDeleteRow(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
