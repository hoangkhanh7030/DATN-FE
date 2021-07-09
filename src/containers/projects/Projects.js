import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import {
  Button,
  ThemeProvider,
  TextField,
  Menu,
  MenuItem,
  FormControl,
  Typography,
} from "@material-ui/core";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import ProjectsTable from "./Table";

import { Message } from "components/common/Message";
import { Progress } from "components/common/Progress";

import { getProjects } from "redux/actions/projectAction";
import { clearMessage } from "redux/actions/msgAction";

import { theme } from "../../assets/css/Common";
import { useStyles } from "./style";

const actions = [
  { label: "Import", value: "Import" },
  { label: "Export", value: "Export" },
];

const sizes = [
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 15, value: 15 },
];

const types = [
  { label: "TYPE", value: "TYPE" },
  { label: "Project Name", value: "Project Name" },
  { label: "Client Name", value: "Client Name" },
];

const statuses = [
  { label: "STATUS", value: "STATUS" },
  { label: "active", value: "active" },
  { label: "archived", value: "archived" },
];

export default function Projects() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { isLoading } = useSelector((state) => state.projects);

  const [projects, setProjects] = useState([]);

  const [searched, setSearched] = useState("");

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [hasMessage, setOpenMessage] = useState(false);

  const storeProjects = useSelector((state) => state.projects);

  const [type, setType] = useState("TYPE");

  const [status, setStatus] = useState("STATUS");

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(getProjects(id, rowsPerPage, page - 1)).catch(() =>
      setOpenMessage(true)
    );
  }, [dispatch, id, rowsPerPage, page]);

  useEffect(() => {
    if (!storeProjects.data) {
      return;
    }
    setProjects(storeProjects.data);
  }, [storeProjects.data]);

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "type": {
        setType(event.target.value);
        break;
      }
      case "status": {
        setStatus(event.target.value);
        break;
      }
      case "size": {
        setRowsPerPage(event.target.value);
        break;
      }
      default:
        return;
    }
  };

  /* handle popup 'MORE' options */
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, projects.length - (page - 1) * rowsPerPage);

  if (!isLoggedIn) return <Redirect to="/" />;

  return (
    <ThemeProvider theme={theme}>
      {/* header of table */}
      <div className={`${classes.header} ${classes.flex}`}>
        <div className={classes.flex}>
          <SearchBar value={searched} className={classes.searchbar} />
          <FormControl className={classes.root} noValidate autoComplete="off">
            <TextField
              select
              value={type}
              name={"type"}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl className={classes.root} noValidate autoComplete="off">
            <TextField
              select
              value={status}
              name={"status"}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
            >
              {statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>

        <div className={classes.flex}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="outlined"
            className={`${classes.button} ${classes.dropdown}`}
            endIcon={<ExpandMoreOutlinedIcon />}
          >
            MORE
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {actions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Menu>

          <Button
            color="primary"
            variant="contained"
            className={classes.button}
          >
            New Project
          </Button>
        </div>
      </div>
      {/* content of table */}
      <ProjectsTable
        rows={projects}
        page={page}
        rowsPerPage={rowsPerPage}
        emptyRows={emptyRows}
      />
      {/* footer of table */}
      <div className={`${classes.footer} ${classes.flex}`}>
        <div className={classes.flex}>
          <Typography>SHOW </Typography>
          <FormControl className={classes.root} noValidate autoComplete="off">
            <TextField
              select
              value={rowsPerPage}
              name={"size"}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
            >
              {sizes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Typography> ITEMS </Typography>
        </div>

        <div className={classes.flex}>
          <Pagination
            count={5}
            variant="outlined"
            className={classes.pagination}
            shape="rounded"
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>

      {message && (
        <Message
          message={message}
          isOpen={hasMessage}
          handleCloseMessage={handleCloseMessage}
          type={"error"}
        />
      )}

      <Progress isOpen={isLoading} />
    </ThemeProvider>
  );
}
