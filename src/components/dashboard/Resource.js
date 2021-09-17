import React,{useState} from "react";
import { Typography, Box, Avatar, Container } from "@material-ui/core";
import * as _ from "underscore";
import { makeStyles } from "@material-ui/core/styles";
import PopoverHover from "components/dashboard/Popover";
import { RESOURCE_NAME, POSITION_NAME, TEAM_NAME } from "constants/index";
import { AVATAR, PERCENT } from "containers/workspace/others/constants";

const useStyles = makeStyles({
  container: {
    display: "flex",
    padding: 0,
  },
  avatar: {
    marginRight: 5,
  },
  textBox: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  textName: {
    width: "95%",
    padding: 2,
    fontSize: 13,
    fontWeight: 600,
  },
  textPosBox: {
    display: "flex",
    alignItems: "center",
    color: "#929292",
  },
  textPosition: {
    fontSize: 11,
    paddingRight: 5,
    flex: 7,
  },
  textPercentage: {
    fontSize: 11,
    flex: 5,
  },
  percentRed: {
    color: "red",
  },
});

const TextPercentage = ({ classes, workingPercent }) => {
  return (
    <Typography className={classes.textPercentage} >
      {"| "}
      <Box
        component="span"
        className={workingPercent < 100 ? null : classes.percentRed}
      >
        {`${workingPercent}%`}
      </Box>
    </Typography>
  );
};

export default function Resource({ resource = {},team={} }) {
  const classes = useStyles();
  const workingPercent = _.get(resource, PERCENT);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const content = [
    [{ title: RESOURCE_NAME, detail: _.get(resource, RESOURCE_NAME) }],
    [{ title: POSITION_NAME, detail: _.get(resource, POSITION_NAME) }],
    [{ title: TEAM_NAME, detail: _.get(team, RESOURCE_NAME) }],
  ];


  return (
    <Container className={classes.container}  onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
      <Avatar src={_.get(resource, AVATAR)} className={classes.avatar}></Avatar>

      <Box className={classes.textBox}>
        <Typography noWrap className={classes.textName} style={{ pointerEvents: "none" }}>
          {_.get(resource, RESOURCE_NAME)}
        </Typography>
        <Box className={classes.textPosBox}>
          <Typography noWrap className={classes.textPosition} style={{ pointerEvents: "none" }}>
            {_.get(resource, POSITION_NAME)}
          </Typography>

          <TextPercentage classes={classes} workingPercent={workingPercent} />
        </Box>
      </Box>
      <PopoverHover
        handlePopoverClose={handlePopoverClose}
        anchorEl={anchorEl}
        content={content}
      />
    </Container>
  );
}
