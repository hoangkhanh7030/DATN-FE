import {
  Box,
  Button,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: "26px", fontWeight: "bold" },
});

export const SettingTitle = ({ handleAddRow }) => {
  const classes = useStyles();
  return (
    <DialogTitle>
      <Box className={classes.root}>
        <Typography className={classes.title}>Settings</Typography>
        <Button
          variant="outlined"
          margin="dense"
          color="primary"
          disableElevation
          startIcon={<AddCircleOutlineIcon />}

          onClick={handleAddRow}
        >
          Add team
        </Button>
      </Box>
    </DialogTitle>
  );
};
