import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import {
  Button,
  ThemeProvider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import ProjectsTable from "./Table";

import { theme } from "../../assets/css/Common";
import { useStyles } from "./style";

function createData(name, calories, fat, color) {
  return { name, calories, fat, color };
}

const rows = [
  createData("Project01", "Project01", "inactive", "#134ec4"),
  createData("Project02", "Project02", "active", "#13c451"),
  createData("Project03", "Project03", "inactive", "#134ec4"),
  createData("Project04", "Project04", "active", "#13c451"),
  createData("Project05", "Project05", "active", "#6332a8"),
  createData("Project06", "Project06", "inactive", "#134ec4"),
];

const actions = [
  { value: "Import", label: "Import" },
  { value: "Export", label: "Export" },
];

export default function Projects() {
  const classes = useStyles();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [action, setAction] = useState("MORE");
  const [searched, setSearched] = useState("");

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [projects, setProjects] = useState([]);

  const storeProjects = useSelector((state) => state.projects);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (event) => {
    setAction(event.target.value);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);

  if (!isLoggedIn) return <Redirect to="/" />;

  return (
    <ThemeProvider theme={theme} >
      <div className={`${classes.header} ${classes.flex}`}>
        <div className={classes.flex}>
          <SearchBar value={searched} className={classes.searchbar} />
          <FormControl className={classes.root} noValidate autoComplete="off">
            <InputLabel
              id="demo-simple-select-outlined-label"
              className={classes.label}
            >
              TYPE
            </InputLabel>
            <TextField
              select
              value={action}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
            >
              {actions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  style={{ fontSize: "14px" }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl className={classes.root} noValidate autoComplete="off">
            <InputLabel className={classes.label}>STATUS</InputLabel>
            <TextField
              select
              value={action}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
            >
              {actions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  style={{ fontSize: "14px" }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>

        <div className={classes.flex}>
          <FormControl className={classes.root} noValidate autoComplete="off">
            <InputLabel className={classes.label}>MORE</InputLabel>
            <TextField
              select
              value={action}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
            >
              {actions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  style={{ fontSize: "14px" }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            style={{ padding: "8px 20px" }}
          >
            New Project
          </Button>
        </div>
      </div>

      <ProjectsTable
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        emptyRows={emptyRows}
      />

      <div className={`${classes.footer} ${classes.flex}`}>
        <div className={classes.flex}>
          <Typography>SHOW </Typography>
          <FormControl className={classes.root} noValidate autoComplete="off">
            <InputLabel
              id="demo-simple-select-outlined-label"
              className={classes.label}
            >
              20
            </InputLabel>
            <TextField
              select
              value={action}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
            >
              {actions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  style={{ fontSize: "14px" }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Typography> ITEMS </Typography>
        </div>

        <div className={classes.flex}>
          <Pagination
            count={2}
            variant="outlined"
            className={classes.pagination}
            shape="rounded"
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
