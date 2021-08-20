import { Box, Grid, IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useStyles } from "./style";

export default function InviteRow(props) {
  const {
    data = {},
    index = "",
    handleDeleteRow,
    handleChangeRow,
    emailSuffix = "",
  } = props;

  const classes = useStyles();

  const onChangeRow = (event) => {
    handleChangeRow(
      {
        ...data,
        email: event.target.value,
        error: event.target.value.split("@")[1] === emailSuffix ? false : true,
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
              helperText: `You only can invite with email suffix: ${emailSuffix}`,
            })}
            {...(data.isInvited && {
              error: true,
              helperText: "This email is invited before!",
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
