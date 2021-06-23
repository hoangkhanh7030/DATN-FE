import {
  Grid,
  Typography,
  Paper,
  IconButton,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import Workspace from "../../components/workspace/Workspace";
import { useStyles } from "./style";

export default function Workspaces() {
  const classes = useStyles();

  const workspaces = [
    {
      id: 3,
      createdDate: "2021-06-22T10:02:43.000+00:00",
      createdBy: 4,
      modifiedDate: "2021-06-22T10:02:49.000+00:00",
      modifiedBy: 4,
      name: "c",
      projectListLength: 0,
      resourceListLength: 0,
      role: "VIEW",
    },
    {
      id: 1,
      createdDate: "2021-06-22T10:02:38.000+00:00",
      createdBy: 4,
      modifiedDate: "2021-06-22T10:02:46.000+00:00",
      modifiedBy: 4,
      name: "a",
      projectListLength: 1,
      resourceListLength: 1,
      role: "VIEW",
    },
    {
      id: 2,
      createdDate: "2021-06-22T10:02:42.000+00:00",
      createdBy: 4,
      modifiedDate: "2021-06-22T10:02:48.000+00:00",
      modifiedBy: 4,
      name: "b",
      projectListLength: 0,
      resourceListLength: 0,
      role: "EDIT",
    },
  ];
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: 24,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Typography variant="h1" className={classes.title} gutterBottom>
        Workspaces
      </Typography>
      <Grid container spacing={5} className={classes.container}>
        {workspaces.map((workspace) => (
          <Grid item xs={12} sm={4} md={3}>
            <Workspace key={workspace.key} workspace={workspace} />
          </Grid>
        ))}
        <Grid item xs={12} sm={4} md={3}>
          <Paper className={classes.paper}>
            <IconButton variant="h1">
              <AddIcon className={classes.addIcon} />
            </IconButton>
            <Typography variant="h3" className={classes.newWorkspace}>
              NEW WORKSPACE
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
