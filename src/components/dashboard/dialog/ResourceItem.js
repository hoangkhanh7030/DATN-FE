import { Avatar, Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import * as colors from "assets/css/Common";
import { useStyles } from "containers/workspace/dialog/style";
import React from "react";

export const ResourceItem = (props) => {
  const { resource = {}, hasIcon = false } = props;
  const checkColor = hasIcon ? colors.primaryColor : "white";
  const classes = useStyles({ checkColor });

  return (
    <Grid container wrap="nowrap" spacing={1} className={classes.flexAlign}>
      <Grid item>
        <Avatar alt="" src={resource.avatar} className={classes.small} />
      </Grid>
      <Grid item xs zeroMinWidth>
        <Typography className={classes.resourceText} noWrap>
          {resource.name}
        </Typography>
      </Grid>
      {hasIcon ? <CheckIcon className={classes.checkIcon} /> : <></>}
    </Grid>
  );
};
