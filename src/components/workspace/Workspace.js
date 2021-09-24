import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import * as _ from "underscore";

import {
  Card,
  CardHeader,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  IconButton,
  ThemeProvider,
  CardContent,
  Divider,
  Typography,
  Box,
} from "@material-ui/core";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useStyles } from "./style";
import { theme } from "assets/css/Common";
import AlertDialog from "components/common/AlertDialog";
import { useHistory } from "react-router-dom";
import analyze from "assets/images/analyze.png";
import { WORKSPACES_URL, USERS_URL } from "constants/index";

export default function Workspace(props) {
  const {
    workspace = {},
    openDelete = false,
    handleOpenDialog,
    handleCloseDeleteDialog,
    handleOpenDeleteDialog,
    handelDeleteWorkspace,
  } = props;

  const history = useHistory();
  const classes = useStyles();

  const noPermission = (workspace) => {
    return _.get(workspace, "role") !== "EDIT";
  };

  const accessWorkspacePage = (workspace) => {
    history.push(`${WORKSPACES_URL}/${_.get(workspace, "id")}`);
  };

  const info = {
    name: _.get(workspace, "name"),
    projectNum: `${_.get(workspace, "projectListLength")} Projects`,
    date: `Since ${moment(_.get(workspace, "createdDate")).format(
      "DD MMMM YYYY"
    )}`,
    resourceNum: `${_.get(workspace, "resourceListLength")} Members`,
  };

  const subHeader = (
    <ul className={classes.subheader}>
      <li>{info.projectNum}</li>
      <li>{info.date}</li>
      <li> {info.resourceNum}</li>
    </ul>
  );

  const [openOption, setOpenOption] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenOption((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenOption(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenOption(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openOption);
  useEffect(() => {
    if (prevOpen.current === true && openOption === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openOption;
  }, [openOption]);

  function HoursAccount() {
    return (
      <Box className={classes.hours}>
        <Typography variant="h1">{Math.floor(Math.random() * 100)}</Typography>
        <Typography variant="caption">HOURS</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root} elevation={0}>
        <CardHeader
          className={classes.cardHeader}
          action={
            noPermission(workspace) ? (
              <></>
            ) : (
              <IconButton ref={anchorRef} onClick={handleToggle}>
                <MoreHorizIcon />
              </IconButton>
            )
          }
          title={
            <Typography
              variant="h2"
              onClick={() => accessWorkspacePage(workspace)}
              className={classes.overflowWithDots}
            >
              {info.name}
            </Typography>
          }
          subheader={subHeader}
          titleTypographyProps={{ variant: "h2" }}
        />
        <CardContent className={classes.cardContent}>
          <img src={analyze} alt="" height="auto" />
          <Divider orientation="vertical" flexItem />
          <HoursAccount />
        </CardContent>

        <Popper
          open={openOption}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          placement="bottom-start"
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} className={classes.grow}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={openOption}
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={() => handleOpenDialog(workspace)}>
                      Edit{" "}
                    </MenuItem>
                    <MenuItem onClick={handleOpenDeleteDialog}>Delete</MenuItem>
                    <AlertDialog
                      open={openDelete}
                      content={`Do you really want to delete ${workspace.name} workspace?`}
                      handleCloseDialog={handleCloseDeleteDialog}
                      handelActionDialog={handelDeleteWorkspace}
                    />
                    <MenuItem
                      onClick={() =>
                        history.push(
                          `${WORKSPACES_URL}/${_.get(
                            workspace,
                            "id"
                          )}${USERS_URL}`
                        )
                      }
                    >
                      Manage Users
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Card>
    </ThemeProvider>
  );
}
