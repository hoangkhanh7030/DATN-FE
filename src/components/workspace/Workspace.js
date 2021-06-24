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

export default function Workspace({ workspace }) {
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

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
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
          open={open}
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
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
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
