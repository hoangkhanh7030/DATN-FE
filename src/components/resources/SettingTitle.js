import {
  Box,
  Button,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

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
          // endIcon={<AddCircleOutlineIcon />}
          startIcon={<i className="far fa-plus-square"></i>}
          onClick={handleAddRow}
        >
          Add team
        </Button>
      </Box>
    </DialogTitle>
  );
};
