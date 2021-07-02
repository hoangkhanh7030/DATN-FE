import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
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
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useStyles } from "./style";
import { theme } from "../../assets/css/Common";
import WorkspaceDialog from "./dialog/Dialog";

export default function Workspace(props) {
  const {
    workspace,
    open,
    content,
    name,
    handleOpenDialog,
    handleCloseDialog,
    handleInputName,
    onHandleSubmit,
  } = {
    ...props,
  };

  const classes = useStyles();

  const info = {
    name: workspace.name,
    projectNum: `${workspace.projectListLength} Projects`,
    date: `Since ${moment(workspace.createdDate).format("DD MMMM YYYY")}`,
    resourceNum: `${workspace.resourceListLength} Members`,
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

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton ref={anchorRef} onClick={handleToggle}>
              <MoreHorizIcon />
            </IconButton>
          }
          title={info.name}
          subheader={subHeader}
          titleTypographyProps={{ variant: "h2" }}
        />
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
                    <MenuItem onClick={handleOpenDialog}>Edit</MenuItem>
                    <WorkspaceDialog
                      open={open}
                      content={content}
                      name={name}
                      handleCloseDialog={handleCloseDialog}
                      handleInputName={handleInputName}
                      onHandleSubmit={onHandleSubmit}
                    />
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
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
