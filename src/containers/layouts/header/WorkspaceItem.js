import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import * as colors from "assets/css/Common";
import { WORKSPACES_URL, USERS_URL } from "constants/index";
import React from "react";
import { useHistory } from "react-router";
import { useStyles } from "./style";
import * as _ from "underscore";

export const WorkspaceItem = (props) => {
  const {
    workspace = {},
    hasIcon = false,
    handleOpenDialog,
    handleOpenDelete,
  } = props;
  const history = useHistory();

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
        <Tooltip title="manage users" arrow>
          <IconButton
            className={`fas fa-user-cog ${classes.resize}`}
            onClick={(e) => {
              e.preventDefault();
              history.push(
                `${WORKSPACES_URL}/${_.get(workspace, "id")}${USERS_URL}`
              );
            }}
          ></IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
