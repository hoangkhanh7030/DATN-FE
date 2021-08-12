import { Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import * as colors from "assets/css/Common";
import { useStyles } from "containers/workspace/dialog/style";
import React from "react";
import * as _ from "underscore";

export const ProjectItem = (props) => {
  const { project = {}, hasIcon = false, isSelected = false } = props;
  const projectColor = _.get(project, "color");
  const checkColor = hasIcon ? colors.primaryColor : "white";
  const marginRightText = hasIcon || isSelected ? 0 : 24;
  const classes = useStyles({ projectColor, checkColor, marginRightText });

  return (
    <Grid container wrap="nowrap" spacing={1} style={{ alignItems: "center" }}>
      <Grid item xs zeroMinWidth>
        <Typography className={classes.headItem}>
          <i className={`fas fa-circle ${classes.circleIcon}`}></i>
          {project.name}
        </Typography>
      </Grid>
      <Grid item alignItems="center" className={classes.flexAlign}>
        <Typography className={classes.endItem}>
          {project.clientName}
        </Typography>
        {hasIcon ? <CheckIcon className={classes.checkIcon} /> : <></>}
      </Grid>
    </Grid>
  );
};
