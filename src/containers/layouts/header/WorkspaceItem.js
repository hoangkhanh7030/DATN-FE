import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import * as colors from "assets/css/Common";
import AlertDialog from "components/common/AlertDialog";
import React from "react";
import { useStyles } from "./style";

export const WorkspaceItem = (props) => {
  const {
    workspace = {},
    hasIcon = false,
    handleOpenDialog,
    handleOpenDelete,
  } = props;
  const checkColor = hasIcon ? colors.primaryColor : "white";
  const classes = useStyles({ checkColor });

  return (
    <Grid container wrap="nowrap" spacing={1} alignitem="center">
      <Grid item xs zeroMinWidth className={classes.selectedIcon}>
        {hasIcon ? <CheckIcon className={classes.checkIcon} /> : <></>}
        <Typography className={classes.headItem}>{workspace.name}</Typography>
      </Grid>
      <Grid item className={classes.flexAlign}>
        <Tooltip title="edit" arrow>
          <IconButton
            className={`fas fa-pencil-alt ${classes.resize}`}
            onClick={(e) => {
              e.preventDefault();
              handleOpenDialog(workspace);
            }}
          ></IconButton>
        </Tooltip>

        <Tooltip title="delete" arrow>
          <IconButton
            className={`far fa-trash-alt ${classes.resize}`}
            onClick={(e) => {
              e.preventDefault();
              handleOpenDelete(workspace.id);
            }}
          ></IconButton>
        </Tooltip>
      </Grid>
     
    </Grid>
  );
};
