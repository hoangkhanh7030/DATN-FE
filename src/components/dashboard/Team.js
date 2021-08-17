import React, { useState } from "react";
import { Typography, Box, IconButton } from "@material-ui/core";
import * as _ from "underscore";
import { makeStyles } from "@material-ui/core/styles";
import { TEAM_ID, ID } from "constants/index";
import TeamOptions from "./TeamOptions";
import TeamDialog from "./TeamDialog";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 8,
  },
  icon: {
    fontSize: 10,
    color: "black",
  },
  text: {
    fontSize: 12,
    fontWeight: 600,
    padding: 2,
  },
});

export default function Team({ team = {}, resources = [], handleRenameTeam }) {
  const classes = useStyles();

  const rscAmount = resources.filter(
    (resource) => _.get(resource, TEAM_ID) === _.get(team, ID)
  ).length;

  const [openRename, setOpenRename] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOption = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOption = () => {
    setAnchorEl(null);
  };

  const handleOpenRenameTeam = () => {
    handleCloseOption();
    setOpenRename(true);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.left}>
        <IconButton
          className={`fas fa-chevron-up ${classes.icon}`}
        ></IconButton>
        <Typography noWrap className={classes.text}>
          {team.name}
        </Typography>
        <Typography className={classes.text}>{`(${rscAmount})`}</Typography>
      </Box>

      <IconButton
        aria-controls={_.get(team, "id")}
        aria-haspopup="true"
        className={`fas fa-ellipsis-h ${classes.icon}`}
        onClick={handleClickOption}
      ></IconButton>
      <TeamOptions
        anchorEl={anchorEl}
        handleCloseOption={handleCloseOption}
        handleOpenRenameTeam={handleOpenRenameTeam}
      />

      <TeamDialog
        team={team}
        isOpenDialog={openRename}
        setOpenDialog={setOpenRename}
        handleRenameTeam={handleRenameTeam}
      />
    </Box>
  );
}
