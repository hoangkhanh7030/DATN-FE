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
  Icon,
} from "@material-ui/core";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useStyles } from "./style";
import { theme, commonStyle } from "../../assets/css/Common";
import WorkspaceDialog from "./dialog/Dialog";
import AlertDialog from "../common/AlertDialog";

export default function Workspace(props) {
  const {
    workspace,
    open,
    openDelete,
    content,
    name,
    handleOpenDialog,
    handleCloseDialog,
    handleInputName,
    onHandleSubmit,
    handleCloseDeleteDialog,
    handleOpenDeleteDialog,
    handelDeleteWorkspace,
  } = {
    ...props,
  };

  const classes = useStyles();
  const iconClasses = commonStyle();

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
                    <MenuItem onClick={handleOpenDialog}>
                      <Icon
                        className={`${iconClasses.icon} fas fa-pen`}
                        style={{ fontSize: "16px" }}
                      />
                      Edit
                    </MenuItem>
                    <WorkspaceDialog
                      open={open}
                      content={content}
                      name={name}
                      handleCloseDialog={handleCloseDialog}
                      handleInputName={handleInputName}
                      onHandleSubmit={onHandleSubmit}
                    />
                    <MenuItem onClick={handleOpenDeleteDialog}>
                      <Icon
                        className={`${iconClasses.icon} fas fa-trash`}
                        style={{ fontSize: "16px" }}
                      />
                      Delete
                    </MenuItem>
                    <AlertDialog
                      open={openDelete}
                      content={`Do you really want to delete ${name} workspace?`}
                      handleCloseDialog={handleCloseDeleteDialog}
                      handelDeleteWorkspace={handelDeleteWorkspace}
                    />
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
